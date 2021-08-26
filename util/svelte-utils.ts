import {getContext} from "svelte";

/**
 * Common way of rendering some item (object or primitive) to the view.
 *  - "string" - used to extract a property value from an object -> item["string"].
 *  - Alternatively some function that returns a string.
 */
export type TemplateDefinition<T = any> = string | ((item: T) => string);

/**
 * Create a rendering function.
 *
 *  Generally used for rendering list items or when the type of item is not known.
 *  Falls back to calling toString on the item if nothing defined.
 *
 *
 * @param definition
 */
export function createTemplateRenderer(definition?: TemplateDefinition) {
    return definition ?
        typeof definition === 'string'
            ? (item:any) => item[definition as string]
            : definition
        : ((item: any) => item.toString());
}


/**
 * Wraps the svelte getContext to give type hints for assignment.
 * @param clazz 
 * @returns 
 */
export function getService<T>(clazz: { new(args?:any): T }): T {
    return getContext(clazz) as T;
}
