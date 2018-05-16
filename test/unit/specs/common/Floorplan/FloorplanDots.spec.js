import Vue from 'vue'
import FloorplanDots from '@/common/Floorplan/FloorplanDots.vue'
import store from '@/store'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const Constructor = Vue.extend(FloorplanDots)
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
  const vm = new Constructor({
    store
  }).$mount()

  it('應該要有 className floorplan-dots', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('floorplan-dots')
  })

  it('panoramas 有幾個就要正確產生幾個點', () => {
    store.commit('SET_PANORAMAS', panoramas)
    vm._watcher.run()
    const pointsEl = vm.$el.querySelectorAll('.floorplan-point')
    expect(pointsEl.length)
      .toEqual(store.state.panoramas.panoramas.length)
  })

  it('各個點有自己的位置', () => {
    const pointsEl = vm.$el.querySelectorAll('.floorplan-point')
    panoramas.forEach((panorama, index) => {
      const { x, y } = panorama.position
      expect(pointsEl[index].style['-webkit-transform'])
        .toEqual(`translate(${x}px, ${y}px)`)
    })
  })

  it('各個點都可以觸發 krpano 事件', () => {
    const krpanoEl = new FakeKrpanoEl()
    store.commit('SET_KRPANO_EL', krpanoEl)
    vm._watcher.run()
    const pointsEl = vm.$el.querySelectorAll('.floorplan-point')
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
    vm._watcher.run()
    const pointEl = vm.$el.querySelector('.floorplan-activated-point')
    expect(pointEl)
      .not.toEqual(null)
  })

  it('啟動中的點顏色可自訂', () => {
    const activatedColor = 'rgb(171, 205, 239)'
    const vm = new Constructor({
      store,
      propsData: {
        activatedColor
      }
    }).$mount()
    const pointEl = vm.$el.querySelector('.floorplan-activated-point')
    expect(pointEl.style.backgroundColor)
      .toEqual(activatedColor)
  })

  it('啟動中的點有自己的位置', () => {
    const pointEl = vm.$el.querySelector('.floorplan-activated-point')
    const { x, y } = store.state.panoramas.currentPanorama.position
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${y}px)`)
  })

  it('ratioW、floorplanRatioX、xOffset 會協助修正點的位置', () => {
    const ratioW = 1.3
    const floorplanRatioX = 1.1
    const xOffset = 50
    const vm = new Constructor({
      store,
      propsData: {
        ratioW,
        floorplanRatioX,
        xOffset
      }
    }).$mount()
    const pointEl = vm.$el.querySelector('.floorplan-activated-point')
    const x = store.state.panoramas.currentPanorama.position.x * ratioW * floorplanRatioX + xOffset
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${x}px, ${store.state.panoramas.currentPanorama.position.y}px)`)
  })

  it('ratioH、floorplanRatioY、yOffset 會協助修正點的位置', () => {
    const ratioH = 1.2
    const floorplanRatioY = 1.5
    const yOffset = -30
    const vm = new Constructor({
      store,
      propsData: {
        ratioH,
        floorplanRatioY,
        yOffset
      }
    }).$mount()
    const pointEl = vm.$el.querySelector('.floorplan-activated-point')
    const y = store.state.panoramas.currentPanorama.position.y * ratioH * floorplanRatioY + yOffset
    console.log('pointEl.style', pointEl.style)
    expect(pointEl.style['-webkit-transform'])
      .toEqual(`translate(${store.state.panoramas.currentPanorama.position.x}px, ${y}px)`)
  })
})
