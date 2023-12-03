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

type EnumType = { [key: string]: string | number };
type EnumAsArrayType = {
  key: string;
  value: string | number;
}[];
export const enumToArray = (data: EnumType): EnumAsArrayType =>
  Object.keys(data)
    .filter((key) => Number.isNaN(+key))
    .map((key: string) => ({
      key,
      value: data[key]
    }))

export function isNullish(object: Object): boolean {
  if (Object.keys(object).length === 0) return true
  return Object.values(object).every(value => !value)
}

export const equalsCheck = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b)
}



