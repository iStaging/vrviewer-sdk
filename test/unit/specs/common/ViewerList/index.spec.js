import { mount } from '@vue/test-utils'
import ViewerList from '@/common/ViewerList/index.vue'
import Panoramas from '@/common/ViewerList/Panoramas.vue'
import store from '@/store'
import { i18n } from '@/main'

describe('common/ViewerList/index.vue', () => {
  const cmp = mount(ViewerList, {
    i18n,
    store,
    components: {
      Panoramas
    }
  })

  it('應該要有 className viewer-list', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('viewer-list')
  })
})
