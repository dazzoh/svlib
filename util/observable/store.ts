import { Writable, writable } from 'svelte/store';

export type Store<T = any> = Writable<T> & { get(): T };

/**
 * Writable store with more convenient get method. -> Svelte Writable requires subscribe to get value.
 * @param value
 */
export function createStore<T>(value: T): Store<T> {
    let originalWritable = writable<T>(value);
    function set(newValue: any) {
        return originalWritable.set(value = newValue);
    }
    function update(fn: (originalValue: T) => T) {
        originalWritable.update((oldValue: T) => (value = fn(oldValue)));
    }
    function get() {
        return value;
    }
    return { set, update, subscribe: originalWritable.subscribe, get }
}
