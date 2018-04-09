export const clone = (obj) => {
  if (!obj && typeof obj !== 'object') {
    return
  }
  let newObj = obj.constructor === Object ? {} : []
  for (let key in obj) {
    newObj[key] = (obj[key] && typeof obj[key] === 'object') ? clone(obj[key]) : obj[key]
  }
  return newObj
}
export const push = (x, array) => [...array, x]
export const unshift = (x, array) => [x, ...array]
export const remove = (index, array) => [...array.slice(0, index), ...array.slice(index + 1)]
