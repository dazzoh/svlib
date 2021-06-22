const defaultSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a rand string from the possible set of characters
 * @param len - the random string length
 * @param possible - the set of characters from which to generate the random string
 */
export function randomString(len = 5, possible = defaultSet): string {
    let text = "";
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
