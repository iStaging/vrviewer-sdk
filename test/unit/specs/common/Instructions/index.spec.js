import { mount } from '@vue/test-utils'
import Instructions from '@/common/Instructions/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const FakeKrpanoEl = function () {
  return {
    call: function (name) {}
  }
}

describe('common/Instructions/index.vue', () => {
  const cmp = mount(Instructions, {
    i18n,
    store,
    components: {
      Icon
    }
  })

  it('應該要有 className instructions', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('instructions')
  })

  it('要有隱藏的 class 如果 isInstructionsActive = true 及 isVrMode = true', () => {
    cmp.vm.isInstructionsActive = true
    store.dispatch('setKrpanoEl', new FakeKrpanoEl())
    store.dispatch('enterVrMode')
    cmp.vm._watcher.run()
    expect(cmp.vm.$el.style.display)
      .not.toEqual('none')
  })
})
