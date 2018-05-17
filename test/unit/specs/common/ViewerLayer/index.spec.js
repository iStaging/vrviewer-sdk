import Vue from 'vue'
import ViewerLayer from '@/common/ViewerLayer/index.vue'
import { i18n } from '@/main'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const Constructor = Vue.extend(ViewerLayer)
const innerClassName = 'viewer-layer-inner-custom-class'

describe('common/ViewerLayer/index.vue', () => {
  it('應該要有 className viewer-layer', () => {
    const vm = new Constructor({
      i18n
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('viewer-layer')
  })

  it('要有一個背景', () => {
    const vm = new Constructor({
      i18n
    }).$mount()
    const el = vm.$el.querySelector('.viewer-layer-close-bg')
    expect(el)
      .not.toEqual(null)
  })

  it('背景可以觸發傳進來的事件', () => {
    const vm = new Constructor({
      i18n,
      propsData: {
        closeEvent: () => {
          emitter.emit('closeEvent')
        }
      }
    }).$mount()
    const spy = sinon.spy()
    emitter.on('closeEvent', spy)
    const el = vm.$el.querySelector('.viewer-layer-close-bg')
    el.click()
    expect(spy.called)
      .toEqual(true)
  })

  it('關閉按鈕可以觸發傳進來的事件', () => {
    const vm = new Constructor({
      i18n,
      propsData: {
        closeEvent: () => {
          emitter.emit('closeEvent')
        }
      }
    }).$mount()
    const spy = sinon.spy()
    emitter.on('closeEvent', spy)
    const el = vm.$el.querySelector('.viewer-layer-close')
    el.click()
    expect(spy.called)
      .toEqual(true)
  })

  it('DOM viewer-layer-inner 可以涵蓋傳進來的 class', () => {
    const vm = new Constructor({
      i18n,
      propsData: {
        innerClassName
      }
    }).$mount()
    const el = vm.$el.querySelector('.viewer-layer-inner')
    expect(Array.prototype.slice.call(el.classList))
      .toContain(innerClassName)
  })
})
