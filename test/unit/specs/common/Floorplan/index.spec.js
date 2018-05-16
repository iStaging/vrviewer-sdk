import Vue from 'vue'
import Floorplan from '@/common/Floorplan/index.vue'
import FloorplanDots from '@/common/Floorplan/FloorplanDots.vue'
import FloorplanRange from '@/common/Floorplan/FloorplanRange.vue'
import Icon from '@/components/Icon/index.vue'
import IRepeat from '@/components/IRepeat.vue'
import store from '@/store'

const Constructor = Vue.extend(Floorplan)
const building = {
  floorplan: '/images/120x120.png'
}
const panoramas = [{
  objectId: '1',
  position: {
    x: 20,
    y: 50
  }
}]
const e = {
  wheelDelta: 40,
  pageX: 40,
  pageY: 40,
  preventDefault: () => {},
  stopPropagation: () => {}
}
const ratio = 12.5

describe('common/Floorplan/index.vue', () => {
  store.commit('SET_PANORAMAS', panoramas)
  store.commit('SET_PANORAMA', panoramas[0])
  store.commit('SET_BUILDING', building)
  const vm = new Constructor({
    store,
    components: {
      FloorplanDots,
      FloorplanRange,
      Icon,
      IRepeat
    }
  }).$mount()

  it('應該要有 className floorplan', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('floorplan')
  })

  it('子 DOM 應該要有 className floorplan-container', () => {
    const child = vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .to.include('floorplan-container')
  })

  it('子 DOM 在 isDragging = true 時應該要有 className floorplan-dragging', () => {
    vm.isDragging = true
    vm._watcher.run()
    const child = vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .to.include('floorplan-dragging')
  })

  it('子 DOM 在 isResizable = true 時應該要有 className floorplan-overflow-hidden', () => {
    const vm = new Constructor({
      store,
      components: {
        FloorplanDots,
        FloorplanRange,
        Icon,
        IRepeat
      },
      propsData: {
        isResizable: true
      }
    }).$mount()
    const child = vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .to.include('floorplan-overflow-hidden')
  })

  it('子 DOM 在 isDraggable = true 時應該要有 className floorplan-overflow-hidden', () => {
    const vm = new Constructor({
      store,
      components: {
        FloorplanDots,
        FloorplanRange,
        Icon,
        IRepeat
      },
      propsData: {
        isDraggable: true
      }
    }).$mount()
    const child = vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .to.include('floorplan-overflow-hidden')
  })

  it('setFloorplanZ 應該要正確改變 floorplanZ 的值', () => {
    const n = 50
    vm.setFloorplanZ(n)
    expect(vm.floorplanZ)
      .to.equal(n)
  })

  it('floorplanZ 的值不得大於 floorplanZMax', () => {
    const n = 250
    vm.setFloorplanZ(n)
    expect(vm.floorplanZ)
      .to.equal(vm.floorplanZMax)
  })

  it('floorplanZ 的值不得小於 floorplanZMin', () => {
    const n = -250
    vm.setFloorplanZ(n)
    expect(vm.floorplanZ)
      .to.equal(vm.floorplanZMin)
  })

  it('isResizable = false 時 handleScroll 不做事', () => {
    vm.setFloorplanZ(0)
    const floorplanZ = vm.floorplanZ
    vm.handleScroll(e)
    expect(floorplanZ)
      .to.equal(vm.floorplanZ)
  })

  it('isResizable = true 時 handleScroll 會改變 floorplanZ', () => {
    const vm = new Constructor({
      store,
      components: {
        FloorplanDots,
        FloorplanRange,
        Icon,
        IRepeat
      },
      propsData: {
        isResizable: true
      }
    }).$mount()
    const floorplanZ = vm.floorplanZ
    vm.handleScroll(e)
    expect(vm.floorplanZ)
      .to.equal(floorplanZ + ratio)
  })

  it('isDraggable = false 時 handleDragStart 不做事', () => {
    vm.isDragging = false
    vm._watcher.run()
    vm.handleDragStart(e)
    expect(vm.isDragging)
      .to.equal(false)
  })

  it('isDraggable = true 時 handleDragStart 不做事', () => {
    const vm = new Constructor({
      store,
      components: {
        FloorplanDots,
        FloorplanRange,
        Icon,
        IRepeat
      },
      propsData: {
        isDraggable: true
      }
    }).$mount()
    vm.handleDragStart(e)
    expect(vm.isDragging)
      .to.equal(true)
  })

  it('執行 handleDragStop 後 isDragging = false', () => {
    vm.isDragging = true
    vm.handleDragStop()
    expect(vm.isDragging)
      .to.equal(false)
  })

  it('要從 floorplan 取得正確圖片大小及比例，正方形或高的圖要正確產生 xOffset 及 floorplanRatioX', function (done) {
    window.setTimeout(() => {
      const offset = (vm.floorplanWidth - vm.floorplanHeight) / 2
      const xOffset = -offset * vm.ratioH
      const floorplanRatioX = vm.floorplanWidth / vm.floorplanHeight
      expect(vm.xOffset)
        .to.equal(xOffset)
      expect(vm.floorplanRatioX)
        .to.equal(floorplanRatioX)
      done()
    }, 200)
  })

  it('要從 floorplan 取得正確圖片大小及比例，寬的圖要正確產生 yOffset 及 floorplanRatioY', function (done) {
    const building = {
      floorplan: '/images/240x180.svg'
    }
    store.commit('SET_BUILDING', building)
    vm._watcher.run()
    window.setTimeout(() => {
      const offset = (vm.floorplanWidth - vm.floorplanHeight) / 2
      const yOffset = offset * vm.ratioW
      const floorplanRatioY = vm.floorplanHeight / vm.floorplanWidth
      expect(vm.yOffset)
        .to.equal(yOffset)
      expect(vm.floorplanRatioY)
        .to.equal(floorplanRatioY)
      done()
    }, 200)
  })

  it('ratioW 要正確是 floorplanContainerWidth / floorplanWidth', () => {
    const ratioW = vm.floorplanContainerWidth / vm.floorplanWidth
    expect(vm.ratioW)
      .to.equal(ratioW)
  })

  it('ratioH 要正確是 floorplanContainerHeight / floorplanHeight', () => {
    const ratioH = vm.floorplanContainerHeight / vm.floorplanHeight
    expect(vm.ratioH)
      .to.equal(ratioH)
  })
})
