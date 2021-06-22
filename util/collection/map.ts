/**
 * Helper for returning a map entry.
 *
 *  If the entry doesn't exist the create function is used to generate it.
 *
 * @param map
 * @param key
 * @param create
 */
export function getOrCreateEntry<K = any, V = any>(map: Map<K, V>, key: K, create: () => V) {
  let entry = map.get(key);
  if (entry == undefined) {
    entry = create();
    map.set(key, entry);
  }
  return entry;
}
