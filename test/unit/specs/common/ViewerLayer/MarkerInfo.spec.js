import { mount } from '@vue/test-utils'
import MarkerInfo from '@/common/ViewerLayer/MarkerInfo.vue'
import store from '@/store'
import { i18n } from '@/main'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

const cmp = mount(, {
  i18n,
  store
})

describe('common/ViewerLayer/MarkerInfo.vue', () => {
  it('應該要有 className marker-info', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('marker-info')
  })

  it('type = \'memo\' 時，顯示 description', () => {
    store.commit('SET_MARKER_INFO_DATA', {
      type: 'memo',
      description: 'description'
    })
    cmp.vm._watcher.run()
    const el = cmp.vm.$el.querySelector('.marker-info-description')
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
    cmp.vm._watcher.run()
    const el = cmp.vm.$el.querySelector('.marker-info-name')
    expect(el.textContent)
      .to.contain('name')
  })

  it('type = \'tag\' 時，顯示 price', () => {
    const el = cmp.vm.$el.querySelector('.marker-info-price')
    expect(el.textContent)
      .to.contain('price')
  })

  it('type = \'tag\' 時，顯示 description', () => {
    const el = cmp.vm.$el.querySelector('.marker-info-description')
    expect(el.textContent)
      .to.contain('description')
  })

  it('type = \'tag\' 時，顯示 action', () => {
    const el = cmp.vm.$el.querySelector('.marker-info-action')
    expect(el.textContent)
      .to.contain('action')
  })

  it('type = \'tag\' 時，顯示 photo', () => {
    const img = cmp.vm.$el.querySelector('.marker-info-image')
    expect(img.src.indexOf('/images/120x120.png'))
      .not.toEqual(-1)
  })

  it('DOM marker-info-button 按下去要觸發事件', () => {
    cmp.vm.clickTagAction = () => {
      emitter.emit('clickTagAction')
    }
    cmp.vm._watcher.run()
    const spy = sinon.spy()
    emitter.on('clickTagAction', spy)
    const el = cmp.vm.$el.querySelector('.marker-info-button')
    el.click()
    expect(spy.called)
      .toEqual(true)
  })
})
