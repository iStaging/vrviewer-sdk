import Vue from 'vue'
import PanoCollectionInfo from '@/common/PanoCollectionInfo/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(PanoCollectionInfo)

describe('common/PanoCollectionInfo/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Icon
    }
  }).$mount()

  it('應該要有 className pano-collection', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('pano-collection')
  })

  it('應該要有一個區塊 className pano-collection-figure', () => {
    expect(vm.$el.querySelector('.pano-collection-figure'))
      .not.toEqual(null)
  })

  it('應該要有一個區塊 className pano-collection-detail', () => {
    expect(vm.$el.querySelector('.pano-collection-detail'))
      .not.toEqual(null)
  })
})
