export const clone = (object) => JSON.parse(JSON.stringify(object))
export const push = (x, array) => [...array, x]
export const unshift = (x, array) => [x, ...array]
export const remove = (index, array) => [...array.slice(0, index), ...array.slice(index + 1)]
