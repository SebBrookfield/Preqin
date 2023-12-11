export const camelCaseToSentenceCase = (s: string) => {
  return s
    .replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, ' $1')
    .replace(/./, m => m.toUpperCase())
    .trim()
}
