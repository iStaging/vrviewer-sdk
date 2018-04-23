import CommonViewer from '@/common/common-viewer'
import {
  clone,
  push
} from '@/common/utils'
import AFRAME from 'aframe'

window.AFRAME = AFRAME
let htmlEl = document.createElement('div')
let elId = 'vrmaker-aframe'
htmlEl.id = elId
let commonViewer
const defaultPanorama = { panoramaId: '1' }
const defaultPanoramas = [defaultPanorama]

beforeEach(() => {
  commonViewer = new CommonViewer()
})

describe('commonViewer', () => {
  it('init', () => {
    const storedFunctions = [
      commonViewer.setVersion,
      commonViewer.initEl,
      commonViewer.initPanoramas
    ]
    commonViewer.setVersion = jest.fn()
    commonViewer.initEl = jest.fn()
    commonViewer.initPanoramas = jest.fn()
    commonViewer.init({
      el: htmlEl,
      panoramas: defaultPanoramas
    })
    expect(commonViewer.setVersion).toBeCalled()
    expect(commonViewer.initEl).toBeCalled()
    expect(commonViewer.initPanoramas).toBeCalled()
    expect(commonViewer.getCurrentPanorama()).toEqual(defaultPanorama)
    commonViewer.setVersion = storedFunctions[0]
    commonViewer.initEl = storedFunctions[1]
    commonViewer.initPanoramas = storedFunctions[2]
  })

  it('initEl and getEl', () => {
    commonViewer.initEl(htmlEl)
    expect(commonViewer.getEl()).toBe(htmlEl)
  })

  it('initPanoramas and getPanoramas', () => {
    const storedFunctions = commonViewer.selectPanorama
    commonViewer.selectPanorama = jest.fn()
    commonViewer.initPanoramas(defaultPanoramas)
    expect(commonViewer.selectPanorama).toBeCalled()
    expect(commonViewer.getPanoramas()).toEqual(defaultPanoramas)
    commonViewer.selectPanorama = storedFunctions
  })

  it('addPanoramas', () => {
    const oldPanoramas = commonViewer.getPanoramas()
    const payload = [{ panoramaId: '2' }, { panoramaId: '3' }]
    commonViewer.addPanoramas(payload)
    const newPanoramas = oldPanoramas.concat(payload)
    expect(commonViewer.getPanoramas()).toEqual(newPanoramas)
  })

  it('addPanorama', () => {
    const oldPanoramas = commonViewer.getPanoramas()
    const payload = { panoramaId: '4' }
    commonViewer.addPanorama(payload)
    const newPanoramas = push(oldPanoramas, payload)
    expect(commonViewer.getPanoramas()).toEqual(newPanoramas)
  })

  it('removePanorama', () => {
    const panoramaId = '1'
    commonViewer.removePanorama(panoramaId)
    const panoramas = commonViewer.getPanoramas()
    panoramas.forEach(panorama => {
      expect(panorama.panoramaId).not.toEqual('1')
    })
  })

  it('updateCurrentPanorama, selectPanorama and getCurrentPanorama', () => {
    commonViewer.selectPanorama('4')
    expect(commonViewer.getCurrentPanorama().panoramaId).toEqual('4')
    commonViewer.updateCurrentPanorama({ foo: 'bar' })
    expect(commonViewer.getCurrentPanorama().foo).toEqual('bar')
  })
})
