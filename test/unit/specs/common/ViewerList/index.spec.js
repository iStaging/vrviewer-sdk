import Vue from 'vue'
import ViewerList from '../../../../../src/common/ViewerList/index.vue'
import Panoramas from '../../../../../src/common/ViewerList/Panoramas.vue'
import store from '../../../../../src/store'
import { i18n } from '../../../../../src/main'

const Constructor = Vue.extend(ViewerList)

describe('common/ViewerList/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Panoramas
    }
  }).$mount()

  it('應該要有 className vrsdk-viewer-list', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-viewer-list')
  })
})
