const DEBUG = process.env.NODE_ENV === "development";

export interface ILinkedListItem {
    next?: ILinkedListItem;
    previous?: ILinkedListItem;
}

/**
 * Linked list with items being inserted at the start(head) by default
 */
export class LinkedList<T extends ILinkedListItem> {
    protected head?: ILinkedListItem;
    protected tail?: ILinkedListItem;
    private size = 0;

    get length() {
        return this.size;
    }

    get isEmpty() {
        return this.length === 0;
    }

    /**
     * Insert at head of the queue
     * @param item
     */
    insert(item: T) {
        this.size++;
        if (this.head == null) {
            if(DEBUG){
                console.assert(this.tail == null, "tail can't be null if head is");
            }
            this.head = item;
            this.tail = item;
            return;
        }
        if (DEBUG) {
            if(this.head == item){
                throw new Error("item inserted is already in the list!");
            }
            console.assert(this.head != item, "item is already head of the list");
        }
        this.head.previous = item; // move first one down the list
        item.next = this.head;
        this.head = item;
    }

    /**
     * Insert at tail of the queue
     * @param item
     */
    insertLast(item: T) {
        this.size++;
        if (this.tail == null) {
            this.head = item;
            this.tail = item;
            return;
        }
        if (DEBUG && this.tail == item) {
            throw new Error("item inserted is already in the list!");
        }
        item.previous = this.tail;
        this.tail.next = item;
        this.tail = item;
    }

    remove(item: T) {
        let previous = item.previous;
        let next = item.next;
        if (previous) {
            previous.next = next;
        }
        if (next) {
            next.previous = previous;
        }

        if (this.head === item) {
            this.head = next;
        }
        if (this.tail === item) {
            this.tail = previous;
        }
        item.next = undefined;
        item.previous = undefined;
        this.size--;
    }

    clear() {
        if (this.size === 1) {
            (this.head as ILinkedListItem).next = undefined;
            (this.head as ILinkedListItem).previous = undefined;
            return;
        } else {
            let entry = this.head;
            while (entry != null) {
                entry.previous = undefined;
                let next = entry.next;
                entry.next = undefined;
                entry = next;
            }
        }
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    forEach(fn: (item: T) => void) {
        if (this.size === 1) {
            fn(this.head as T);
            return;
        }
        let entry = this.head;
        while (entry != null) {
            fn(entry as T);
            entry = entry.next;
        }
    }

    async forEachAsync(fn: (item: T) => Promise<void>) {
        if (this.size === 1) {
            await fn(this.head as T);
            return;
        }
        let entry = this.head;
        while (entry != null) {
            await fn(entry as T);
            entry = entry.next;
        }
    }


    /**
     * Clear the list, passing each to the fn provided
     * @param fn
     */
    forEachClear(fn: (item: T) => void) {
        if (this.size === 1) {
            fn(this.head as T);
            this.size = 0;
            (this.head as ILinkedListItem).next = undefined;
            (this.head as ILinkedListItem).previous = undefined;
            this.head = undefined;
            this.tail = undefined;
            return;
        }
        let entry = this.head;
        while (entry != null) {
            entry.previous = undefined;
            let next = entry.next;
            entry.next = undefined;
            fn(entry as T);
            entry = next;
        }
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    /**
     * Remove all items from this entry towards the tail
     * @return - the number of items removed
     */
    removeFrom(item: ILinkedListItem | undefined): ILinkedListItem[] {
        if (item == undefined) {
            return [];
        }
        const toRemove = [];
        let next: ILinkedListItem | undefined = item;
        while (next != undefined) {
            toRemove.push(next);
            next = item.next;
        }

        // remove from the tail backwards. todo: this can certainly be optimised.
        for (let i = toRemove.length -1; i >= 0; i--) {
            this.remove(toRemove[i] as T);
        }
        // toRemove.reverse().forEach(entry => this.remove(entry as T));
        return toRemove;
    }

}
