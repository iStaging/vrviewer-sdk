import Vue from 'vue'
import Panoramas from '@/common/ViewerList/Panoramas'
import Icon from '@/components/Icon/index'
import IRepeat from '@/components/IRepeat'
import store from '@/store'
import { i18n } from '@/main'
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
const Constructor = Vue.extend(Panoramas)
const customCategory = 'customCategory'
const category = 'others'
const thumbnail = 'thumbnail'
const panoramas = [
  { panoramaId: '1', name: 'name1', customCategory, thumbnail },
  { panoramaId: '2', name: 'name2', customCategory, thumbnail },
  { panoramaId: '3', name: 'name3', category, thumbnail },
  { panoramaId: '4', name: 'name4', category, thumbnail },
  { panoramaId: '5', name: 'name5', category, thumbnail },
  { panoramaId: '6', name: 'name6', category, thumbnail },
  { panoramaId: '7', name: 'name7', category, thumbnail },
  { panoramaId: '8', name: 'name8', category, thumbnail },
  { panoramaId: '9', name: 'name9', category, thumbnail },
  { panoramaId: '10', name: 'name10', category, thumbnail }
]
const index = 3

describe('common/ViewerList/Panoramas.vue', () => {
  let vm = new Constructor({
    i18n,
    store,
    components: {
      Icon,
      IRepeat
    }
  }).$mount()

  it('應該要有 className vrsdk-panoramas', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-panoramas')
  })

  it('在 Panoramas 數量 10 個，視窗大於等於 768 時要有寬度 1800', () => {
    store.commit('SET_PANORAMAS', panoramas)
    window.innerWidth = 768
    const lastMarginLeft = 20
    const marginLeft = 160
    const width = panoramas.length * (lastMarginLeft + marginLeft)
    vm._watcher.run()
    expect(vm.panoramasWidth)
      .toEqual(`${width}px`)
  })

  it('在 Panoramas 數量 10 個，視窗小於 768 時要有寬度 1400，且成功觸發 resizeHandler 並重新繪製', () => {
    window.innerWidth = 767
    const lastMarginLeft = 20
    const marginLeft = 120
    const width = panoramas.length * (lastMarginLeft + marginLeft)
    vm.resizeHandler()
    vm._watcher.run()
    expect(vm.panoramasWidth)
      .toEqual(`${width}px`)
  })

  it('子 DOM 的寬應等於 computed 內的 panoramasWidth', () => {
    const child = vm.$el.children[0]
    expect(child.style.width)
      .toEqual(vm.panoramasWidth)
  })

  it('當前 panorama 與 currentPanorama 相同時 panoramasList 指向的該 panorama 的 disabled 為 true', () => {
    vm = new Constructor({
      i18n,
      store,
      components: {
        Icon,
        IRepeat
      }
    }).$mount()
    store.commit('SET_PANORAMA', panoramas[index])
    expect(vm.panoramasList[index].disabled)
      .toEqual(true)
  })

  it('當前 panorama 與 currentPanorama 相同時 panoramasList 指向的該 panorama 的 isActive 為 true', () => {
    vm = new Constructor({
      i18n,
      store,
      components: {
        Icon,
        IRepeat
      }
    }).$mount()
    expect(vm.panoramasList[index].isActive)
      .toEqual(true)
  })

  it('當前 panorama 應該要讓 panoramas 之中相同 panoramaId disabled', () => {
    vm = new Constructor({
      i18n,
      store,
      components: {
        Icon,
        IRepeat
      }
    }).$mount()
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    expect(buttons[index].disabled)
      .toEqual(true)
  })

  it('當前 panorama disabled 時要有 className vrsdk-icon-disabled', () => {
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    expect(Array.prototype.slice.call(buttons[index].classList))
      .toContain('vrsdk-icon-disabled')
  })

  it('當前 panorama disabled 時要有 className vrsdk-panoramas-list-a-active', () => {
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    expect(Array.prototype.slice.call(buttons[index].classList))
      .toContain('vrsdk-panoramas-list-a-active')
  })

  it('panoramasList 裡的 image 要正確使用 image', () => {
    expect(vm.panoramasList[index].image)
      .toEqual(thumbnail)
  })

  it('點下與 currentPanorama 不同的 button 時會觸發事件', () => {
    store.commit('SET_PANORAMA', panoramas[3])
    store.commit('SET_KRPANO_EL', new FakeKrpanoEl())
    store.commit('SET_PROGRESS_ACTIVE', false)
    const panorama = panoramas[4]
    const spy = sinon.spy()
    emitter.on(`prepare_change_scene(panorama_${panorama.panoramaId}, ${panorama.panoramaId}, 'PanoramaList');`, spy)
    vm._watcher.run()
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    buttons[4].click()
    expect(spy.called)
      .toEqual(true)
  })

  it('點下與 currentPanorama 相同的 button 時不會觸發事件', () => {
    store.commit('SET_PANORAMA', panoramas[index])
    const panorama = panoramas[index]
    const spy = sinon.spy()
    emitter.on(`prepare_change_scene(panorama_${panorama.panoramaId}, ${panorama.panoramaId}, 'PanoramaList');`, spy)
    vm._watcher.run()
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    buttons[index].click()
    expect(spy.called)
      .toEqual(false)
  })

  it('點下與 currentPanorama 不同的 button 時觸發事件，會將多數的 layer 關閉', () => {
    const i = 2
    vm._watcher.run()
    const buttons = vm.$el.querySelectorAll('.vrsdk-panoramas-list-a')
    buttons[i].click()
    expect(store.state.share.isShareActive)
      .toEqual(false)
    expect(store.state.markerInfo.isMarkerInfoActive)
      .toEqual(false)
  })
})
