// import { vrmaker } from '../../src/index.js'

import VueTest from './VueTest.vue'

VueTest.install = function (Vue) {
  Vue.component('VueTest', VueGoogleMap)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTest)
}

// export default VueGoogleMap

// es6

const test = () => {
  console.log('in test')
}

// console.log(vrmaker)

export {
  VueTest,
  test
  // vrmaker
}
