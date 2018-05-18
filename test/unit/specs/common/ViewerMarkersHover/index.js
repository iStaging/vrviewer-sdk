import Vue from 'vue'
import ViewerMarkersHover from '../../../../../src/common/ViewerMarkersHover/index.vue'
import store from '../../../../../src/store'
import { isMobile } from '../../../../../src/api/utils'

const Constructor = Vue.extend(ViewerMarkersHover)
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
  const vm = new Constructor({
    store
  }).$mount()

  it('應該要有 className vrsdk-viewer-markers-hover', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-viewer-markers-hover')
  })

  it('應該要有 className vrsdk-viewer-markers-hover', () => {
    store.commit('SET_PANORAMAS', panoramas)
    store.commit('SET_MARKER', marker)
    vm._watcher.run()
    expect(vm.$el.textContent)
      .toEqual(vm.nextCategory)
  })

  it('shouldShowMarkerInfo 在桌電裝置及 marker 為站點時等於 true', () => {
    let shouldShowMarkerInfo = !isMobile() && vm.currentMarker.type === 'point'
    expect(vm.shouldShowMarkerInfo)
      .toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = !isMobile() && vm.currentMarker.type === 'memo'
    expect(vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = isMobile() && vm.currentMarker.type === 'point'
    expect(vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)
  })

  it('nextPanorama 的 objectId 應該要等於站點的 nextPanoramaId', () => {
    const nextPanorama = vm.panoramas.find(panorama => panorama.objectId === vm.currentMarker.nextPanoramaId)
    expect(vm.nextPanorama)
      .toEqual(nextPanorama)
  })
})
