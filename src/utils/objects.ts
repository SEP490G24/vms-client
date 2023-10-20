const traverseAndFlatten = (currentNode: any, target: any, flattenedKey?: string) => {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey
      if (flattenedKey === undefined) {
        newKey = key
      } else {
        newKey = flattenedKey + '.' + key
      }

      let value = currentNode[key]
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey)
      } else {
        target[newKey] = value
      }
    }
  }
}

export const flatten = (obj: any) => {
  let flattenedObject = {}
  traverseAndFlatten(obj, flattenedObject)
  return flattenedObject
}

export function groupBy<T, X>(list: T[], keyGetter: (t: T) => X) {
  const map = new Map<X, T[]>()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

