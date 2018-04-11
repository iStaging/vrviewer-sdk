export const clone = (object) => JSON.parse(JSON.stringify(object))
export const push = (array, value) => [...array, value]
export const unshift = (array, value) => [value, ...array]
export const remove = (index, array) => [...array.slice(0, index), ...array.slice(index + 1)]
