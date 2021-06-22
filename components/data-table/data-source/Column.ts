import type {IHeaderItem, IHeaderItemGroup} from './Header';
import {isHeaderItemGroup, isHeaderItemGroupArray} from './Header';


export class ColumnGroup {

    readonly span = 1;

    public depth = 0;


    /**
     * ColumnGroups linked
     */
    nextSibling?: ColumnGroup;
    private readonly childItems: ColumnGroup[] | Column[];
    private columns: Column[] = [];

    constructor(
        private itemGroup: IHeaderItemGroup,
        readonly parent?: ColumnGroup) {

        // build the concrete child classes
        const children = this.itemGroup.items;
        if (isHeaderItemGroupArray(children)) {
            this.childItems = children.map(item => new ColumnGroup(item, this));
        } else {
            this.childItems = children.map((item, index) => new Column(item, this));
        }
    }

    get columnStartEnd(): [number, number] {
        if (this.columns.length > 0) {
            return [this.columns[0].index, this.columns[this.columns.length - 1].index];
        } else {
            throw Error('no columns defined on group');
        }
    }

    // extract the groups found at each level
    get childGroups(): ColumnGroup[][] {
        // @ts-ignore
        let childGroups = this.childItems.filter(child => child instanceof ColumnGroup);

        if (childGroups.length > 0) {
            return [childGroups];
        } else {
            return [];
        }

    }

    get firstChild(): ColumnGroup | Column {
        return this.children[0];
    }

    get children() {
        return this.childItems;
    }

    get key() {
        return this.itemGroup.key;
    }

    get label(): string {
        return this.itemGroup.label ? this.itemGroup.label : this.key!.toString();
    };

    /**
     *  - walk the tree to find the column nodes and return them
     *  - create the linked list of ColumnGroups if children are groups
     */
    init(): Column[] {
        const columns: Column[] = [];
        let previous: ColumnGroup;
        this.childItems.forEach((child: Column | ColumnGroup) => {
            if (child instanceof Column) {
                columns.push(child);
            } else {
                if (previous != null) {
                    previous.nextSibling = child;
                }
                previous = child;
                columns.push(...child.init());
            }
        });
        this.depth = 1;
        let child = this.firstChild;
        while (child != null) {
            this.depth++;
            if (isHeaderItemGroup(child)) {
                // @ts-ignore
                child = child[0];
            } else {
                break;
            }
        }

        this.columns = columns;
        return columns;
    }
}

/**
 * Type for the data to be displayed in the column.
 *  number gets right aligned
 */
export type ColumnDataType = 'string' | 'number' | 'custom'

export class Column {

    dataType: ColumnDataType = 'string';
    index = 0;

    constructor(
        private item: IHeaderItem,
        readonly parent?: ColumnGroup) {
    }

    get depth() {
        let depth = 1;
        let parent = this.parent;
        while (parent != null) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    }

    get key(): string | number {
        return this.item.key ?? this.index;
    }

    get label(): string {
        return this.item.label ?? this.key.toString();
    };

    /**
     * Get the header parent by walking up the tree <count> nodes - 1 being immediate parent.
     * @param count - the distance of the parent group to fetch
     * @returns the group if found or undefined
     */
    offsetParent(count: number): ColumnGroup | undefined {
        let parent = this.parent;
        while (--count > 0) {
            if (parent) {
                parent = parent.parent;
            } else {
                return undefined;
            }
        }
        return parent;
    }
}

/**
 * Generate the Column classes from the JSON definition.
 *
 * @param items - the JSON
 * @param modifier - optional callback to post-process the column list if required to set additional properties
 */
export function createColumns(items: (IHeaderItemGroup | IHeaderItem)[], modifier?: (col: Column) => void): [Column[], ColumnGroupCellViewModel[][]] {
    let columns: Column[] = [];
    let maxDepth = 1;
    let columnGroups: ColumnGroup[] = [];

    items.forEach(item => {
        if (isHeaderItemGroup(item)) {
            const group = new ColumnGroup(item);
            columnGroups.push(group);
            columns.push(...group.init());
            maxDepth = Math.max(maxDepth, group.depth);
        } else {
            columns.push(new Column(item));
        }
    });

    // create the group rows (if relevant)
    // Set is used to extract unique ColumnGroups from the columns.
    let colGroupRows: Array<Set<ColumnGroup>> = [];
    // generate the column group rows
    for (let i = 1; i < maxDepth; i++) {
        colGroupRows.push(new Set());
    }

    columns.forEach((col, index) => {
        col.index = index;
        if (modifier) {
            modifier((col));
        }
        // walk the parent groups to set the unique references for creating the group rows in the table header
        for (let i = 1; i < maxDepth; i++) {
            const parent = col.offsetParent(i);
            if (parent) {
                colGroupRows[i - 1].add(parent);
            }
        }
    });

    const headerRows = colGroupRows.map(set => {
        let cells: ColumnGroupCellViewModel[] = Array.from(set).map(item => {
            const [start, end] = item.columnStartEnd;
            return new ColumnGroupCellViewModel(start, end, false, item);
        });

        const viewCells = [];
        let nextIndex = 0;
        cells.forEach(cell => {
            console.assert(cell.columnStartIndex >= nextIndex);
            if (cell.columnStartIndex > nextIndex) {
                viewCells.push(new ColumnGroupCellViewModel(nextIndex, cell.columnStartIndex - 1, true));
                viewCells.push(cell);
            } else {
                console.assert(nextIndex == cell.columnStartIndex, 'expecting nextIndex to be the start of current cell');
                viewCells.push(cell);
            }
            nextIndex = cell.columnEndIndex + 1;
        });

        if (nextIndex < columns.length) {
            viewCells.push(new ColumnGroupCellViewModel(nextIndex, columns.length - 1, true));
        }
        return viewCells;
    });

    return [columns, headerRows];
}


export class ColumnGroupCellViewModel {

    constructor(
        readonly columnStartIndex: number,
        readonly columnEndIndex: number,
        readonly isFiller: boolean, // is this an empty cell
        private groupItem?: ColumnGroup,
    ) {
    }

    get colSpan() {
        return this.columnEndIndex - this.columnStartIndex + 1;
    }

    get label() {
        return this.groupItem?.label;
    }
}
