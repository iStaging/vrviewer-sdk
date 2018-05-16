import { mount } from '@vue/test-utils'
import FloorplanDots from '@/common/Floorplan/FloorplanDots.vue'
import store from '@/store'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const FakeKrpanoEl = function () {
  return {
    call: function (name) {
      emitter.emit(name)
    }
  }
}
const panoramas = [{
  objectId: 'a1',
  position: {
    x: 20,
    y: 25
  }
}, {
  objectId: 'a2',
  position: {
    x: 205,
    y: 100
  }
}, {
  objectId: 'a3',
  position: {
    x: 77,
    y: 156
  }
}]
describe('common/Floorplan/FloorplanDots.vue', () => {
  let cmp = mount(FloorplanDots, {
    store
  })

  it('應該要有 className floorplan-dots', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('floorplan-dots')
  })

  it('panoramas 有幾個就要正確產生幾個點', () => {
    store.commit('SET_PANORAMAS', panoramas)
    cmp.vm._watcher.run()
    const pointsEl = cmp.vm.$el.querySelectorAll('.floorplan-point')
    expect(pointsEl.length)
      .toEqual(store.state.panoramas.panoramas.length)
  })

  it('各個點有自己的位置', () => {
    const pointsEl = cmp.vm.$el.querySelectorAll('.floorplan-point')
    panoramas.forEach((panorama, index) => {
      const { x, y } = panorama.position
      expect(pointsEl[index].style['-webkit-transform'])
        .toEqual(`translate(${x}px, ${y}px)`)
    })
  })

  it('各個點都可以觸發 krpano 事件', () => {
    const krpanoEl = new FakeKrpanoEl()
    store.commit('SET_KRPANO_EL', krpanoEl)
    cmp.vm._watcher.run()
    const pointsEl = cmp.vm.$el.querySelectorAll('.floorplan-point')
    panoramas.forEach((panorama, index) => {
      const spy = sinon.spy()
      emitter.on(`prepare_change_scene(panorama_${panorama.objectId}, ${panorama.objectId});`, spy)
      pointsEl[index].click()
      expect(spy.called)
        .toEqual(true)
    })
  })

  it('有一個點產生自 currentPanorama', () => {
    store.commit('SET_PANORAMA', panoramas[0])
    cmp.vm._watcher.run()
    const pointEl = cmp.vm.$el.querySelector('.floorplan-activated-point')
    expect(pointEl)
      .not.toEqual(null)
  })

  it('啟動中的點顏色可自訂', () => {
    const activatedColor = 'rgb(171, 205, 239)'
    cmp = mount(FloorplanDots, {
      store,
      propsData: {
        activatedColor
      }
    })
    const pointEl = cmp.vm.$el.querySelector('.floorplan-activated-point')
    expect(pointEl.style.backgroundColor)
      .toEqual(activatedColor)
  })

  it('啟動中的點有自己的位置', () => {
    const pointEl = cmp.vm.$el.querySelector('.floorplan-activated-point')
    const { x, y } = store.state.panoramas.currentPanorama.position
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${y}px)`)
  })

  it('ratioW、floorplanRatioX、xOffset 會協助修正點的位置', () => {
    const ratioW = 1.3
    const floorplanRatioX = 1.1
    const xOffset = 50
    cmp = mount(FloorplanDots, {
      store,
      propsData: {
        ratioW,
        floorplanRatioX,
        xOffset
      }
    })
    const pointEl = cmp.vm.$el.querySelector('.floorplan-activated-point')
    const x = store.state.panoramas.currentPanorama.position.x * ratioW * floorplanRatioX + xOffset
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${store.state.panoramas.currentPanorama.position.y}px)`)
  })

  it('ratioH、floorplanRatioY、yOffset 會協助修正點的位置', () => {
    const ratioH = 1.2
    const floorplanRatioY = 1.5
    const yOffset = -30
    cmp = mount(FloorplanDots, {
      store,
      propsData: {
        ratioH,
        floorplanRatioY,
        yOffset
      }
    })
    const pointEl = cmp.vm.$el.querySelector('.floorplan-activated-point')
    const y = store.state.panoramas.currentPanorama.position.y * ratioH * floorplanRatioY + yOffset
    console.log('pointEl.style', pointEl.style)
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${store.state.panoramas.currentPanorama.position.x}px, ${y}px)`)
  })
})
