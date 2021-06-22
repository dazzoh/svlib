import {trimBoth} from "@spktr/util/string/trim";

/**
 * Test if a string var is null or empty.
 * @param value - the string variable to test.
 * @param trim - whether or not to trim whitespace first.
 */
export function isEmpty(value?: string, trim = false): boolean {
    if(value == null ){
        return true;
    }
    if (trim) {
        value = trimBoth(value, "");
    }
    return value === ""
}
