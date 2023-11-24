export default function shallowCompare<T extends object>(
  obj1: T,
  obj2: T,
): boolean {
  if (obj1 === obj2) {
    return true
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (
      !Object.hasOwn(obj2, key) ||
      obj1[key as never] !== obj2[key as never]
    ) {
      return false
    }
  }

  return true
}
