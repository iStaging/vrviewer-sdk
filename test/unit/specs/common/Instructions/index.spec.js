import Vue from 'vue'
import Instructions from '@/common/Instructions/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'
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

  it('應該要有 className instructions', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('instructions')
  })

  it('要有隱藏的 class 如果 isInstructionsActive = true 及 isVrMode = true', () => {
    vm.isInstructionsActive = true
    store.dispatch('setKrpanoEl', new FakeKrpanoEl())
    store.dispatch('enterVrMode')
    vm._watcher.run()
    expect(vm.$el.style.display)
      .not.to.equal('none')
  })
})
