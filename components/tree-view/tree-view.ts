import {Store, createStore} from "../../util/observable/store";
import {getOrCreateEntry} from "../../util/collection/map";
import type {StringKeys} from "../../util/types";

export type TreeNode = {
    label: string
    selected: Store<boolean>
    parent?: Branch;
    /**
     * Instruct the node to set itself to selected or not, allows branch nodes to propagate change down to children.
     * @param isSelected
     */
    toggleSelected: (isSelected: boolean) => void;
}

export type Branch = TreeNode & {
    collapsed: Store<boolean>;
    children: (Branch | Leaf)[];

    /**
     * Can be called to trigger a check of children to see if any are selected and toggle selected value accordingly.
     */
    checkSelected: () => void;
}

export type Leaf<T = any, M = any> = TreeNode & {
    /**
     * Use item for data to be passed around
     */
    data: T;
}


/**
 * builder function for BranchNode type
 * @param label
 * @param collapsed
 * @param parent
 */
function newBranchNode(label: string, collapsed: boolean, parent?: Branch): Branch {
    const children: (Branch | Leaf)[] = [];
    const selected = createStore(false);

    function toggleSelected(isSelected: boolean) {
        selected.set(isSelected);
        children.forEach(child => child.toggleSelected(isSelected));
        parent?.checkSelected();
    }

    // check if the branch should be toggled as selected.
    function checkSelected() {
        let childSelected = false;
        for (let child of children) {
            if (child.selected.get()) {
                childSelected = true;
                break;
            }
        }
        const notifyParent = selected.get() != childSelected;
        selected.set(childSelected);
        if (notifyParent) {
            parent?.checkSelected();
        }
    }

    return {
        label,
        parent: parent,
        selected,
        collapsed: createStore(collapsed),
        children,
        checkSelected,
        toggleSelected,
    }
}


/**
 * Walk the branch node children to extract all leaf nodes
 * @param node
 * @param leafNodes
 */
export function getLeafNodes(node: Branch, leafNodes: any[] = []) {
    node.children.forEach(child => {
        if (isBranchNode(child)) {
            getLeafNodes(child, leafNodes);
        } else {
            leafNodes.push(child);
        }
    });
    return leafNodes;
}

export type TreeDataSource = {
    /**
     * The parent nodes. This is what is rendered
     */
    nodes: (Branch | Leaf)[]

    /**
     * List of all leaf nodes.  Provided for accessibility to leaves, avoiding repeated node walking.
     */
    leafNodes: Leaf[]

}


export function isBranchNode(node: Branch | Leaf): node is Branch {
    // @ts-ignore
    return Array.isArray(node['children']);
}


// region TreeDataSource builder functions


/**
 * Create a tree view data source from a list of items, branches are based off of properties extracted from the list objects
 * @param items
 * @param props - branch properties to extract
 * @param nodeLabel
 */
export function newTreeViewDataSource<T = any>(items: T[], props: StringKeys<T>[], nodeLabel: (item: T) => string): TreeDataSource {
    const nodes: Branch[] = [];
    const leafNodes: Leaf<any, any>[] = [];
    // map branch key -> value -> branch node
    const branches = new Map<string, Map<string, Branch>>();

    items.forEach(item => {
        const label = nodeLabel(item);
        let branch: Branch;

        props.forEach((branchKey, index) => {
            const map = getOrCreateEntry(branches, branchKey, () => new Map());
            branch = getOrCreateEntry(map, item[branchKey], () => {
                const newBranch = newBranchNode(item[branchKey] as unknown as string, false, branch);
                if (index == 0) { // root node
                    nodes.push(newBranch);
                } else {
                    branch.children.push(newBranch);
                }
                return newBranch;
            });
        });

        const selected = createStore(false);

        function toggleSelected(isSelected: boolean) {
            selected.set(isSelected);
            branch.checkSelected();
        }

        const leafNode: Leaf = {
            label,
            data: item,
            selected,
            toggleSelected,
            parent: branch!,
        };

        leafNodes.push(leafNode);
        branch!.children.push(leafNode);
    });

    return {
        nodes,
        leafNodes,
    };
}

// endregion
