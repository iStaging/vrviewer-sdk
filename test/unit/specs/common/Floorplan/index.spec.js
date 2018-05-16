import { mount } from '@vue/test-utils'
import Floorplan from '@/common/Floorplan/index.vue'
import FloorplanDots from '@/common/Floorplan/FloorplanDots.vue'
import FloorplanRange from '@/common/Floorplan/FloorplanRange.vue'
import Icon from '@/components/Icon/index.vue'
import IRepeat from '@/components/IRepeat.vue'
import store from '@/store'

const panoCollection = {
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
  store.commit('SET_PANO_COLLECTION', panoCollection)
  let cmp = mount(Floorplan, {
    store,
    components: {
      FloorplanDots,
      FloorplanRange,
      Icon,
      IRepeat
    }
  })

  it('應該要有 className floorplan', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('floorplan')
  })

  it('子 DOM 應該要有 className floorplan-container', () => {
    const child = cmp.vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .toContain('floorplan-container')
  })

  it('子 DOM 在 isDragging = true 時應該要有 className floorplan-dragging', () => {
    cmp.vm.isDragging = true
    cmp.vm._watcher.run()
    const child = cmp.vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .toContain('floorplan-dragging')
  })

  it('子 DOM 在 isResizable = true 時應該要有 className floorplan-overflow-hidden', () => {
    cmp = mount(Floorplan, {
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
    })
    const child = cmp.vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .toContain('floorplan-overflow-hidden')
  })

  it('子 DOM 在 isDraggable = true 時應該要有 className floorplan-overflow-hidden', () => {
    cmp = mount(Floorplan, {
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
    })
    const child = cmp.vm.$el.children[0]
    expect(Array.prototype.slice.call(child.classList))
      .toContain('floorplan-overflow-hidden')
  })

  it('setFloorplanZ 應該要正確改變 floorplanZ 的值', () => {
    const n = 50
    cmp.vm.setFloorplanZ(n)
    expect(cmp.vm.floorplanZ)
      .toEqual(n)
  })

  it('floorplanZ 的值不得大於 floorplanZMax', () => {
    const n = 250
    cmp.vm.setFloorplanZ(n)
    expect(cmp.vm.floorplanZ)
      .toEqual(cmp.vm.floorplanZMax)
  })

  it('floorplanZ 的值不得小於 floorplanZMin', () => {
    const n = -250
    cmp.vm.setFloorplanZ(n)
    expect(cmp.vm.floorplanZ)
      .toEqual(cmp.vm.floorplanZMin)
  })

  it('isResizable = false 時 handleScroll 不做事', () => {
    cmp.vm.setFloorplanZ(0)
    const floorplanZ = cmp.vm.floorplanZ
    cmp.vm.handleScroll(e)
    expect(floorplanZ)
      .toEqual(cmp.vm.floorplanZ)
  })

  it('isResizable = true 時 handleScroll 會改變 floorplanZ', () => {
    cmp = mount(Floorplan, {
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
    })
    const floorplanZ = cmp.vm.floorplanZ
    cmp.vm.handleScroll(e)
    expect(cmp.vm.floorplanZ)
      .toEqual(floorplanZ + ratio)
  })

  it('isDraggable = false 時 handleDragStart 不做事', () => {
    cmp.vm.isDragging = false
    cmp.vm._watcher.run()
    cmp.vm.handleDragStart(e)
    expect(cmp.vm.isDragging)
      .toEqual(false)
  })

  it('isDraggable = true 時 handleDragStart 不做事', () => {
    cmp = mount(Floorplan, {
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
    })
    cmp.vm.handleDragStart(e)
    expect(cmp.vm.isDragging)
      .toEqual(true)
  })

  it('執行 handleDragStop 後 isDragging = false', () => {
    cmp.vm.isDragging = true
    cmp.vm.handleDragStop()
    expect(cmp.vm.isDragging)
      .toEqual(false)
  })

  it('要從 floorplan 取得正確圖片大小及比例，正方形或高的圖要正確產生 xOffset 及 floorplanRatioX', function (done) {
    window.setTimeout(() => {
      const offset = (cmp.vm.floorplanWidth - cmp.vm.floorplanHeight) / 2
      const xOffset = -offset * cmp.vm.ratioH
      const floorplanRatioX = cmp.vm.floorplanWidth / cmp.vm.floorplanHeight
      expect(cmp.vm.xOffset)
        .toEqual(xOffset)
      expect(cmp.vm.floorplanRatioX)
        .toEqual(floorplanRatioX)
      done()
    }, 200)
  })

  it('要從 floorplan 取得正確圖片大小及比例，寬的圖要正確產生 yOffset 及 floorplanRatioY', function (done) {
    const panoCollection = {
      floorplan: '/images/240x180.svg'
    }
    store.commit('SET_PANO_COLLECTION', panoCollection)
    cmp.vm._watcher.run()
    window.setTimeout(() => {
      const offset = (cmp.vm.floorplanWidth - cmp.vm.floorplanHeight) / 2
      const yOffset = offset * cmp.vm.ratioW
      const floorplanRatioY = cmp.vm.floorplanHeight / cmp.vm.floorplanWidth
      expect(cmp.vm.yOffset)
        .toEqual(yOffset)
      expect(cmp.vm.floorplanRatioY)
        .toEqual(floorplanRatioY)
      done()
    }, 200)
  })

  it('ratioW 要正確是 floorplanContainerWidth / floorplanWidth', () => {
    const ratioW = cmp.vm.floorplanContainerWidth / cmp.vm.floorplanWidth
    expect(cmp.vm.ratioW)
      .toEqual(ratioW)
  })

  it('ratioH 要正確是 floorplanContainerHeight / floorplanHeight', () => {
    const ratioH = cmp.vm.floorplanContainerHeight / cmp.vm.floorplanHeight
    expect(cmp.vm.ratioH)
      .toEqual(ratioH)
  })
})
