import { mount } from '@vue/test-utils'
import Icon from '@/components/Icon/index.vue'
import { loadImage } from '../../../../../src/api/utils'
const image = '/images/120x120.png'

describe('components/Icon/index.vue', () => {
  it('應該要有 className icon', () => {
    const cmp = mount(Icon)
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('icon')
  })

  it('應該要有 className photo-lazyload 如果參數 hasLazyload 為 true', () => {
    const className = 'photo-lazyload'
    const cmp = mount(Icon, {
      propsData: {
        hasLazyload: true
      }
    })
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain(className)
  })

  it('如果有傳入 image，style 應該要有 backgroundImage', function (done) {
    jest.setTimeout(15000)
    const cmp = mount(Icon, {
      propsData: {
        image
      }
    })
    const dataSrc = cmp.vm.dataSrc
    expect(dataSrc)
      .toEqual(image)
    window.setTimeout(() => {
      loadImage(image, () => {
        const backgroundImage = cmp.vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .not.toEqual(-1)
        const dataSrc = cmp.vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        done()
      }, () => {}, () => {
        console.log('load image error')
        const backgroundImage = cmp.vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .toEqual(-1)
        done()
      })
    }, 500)
  })

  it('若沒有傳入 image，style backgroundImage 應該沒有值', function (done) {
    jest.setTimeout(5000)
    const image = ''
    const cmp = mount(Icon, {
      propsData: {
        image
      }
    })
    cmp.vm.loadImage()
    const backgroundImage = cmp.vm.$el.style.backgroundImage
    const dataSrc = cmp.vm.$el.getAttribute('data-src')
    expect(backgroundImage)
      .toEqual('')
    expect(dataSrc)
      .toEqual('')
    done()
  })

  it('應該要監聽 image 如果有任何改變', function (done) {
    jest.setTimeout(15000)
    const cmp = mount(Icon, {
      propsData: {
        image
      }
    })
    cmp.vm.loadImage()
    const dataSrc = cmp.vm.dataSrc
    expect(dataSrc)
      .toEqual(image)

    const watchHandler = () => {
      cmp.vm.image = ''
      cmp.vm._watcher.run()
      window.setTimeout(() => {
        const backgroundImage = cmp.vm.$el.style.backgroundImage
        expect(backgroundImage)
          .toEqual('')
        const dataSrc = cmp.vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        // console.log('get here')
        done()
      }, 500)
    }

    window.setTimeout(() => {
      loadImage(image, () => {
        const backgroundImage = cmp.vm.$el.style.backgroundImage
        expect(backgroundImage.indexOf(image))
          .not.toEqual(-1)
        const dataSrc = cmp.vm.$el.getAttribute('data-src')
        expect(dataSrc)
          .toEqual('')
        watchHandler()
      })
    }, 500)
  })

  // it('should slot be rendered', () => {
  //   const cmp = mount(Icon, {
  //     slots: () => {
  //       return '<p>Hello</p>'
  //     }
  //   })
  //   console.log(cmp.vm.$slots)
  //   console.log(cmp.vm.$el)
  //   expect(cmp.vm.$el).to.have.html('<p>Hello</p>')
  // })
})
