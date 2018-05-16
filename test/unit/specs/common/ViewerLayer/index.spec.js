import Vue from 'vue'
import ViewerLayer from '@/common/ViewerLayer/index.vue'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const Constructor = Vue.extend(ViewerLayer)
const innerClassName = 'aoswuifhaweg'
const vm = new Constructor({
  propsData: {
    closeEvent: () => {
      emitter.emit('closeEvent')
    },
    innerClassName
  }
}).$mount()

describe('common/ViewerLayer/index.vue', () => {
  it('應該要有 className viewer-layer', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('viewer-layer')
  })

  it('要有一個背景', () => {
    const el = vm.$el.querySelector('.viewer-layer-close-bg')
    expect(el)
      .not.to.equal(null)
  })

  it('背景可以觸發傳進來的事件', () => {
    const spy = sinon.spy()
    emitter.on('closeEvent', spy)
    const el = vm.$el.querySelector('.viewer-layer-close-bg')
    el.click()
    expect(spy.called)
      .to.equal(true)
  })

  it('關閉按鈕可以觸發傳進來的事件', () => {
    const spy = sinon.spy()
    emitter.on('closeEvent', spy)
    const el = vm.$el.querySelector('.viewer-layer-close')
    el.click()
    expect(spy.called)
      .to.equal(true)
  })

  it('DOM viewer-layer-inner 可以涵蓋傳進來的 class', () => {
    const el = vm.$el.querySelector('.viewer-layer-inner')
    expect(Array.prototype.slice.call(el.classList))
      .to.include(innerClassName)
  })
})
