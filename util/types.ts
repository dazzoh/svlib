/**
 * Utility Types
 */

/**
 * Pick string keys from an object
 */
export type StringKeys<T> = Extract<keyof T, string>;
