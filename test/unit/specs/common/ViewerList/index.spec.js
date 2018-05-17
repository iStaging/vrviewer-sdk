import Vue from 'vue'
import ViewerList from '@/common/ViewerList/index.vue'
import Panoramas from '@/common/ViewerList/Panoramas.vue'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(ViewerList)

describe('common/ViewerList/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Panoramas
    }
  }).$mount()

  it('應該要有 className viewer-list', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('viewer-list')
  })
})
