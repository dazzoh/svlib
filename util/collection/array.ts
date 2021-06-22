// array helpers

/**
 * Removes first instance of target in array.
 * @param {any[]} arr
 * @param target
 * @returns {boolean}
 */
export function splice(arr: any[], target: any): boolean {
    const index = arr.indexOf(target);
    const found = index > -1;
    if (found) {
        arr.splice(index);
    }
    return found;
}


/**
 * Removes all instances of target from the array.
 * @param {any[]} arr
 * @param target
 * @returns {number} - number of instances found and removed.
 */
export function spliceAll(arr: any[], target: any) {
    let count = 0,
        index = arr.indexOf(target);

    while (index != -1) {
        arr.splice(index);
        count++;
        index = arr.indexOf(target, index); // search from last found position
    }

    return count;
}

/**
 * In-place array shuffling.
 * @param arr - the array to shuffle.
 */
export function shuffle(arr: any[]) {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

/***
 * Insert an item into the array at the index
 * @param arr
 * @param index
 * @param item
 */
export function insertAt(arr: any[], index: number, item: any) {
    if (index < arr.length - 1) {
        arr.splice(index, 0, item);
    } else {
        arr.push(item);
    }
}
