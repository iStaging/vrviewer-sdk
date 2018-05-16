import Vue from 'vue'
import Icon from '@/components/Icon/index.vue'
import { loadImage } from '../../../../../src/api/utils'
const Constructor = Vue.extend(Icon)
const image = '/images/120x120.png'

describe('components/Icon/index.vue', () => {
  it('應該要有 className icon', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('icon')
  })

  it('應該要有 className photo-lazyload 如果參數 hasLazyload 為 true', () => {
    const className = 'photo-lazyload'
    const vm = new Constructor({
      propsData: {
        hasLazyload: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain(className)
  })

  it('如果有傳入 image，style 應該要有 backgroundImage', function (done) {
    this.timeout(15000)
    const vm = new Constructor({
      propsData: {
        image
      }
    }).$mount()
    const dataSrc = vm.dataSrc
    expect(dataSrc)
      .toEqual(image)
    window.setTimeout(() => {
      loadImage(image, () => {
        const backgroundImage = vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .not.toEqual(-1)
        const dataSrc = vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        done()
      }, () => {}, () => {
        console.log('load image error')
        const backgroundImage = vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .toEqual(-1)
        done()
      })
    }, 500)
  })

  it('若沒有傳入 image，style backgroundImage 應該沒有值', function (done) {
    this.timeout(5000)
    const image = ''
    const vm = new Constructor({
      propsData: {
        image
      }
    }).$mount()
    vm.loadImage()
    const backgroundImage = vm.$el.style.backgroundImage
    const dataSrc = vm.$el.getAttribute('data-src')
    expect(backgroundImage)
      .toEqual('')
    expect(dataSrc)
      .toEqual('')
    done()
  })

  it('應該要監聽 image 如果有任何改變', function (done) {
    this.timeout(15000)
    const vm = new Constructor({
      propsData: {
        image
      }
    }).$mount()
    vm.loadImage()
    const dataSrc = vm.dataSrc
    expect(dataSrc)
      .toEqual(image)

    const watchHandler = () => {
      vm.image = ''
      window.setTimeout(() => {
        const backgroundImage = vm.$el.style.backgroundImage
        expect(backgroundImage)
          .toEqual('')
        const dataSrc = vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        // console.log('get here')
        done()
      }, 500)
    }

    window.setTimeout(() => {
      loadImage(image, () => {
        const backgroundImage = vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .not.toEqual(-1)
        const dataSrc = vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        watchHandler()
      })
    }, 500)
  })

  // it('should slot be rendered', () => {
  //   const vm = new Constructor({
  //     slots: () => {
  //       return '<p>Hello</p>'
  //     }
  //   }).$mount()
  //   console.log(vm.$slots)
  //   console.log(vm.$el)
  //   expect(vm.$el).to.have.html('<p>Hello</p>')
  // })
})
