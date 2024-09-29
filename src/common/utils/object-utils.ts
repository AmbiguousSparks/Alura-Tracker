export function cloneObject<T>(object: T): T {
  return JSON.parse<T>(JSON.stringify(object));
}
