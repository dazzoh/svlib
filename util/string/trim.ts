/**
 * Trims the leading occurrence of the toRemove substring.
 * @param str - the string to trim
 * @param toRemove - the substring to remove
 */
export function trimLeading(str: string, toRemove: string): string {
    const rx = new RegExp(`^${toRemove}{1,}`);
    return str.replace(rx, '')
}

/**
 * Trims the trailing occurrence of the toRemove substring.
 * @param str - the string to trim
 * @param toRemove - the substring to remove
 */
export function trimTrailing(str: string, toRemove: string): string {
    const rx = new RegExp(toRemove + "+$");
    return str.replace(rx, '')
}

/**
 * Trims the leading amd trailing occurrences of the toRemove substring.
 * @param str - the string to trim
 * @param toRemove - the substring to remove
 */
export function trimBoth(str: string, toRemove: string) {
    const rx = new RegExp(`(^[${toRemove}]+)|([${toRemove}]+$)`,"g");
    return str.replace(rx, "")
}
