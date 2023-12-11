export const toKvp = (
  obj: object,
  onlyForKeys?: string[]
): [string, string][] => {
  const keys = onlyForKeys || Object.keys(obj)
  return keys.map(key => [key, (obj as any)[key]])
}
