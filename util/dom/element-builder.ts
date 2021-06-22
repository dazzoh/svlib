
// a list of the settable style keys for an HTMLElement
export type StyleKeys = keyof Omit<CSSStyleDeclaration,
  "length" |
  "parentRule" |
  "getPropertyPriority" |
  "getPropertyValue" |
  "item" |
  "removeProperty" |
  "setProperty">;


/**
 * Builds HTML Element and sets css.
 * @param tag
 * @param css
 */
export function ele(tag: string, css?: string) {
    const e = document.createElement(tag);
    if (css) {
        e.className = css;
    }
    return e;
}

export function eleBuilder(tag: string) {
    return new ElementBuilder(tag);
}

/**
 * * Allows for repeatedly stamping out elements with the defined CSS and Style attributes.
 */
export class ElementBuilder {
    private _css: string[] = [];
    private styles: { key: StyleKeys, value: string }[] = [];

    constructor(private tag: string) {
    }

    css(css: string) {
        this._css.push(css);
        return this;
    }

    style(key: StyleKeys, value: string) {
        this.styles.push({key: key, value: value});
        return this;
    }

    build() {
        const element = ele(this.tag, this._css.join(" "));
        this.styles.forEach(s => {
            // @ts-ignore
            element.style[s.key] = s.value;
        });
        return element;
    }
}
