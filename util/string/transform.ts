// region string case transformation

export enum StringTransform {
    Uppercase,
    UpperFirst,
    Lowercase,
    SnakeToCamel,
    CamelToUpperSpaced,
    None,
}

// transform string case
export function transformString(val: string, transform: StringTransform): string {
    switch (transform) {
        case StringTransform.Uppercase:
            return val.toUpperCase();
        case StringTransform.UpperFirst:
            return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
        case StringTransform.Lowercase:
            return val.toLowerCase();
        case StringTransform.SnakeToCamel:
            return snakeToCamel(val);
        case StringTransform.CamelToUpperSpaced:
            return camelToUpperSpaced(val);
        case StringTransform.None:
            return val;
    }
}

/**
 * Convert snake_case string to CamelCase
 * @param val - the string to transform
 * @param upperFirst - first character should be uppercase.
 */
export function snakeToCamel(val: string, upperFirst = true) {
    let name = upperFirst ? val.charAt(0).toUpperCase() : val.charAt(0);
    let capNext = false;
    for (let i = 1; i < val.length; i++) {
        let c = val[i];
        if (capNext) {
            name += c.toUpperCase();
            capNext = false;
            continue;
        }
        if (c === "_") {
            capNext = true;
            continue;
        }
        name += c;
    }
    return name;
}

/**
 * Take camel case and add spaces with each word capitalised.
 * @param val
 */
export function camelToUpperSpaced(val: string) {
    let name = val.charAt(0).toUpperCase();
    for (let i = 1; i < val.length; i++) {
        let c = val[i];
        if (c === c.toUpperCase()){
            name += " ";
        }
        name += c;
    }
    return name;
}

// endregion
