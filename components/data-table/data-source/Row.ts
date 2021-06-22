import type {IHeaderItem, IHeaderItemGroup} from "./Header";
import type {Column} from "./Column";
import type {Store} from "@svlib/util/observable/store";
import {getOrCreateEntry} from "@svlib/util/collection/map";
import {createStore} from "@svlib/util/observable/store";

export class Row<T = Object> {

    // map of column key to reactive data
    // lazy create store for reactive listeners
    private dataMap = new Map<number | string, Store<any>>();

    constructor(
        public index: number,
        readonly data?: T,
        readonly header?: RowHeader,
    ) {

    }

    get key() {
        return this.index;
    }

    /**
     * Return a string version of the data by column key, or empty string
     * @param col
     */
    getCellValue(col: Column): string {
        const value = this.data?.[col.key as keyof T] as unknown as string;
        return value ?? "";
    }

    getCell(column: Column): Store<any> {
        // @ts-ignore
        return getOrCreateEntry(this.dataMap, column.key, () => createStore(this.data[column.key]))
    }

    updateCell(column: Column, value: any) {
        // @ts-ignore
        this.data[column.key] = value;
        let store = this.dataMap.get(column.key);
        if (store != undefined) {
            store.set(value);
        }
    }
}

export class RowHeader {

    constructor(readonly headerItem: IHeaderItem) {

    }

    get key() {
        return this.headerItem.key;
    }

    get label(): string {
        return this.headerItem.label ? this.headerItem.label : this.key!.toString();
    };
}

export function createRows(rowHeaders?: IHeaderItemGroup[] | IHeaderItem[], data?: any[]): Row[] {

    if (rowHeaders != undefined) {
        return rowHeaders.map((item, index) => new Row(index, data?.[index], new RowHeader(item)))
    }

    if (data != undefined) {
        return data.map((data, index) => new Row(index, data));
    }

    console.error("no data or row headers");
    return [];

    // if (isHeaderItemGroupArray(rowHeaders)) {
    //   const rowGroups = rowHeaders.map(item => new RowGroup(this.dataSource, this.allColumns, item));
    //   let rows: ViewRow[] = [];
    //   rowGroups.forEach(rowGroup => {
    //     rows.push(...rowGroup.getRows());
    //   });
    //   this.allRows = rows;
    //   this.allRows.forEach((row, index) => row.index = index);
    // } else {
    //   this.allRows = rowHeaders.map((item, index) => new ViewRow(index, this.dataSource, this.allColumns, new RowHeaderRowItem(item)));
    // }
    // return rows;
}

//
//
// /**
//  * Wrapping class for the IHeaderItemGroup data
//  */
// export class RowGroup {
//
//   private readonly childItems: (RowGroup[] | ViewRow[]);
//
//   get children() {
//     return this.childItems;
//   }
//
//   get label() {
//     return this.itemGroup.label;
//   }
//
//   get key() {
//     return this.itemGroup.key;
//   }
//
//   constructor(
//     dataSource: DataSource,
//     columns: Column[],
//     private itemGroup: IHeaderItemGroup,
//     readonly parent?: RowGroup) {
//
//     // build the concrete child classes
//     const children = this.itemGroup.items;
//     if (DataGridViewModel.isHeaderItemGroupArray(children)) {
//       this.childItems = children.map(item => new RowGroup(dataSource, columns, item, this));
//     } else {
//       this.childItems = children.map((item, index) => new ViewRow(index, dataSource, columns, new RowHeaderRowItem(item), this));
//     }
//   }
//
//   /**
//    * walk the tree to find the column nodes and return them
//    */
//   getRows(): ViewRow[] {
//     const rows: ViewRow[] = [];
//     this.childItems.forEach((child: ViewRow | RowGroup) => {
//       if (child instanceof ViewRow) {
//         rows.push(child);
//       } else {
//         rows.push(...child.getRows());
//       }
//     });
//     return rows;
//   }
// }
//
// /**
//  * Wrapping class for the IHeaderItem data and provides view model for row header group cells.
//  */
// export class RowHeaderRowItem {
//   /**
//    * Each row can have 0 or more header groups.  This list is used to generate the <th rowspan={}/> elements for the rows that need them.
//    *  - due to the row span, not every run will have these th cells rendered.
//    */
//   readonly groupCells: RowHeaderGroupCell[] = [];
//
//
//   /**
//    * @param headerItem
//    */
//   constructor(readonly headerItem: IHeaderItem) {
//
//   }
//
//   get key() {
//     return this.headerItem.key;
//   }
//
//   get label(): string {
//     return this.headerItem.label ? this.headerItem.label : this.key.toString();
//   };
//
// }
//
// /**
//  * Cells used to for rendering the header groups in the row-header component.
//  */
// export class RowHeaderGroupCell {
//
//   // the rowspan value - this is dependant on the active ViewRows (namely, the rows before and after of the same group)
//   span = 1;
//   // whether or not to show this cell - this is dependant on the active ViewRows (namely, the rows before and after of the same group)
//   show = false;
//
//   get key() {
//     return this.rowGroup.key;
//   }
//
//   get label(): string {
//     return this.rowGroup.label ? this.rowGroup.label : this.key.toString();
//   };
//
//   constructor(
//     readonly rowGroup: RowGroup,
//   ) {
//   }
// }
