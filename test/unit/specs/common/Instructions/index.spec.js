import Vue from 'vue'
import Instructions from '../../../../../src/common/Instructions/index'
import Icon from '../../../../../src/components/Icon'
import store from '../../../../../src/store'
import { i18n } from '../../../../../src/main'
import { isPortrait } from '../../../../../src/api/utils'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
const Constructor = Vue.extend(Instructions)

const FakeKrpanoEl = function () {
  return {
    call: function (name) {}
  }
}

describe('common/Instructions/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Icon
    }
  }).$mount()

  it('應該要有 className vrsdk-instructions', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-instructions')
  })

  it('isInstructionsActive 初始值為 isPortrait()', () => {
    expect(vm.isInstructionsActive)
      .toBe(isPortrait())
  })

  it('關閉按鈕可以離開 VR mode', () => {
    vm.exitVrMode = () => {
      emitter.emit('exitVrMode')
    }
    vm._watcher.run()
    const spy = sinon.spy()
    emitter.on('exitVrMode', spy)
    const closeEl = vm.$el.querySelector('.vrsdk-instructions-close')
    closeEl.click()
    expect(spy.called)
      .toEqual(true)
  })

  it('要有隱藏的 class 如果 isInstructionsActive = true 及 isVrMode = true', () => {
    vm.isInstructionsActive = true
    store.dispatch('setKrpanoEl', new FakeKrpanoEl())
    store.dispatch('enterVrMode')
    vm._watcher.run()
    expect(vm.$el.style.display)
      .not.toEqual('none')
  })

  it('方法 handleToggleInstructions 呼叫後，判斷是否要改變 isInstructionsActive 的值', done => {
    vm.isInstructionsActive = false
    vm._watcher.run()
    vm.handleToggleInstructions()
    window.setTimeout(() => {
      expect(vm.isInstructionsActive)
        .toBe(isPortrait())
      done()
    }, 250)
  })

  it('方法 handleToggleInstructions 呼叫後，判斷是否要改變 isInstructionsActive 的值', done => {
    vm.isInstructionsActive = false
    vm._watcher.run()
    vm.handleToggleInstructions()
    window.setTimeout(() => {
      expect(vm.isInstructionsActive)
        .toBe(isPortrait())
      done()
    }, 250)
  })
})
