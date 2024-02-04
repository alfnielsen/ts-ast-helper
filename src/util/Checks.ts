export function isType<TType>(
  item?: TType,
  type?: TType | TType[],
): item is TType {
  if (item === undefined || type === undefined) {
    return false
  }
  if (Array.isArray(type)) {
    if (type.includes(item)) {
      return true
    }
  }
  return type === item ? true : false
}
