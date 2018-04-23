import CommonViewer from '@/common/common-viewer'
import {
  clone,
  push
} from '@/common/utils'
import AFRAME from 'aframe'

window.AFRAME = AFRAME
let elId
let htmlEl
let panoramas
let panorama
let commonViewer

beforeEach(() => {
  commonViewer = new CommonViewer()
  htmlEl = document.createElement('div')
  panorama = { panoramaId: '1' }
  panoramas = [panorama]
  elId = 'vrmaker-aframe'
  htmlEl.id = elId
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
      panoramas
    })
    expect(commonViewer.setVersion).toBeCalled()
    expect(commonViewer.initEl).toBeCalled()
    expect(commonViewer.initPanoramas).toBeCalled()
    expect(commonViewer.getCurrentPanorama()).toEqual(panoramas[0])
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
    commonViewer.initPanoramas(panoramas)
    expect(commonViewer.selectPanorama).toBeCalled()
    expect(commonViewer.getPanoramas()).toEqual(panoramas)
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
    const payload = { panoramaId: '2' }
    commonViewer.addPanorama(payload)
    const newPanoramas = push(oldPanoramas, payload)
    expect(commonViewer.getPanoramas()).toEqual(newPanoramas)
  })

  it('selectPanorama and getCurrentPanorama', () => {
    panoramas.push({ panoramaId: '2' })
    commonViewer.selectPanorama(panoramas[1].panoramaId)
    expect(commonViewer.getCurrentPanorama().panoramaId).toBe(panoramas[1].panoramaId)
  })
})
