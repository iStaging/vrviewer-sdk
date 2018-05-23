import Vue from 'vue'
import MarkerInfo from '../../../../../src/common/ViewerLayer/MarkerInfo.vue'
import store from '../../../../../src/store'
import { i18n } from '../../../../../src/main'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const Constructor = Vue.extend(MarkerInfo)
const vm = new Constructor({
  i18n,
  store
}).$mount()

describe('common/ViewerLayer/MarkerInfo.vue', () => {
  it('應該要有 className vrsdk-marker-info', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-marker-info')
  })

  it('type = \'memo\' 時，vrsdk-marker-info-memo 區塊顯示', () => {
    store.commit('SET_MARKER_INFO_DATA', {
      type: 'memo',
      description: 'description'
    })
    vm._watcher.run()
    const el = vm.$el.querySelector('.vrsdk-marker-info-memo')
    expect(el.style.display)
      .not.toEqual('none')
  })

  it('type = \'tag\' 時，顯示 vrsdk-marker-info-tag 區塊顯示', () => {
    store.commit('SET_MARKER_INFO_DATA', {
      type: 'tag',
      name: 'name',
      price: 'price',
      description: 'description',
      action: 'action',
      actionLink: 'actionLink',
      photo: '/images/120x120.png'
    })
    vm._watcher.run()
    const el = vm.$el.querySelector('.vrsdk-marker-info-tag')
    expect(el.style.display)
      .not.toEqual('none')
  })

  it('tag 沒有 photo 時要隱藏圖', () => {
    const markerInfo = {
      type: 'tag',
      name: 'name',
      price: 'price',
      description: 'description',
      action: 'action',
      actionLink: 'actionLink'
    }
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    let el = vm.$el.querySelector('.vrsdk-marker-info-large-left')
    expect(el.style.display)
      .toEqual('none')

    markerInfo.photo = '/images/120x120.png'
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    el = vm.$el.querySelector('.vrsdk-marker-info-large-left')
    expect(el.style.display)
      .not.toEqual('none')
  })

  it('tag 圖要正確塞入 img', () => {
    const markerInfo = {
      type: 'tag',
      name: 'name',
      price: 'price',
      description: 'description',
      action: 'action',
      actionLink: 'actionLink',
      photo: '/images/120x120.png'
    }
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    const el = vm.$el.querySelector('.vrsdk-marker-info-image')
    expect(el.src)
      .toEqual(markerInfo.photo)
  })

  it('tag 沒有 price 時要隱藏價錢', () => {
    const markerInfo = {
      type: 'tag',
      name: 'name'
    }
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    let el = vm.$el.querySelector('.vrsdk-marker-info-price')
    expect(el.style.display)
      .toEqual('none')

    markerInfo.price = 'price'
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    el = vm.$el.querySelector('.vrsdk-marker-info-price')
    expect(el.style.display)
      .not.toEqual('none')
  })

  it('tag 沒有 action 時要隱藏按鈕', () => {
    const markerInfo = {
      type: 'tag',
      name: 'name',
      actionLink: 'actionLink'
    }
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    let el = vm.$el.querySelector('.vrsdk-marker-info-action')
    expect(el.style.display)
      .toEqual('none')

    markerInfo.action = 'action'
    store.commit('SET_MARKER_INFO_DATA', markerInfo)
    vm._watcher.run()
    el = vm.$el.querySelector('.vrsdk-marker-info-action')
    expect(el.style.display)
      .not.toEqual('none')
  })

  it('DOM vrsdk-marker-info-button 按下去要觸發事件', () => {
    vm.clickTagAction = () => {
      emitter.emit('clickTagAction')
    }
    vm._watcher.run()
    const spy = sinon.spy()
    emitter.on('clickTagAction', spy)
    const el = vm.$el.querySelector('.vrsdk-marker-info-button')
    el.click()
    expect(spy.called)
      .toEqual(true)
  })

  it('監聽 currentPanorama 在改變時要能觸發事件', () => {
    vm.closeMarkerInfo = () => {
      emitter.emit('closeMarkerInfo')
    }
    vm.setMarkerInfoData = () => {
      emitter.emit('setMarkerInfoData')
    }
    const spy1 = sinon.spy()
    emitter.on('closeMarkerInfo', spy1)
    const spy2 = sinon.spy()
    emitter.on('setMarkerInfoData', spy2)
    store.commit('SET_PANORAMA', { 'something': 'was changed' })
    vm._watcher.run()
    vm.$nextTick(() => {
      expect(spy1.called)
        .toEqual(true)
      expect(spy2.called)
        .toEqual(true)
    })
  })
})
