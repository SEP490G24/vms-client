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

