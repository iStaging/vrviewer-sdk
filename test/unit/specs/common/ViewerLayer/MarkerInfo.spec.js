import Vue from 'vue'
import MarkerInfo from '@/common/ViewerLayer/MarkerInfo.vue'
import store from '@/store'
import { i18n } from '@/main'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const Constructor = Vue.extend(MarkerInfo)
const vm = new Constructor({
  i18n,
  store
}).$mount()

describe('common/ViewerLayer/MarkerInfo.vue', () => {
  it('應該要有 className marker-info', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('marker-info')
  })

  it('type = \'memo\' 時，顯示 description', () => {
    store.commit('SET_MARKER_INFO_DATA', {
      type: 'memo',
      description: 'description'
    })
    vm._watcher.run()
    const el = vm.$el.querySelector('.marker-info-description')
    expect(el.textContent)
      .to.contain('description')
  })

  it('type = \'tag\' 時，顯示 name', () => {
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
    const el = vm.$el.querySelector('.marker-info-name')
    expect(el.textContent)
      .to.contain('name')
  })

  it('type = \'tag\' 時，顯示 price', () => {
    const el = vm.$el.querySelector('.marker-info-price')
    expect(el.textContent)
      .to.contain('price')
  })

  it('type = \'tag\' 時，顯示 description', () => {
    const el = vm.$el.querySelector('.marker-info-description')
    expect(el.textContent)
      .to.contain('description')
  })

  it('type = \'tag\' 時，顯示 action', () => {
    const el = vm.$el.querySelector('.marker-info-action')
    expect(el.textContent)
      .to.contain('action')
  })

  it('type = \'tag\' 時，顯示 photo', () => {
    const img = vm.$el.querySelector('.marker-info-image')
    expect(img.src.indexOf('/images/120x120.png'))
      .not.to.equal(-1)
  })

  it('DOM marker-info-button 按下去要觸發事件', () => {
    vm.clickTagAction = () => {
      emitter.emit('clickTagAction')
    }
    vm._watcher.run()
    const spy = sinon.spy()
    emitter.on('clickTagAction', spy)
    const el = vm.$el.querySelector('.marker-info-button')
    el.click()
    expect(spy.called)
      .to.equal(true)
  })
})
