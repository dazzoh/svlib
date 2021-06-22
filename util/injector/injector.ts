
/**
 * Simple injector for wiring shared services.
 */

export interface InjectableConstructor {
    new(): any;
}

type Store = Map<InjectableConstructor, { replaced: boolean, instance: any, ctor: InjectableConstructor }>

const instances = new Map<InjectableConstructor, { replaced: boolean, instance: any, ctor: InjectableConstructor }>();

// scoped injections
const scoped = new Map<string, Store>();

/**
 *
 * @param args - configures the injection - replace, class to replace.
 * eg: @Injectable({replace:Class1}
 *      class Class2 {
 *
 *      }
 *      inject(Class1) === Class2
 * @constructor
 */
export function Injectable<R extends X, X extends InjectableConstructor>(args?: { replace: R }) {
    return function <T extends X & R>(constructor: T) {
        const key = args != null ? args.replace : constructor;
        if (args != null) {
            let entry = instances.get(key);
            // todo check if this could error unreasonably. eg: replacing class was registered before the replaced class
            if (entry && entry.replaced) {
                throw new Error(`Entry ${constructor} already replaced`);
            }
            instances.set(args.replace, {replaced: true, ctor: constructor, instance: null});
        } else {
            instances.set(constructor, {replaced: false, ctor: constructor, instance: null});
        }
    }
}

export function inject<T>(clazz: { new(): T }, scope?: string): T {
    let entry = instances.get(clazz);
    if (entry === undefined) {
        throw new Error(`Class: ${clazz.name.toString()} not registered as injectable:`);
    }
    // scoped instance
    if (scope) {
        let store = scoped.get(scope);
        if (store == null) {
            store = new Map<InjectableConstructor, { replaced: boolean, instance: any, ctor: InjectableConstructor }>();
            scoped.set(scope, store);
        }
        let scopedEntry = store.get(clazz);
        if (scopedEntry == null) {
            scopedEntry = {instance: new entry.ctor, replaced: entry.replaced, ctor: entry.ctor};
            store.set(clazz, scopedEntry);
        }
        return scopedEntry.instance;
    } else {
        if (entry.instance === null) {
            entry.instance = new entry.ctor;
        }
        return entry.instance;
    }
}
