import Vue from 'vue'
import ViewerList from '@/common/ViewerList/index.vue'
import Groups from '@/common/ViewerList/Groups.vue'
import Panoramas from '@/common/ViewerList/Panoramas.vue'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(ViewerList)

describe('common/ViewerList/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Groups,
      Panoramas
    }
  }).$mount()

  it('應該要有 className viewer-list', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('viewer-list')
  })

  it('如果 hasProperty 是 false，不產出 Groups', () => {
    store.commit('SET_HAS_PROPERTY', false)
    const groups = vm.$el.querySelector('.groups')
    expect(groups)
      .to.equal(null)
  })
})
