import { mount } from '@vue/test-utils'
import FloorplanRange from '@/common/Floorplan/FloorplanRange.vue'
import store from '@/store'

const panorama = {
  objectId: 'b1',
  position: {
    x: 175,
    y: 200
  },
  floorplanRotation: 65,
  panoramaRotation: {
    x: 0,
    y: -25,
    z: 0
  }
}
describe('common/Floorplan/FloorplanRange.vue', () => {
  const cmp = mount(FloorplanRange ,{
    store
  })

  it('應該要有 className floorplan-range', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('floorplan-range')
  })

  it('位置產生自 currentPanorama 的 position', () => {
    store.commit('SET_PANORAMA', panorama)
    cmp.vm._watcher.run()
    const { x, y } = panorama.position
    expect(cmp.vm.$el.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${y}px)`)
  })

  it('ratioW、floorplanRatioX、xOffset 會協助修正扇形的位置', () => {
    const ratioW = 1.15
    const floorplanRatioX = 1.02
    const xOffset = -70
    const cmp = mount(FloorplanRange, {
      store,
      propsData: {
        ratioW,
        floorplanRatioX,
        xOffset
      }
    })
    const x = store.state.panoramas.currentPanorama.position.x * ratioW * floorplanRatioX + xOffset
    expect(cmp.vm.$el.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${store.state.panoramas.currentPanorama.position.y}px)`)
  })

  it('ratioH、floorplanRatioY、yOffset 會協助修正扇形的位置', () => {
    const ratioH = 1.2
    const floorplanRatioY = 1.01
    const yOffset = 100
    const cmp = mount(FloorplanRange, {
      store,
      propsData: {
        ratioH,
        floorplanRatioY,
        yOffset
      }
    })
    const y = store.state.panoramas.currentPanorama.position.y * ratioH * floorplanRatioY + yOffset
    expect(cmp.vm.$el.style['-webkit-transform'])
      .toEqual(`translate(${store.state.panoramas.currentPanorama.position.x}px, ${y}px)`)
  })

  it('角度產生自 currentPanorama 的 floorplanRotation，krpanoCamera.krpanoLookAtH、krpanoXOffset、currentPanorama.panoramaRotation.y 會影響結果', () => {
    store.commit('SET_KRPANO_LOOK_AT', { h: 45 })
    cmp.vm._watcher.run()
    const { floorplanRotation } = store.state.panoramas.currentPanorama
    const rangeEl = cmp.vm.$el.querySelector('.floorplan-range-inner')
    const cameraMoving = store.state.krpano.krpanoCamera.krpanoLookAtH - store.state.krpano.krpanoXOffset + store.state.panoramas.currentPanorama.panoramaRotation.y
    expect(rangeEl.style['-webkit-transform'])
      .toEqual(`rotateZ(${floorplanRotation + cameraMoving}deg)`)
  })
})
