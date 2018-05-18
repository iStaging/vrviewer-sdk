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

  it('應該要有 className vrsdk-pano-collection', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-pano-collection')
  })

  it('應該要有一個區塊 className vrsdk-pano-collection-figure', () => {
    expect(vm.$el.querySelector('.vrsdk-pano-collection-figure'))
      .not.toEqual(null)
  })

  it('應該要有一個區塊 className vrsdk-pano-collection-detail', () => {
    expect(vm.$el.querySelector('.vrsdk-pano-collection-detail'))
      .not.toEqual(null)
  })
})
