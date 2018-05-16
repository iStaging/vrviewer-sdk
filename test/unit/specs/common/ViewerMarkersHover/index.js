import { mount } from '@vue/test-utils'
import ViewerMarkersHover from '@/common/ViewerMarkersHover/index.vue'
import store from '@/store'
import { i18n } from '@/main'
import { isMobile } from '../../../../../src/api/utils'

const panoramas = [{
  objectId: '1',
  customCategory: 'test'
}, {
  objectId: '2',
  category: 'livingroom'
}]
const marker = {
  nextPanoramaId: '2',
  type: 'point'
}
describe('common/ViewerMarkersHover/index.vue', () => {
  const cmp = mount(ViewerMarkersHover, {
    i18n,
    store
  })

  it('應該要有 className viewer-markers-hover', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('viewer-markers-hover')
  })

  it('應該要有 className viewer-markers-hover', () => {
    store.commit('SET_PANORAMAS', panoramas)
    store.commit('SET_MARKER', marker)
    cmp.vm._watcher.run()
    expect(cmp.vm.$el.textContent)
      .toEqual(cmp.vm.nextCategory)
  })

  it('shouldShowMarkerInfo 在桌電裝置及 marker 為站點時等於 true', () => {
    let shouldShowMarkerInfo = !isMobile() && cmp.vm.currentMarker.type === 'point'
    expect(cmp.vm.shouldShowMarkerInfo)
      .toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = !isMobile() && cmp.vm.currentMarker.type === 'memo'
    expect(cmp.vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = isMobile() && cmp.vm.currentMarker.type === 'point'
    expect(cmp.vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)
  })

  it('nextPanorama 的 objectId 應該要等於站點的 nextPanoramaId', () => {
    const nextPanorama = cmp.vm.panoramas.find(panorama => panorama.objectId === cmp.vm.currentMarker.nextPanoramaId)
    expect(cmp.vm.nextPanorama)
      .toEqual(nextPanorama)
  })
})
