/* eslint-disable */
String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}
