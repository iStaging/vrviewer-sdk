import Vue from 'vue'
import PanoCollectionInfo from '../../../../../src/common/PanoCollectionInfo/index'
import Icon from '../../../../../src/components/Icon'
import store from '../../../../../src/store'
import { i18n } from '../../../../../src/main'

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

  it('預設顯示部分資訊', () => {
    expect(vm.showInfo)
      .toBe(true)
  })

  it('按下圖片會顯示/隱藏部分資訊', () => {
    const logoEl = vm.$el.querySelector('.vrsdk-pano-collection-figure')
    logoEl.click()
    expect(vm.showInfo)
      .toBe(false)
  })

  it('使用 panoCollection logo', () => {
    const imgEl = vm.$el.querySelector('.vrsdk-pano-collection-avatar')
    const fakeLogoSrc = 'https://www.istaging.com/sdk/logo-tripod.png'
    const fakePanoCollection = {
      objectId: '123',
      logoUrl: fakeLogoSrc
    }
    store.commit('SET_PANO_COLLECTION', fakePanoCollection)
    vm._watcher.run()

    expect(imgEl.src)
      .toBe(fakeLogoSrc)
  })
})
