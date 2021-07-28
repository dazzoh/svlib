// Helper functions for working with form data / models.


/**
 * Create a function for comparing objects.
 * @param comparator - pass an existing function in, a property name (string), or nothing to return a basic object equality function
 */
export function createComparator<T>(comparator?: ((item: T, other: T) => boolean) | string): (item: T, other: T) => boolean {
    if (comparator == undefined) {
        return (item: T, other: T) => item == other;
    }
    if (typeof comparator == 'string') {
        // @ts-ignore
        return (first, second) => first[comparator] === second[comparator];
    } else {
        return comparator;
    }
}


export function contains<T = any>(source: T[], searchItem: T, compare: (item: T, other: T) => boolean): boolean {
    return source.find(item => compare(item, searchItem)) != undefined;
}

export function findIndex<T = any>(source: T[], searchItem: T, compare: (item: T, other: T) => boolean): number {
    return source.findIndex(item => compare(item, searchItem))
}
