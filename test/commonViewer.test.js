import VRMaker from '../src'
import { clone } from '@/common/utils'
import AFRAME from 'aframe'

window.AFRAME = AFRAME
let el
let panoramas
let panorama
let aframeViewer

beforeEach(() => {
  aframeViewer = new VRMaker.AframeViewer()
  panorama = { objectId: '1' }
  panoramas = [panorama]
  el = 'vrmaker-aframe'
})

describe('commonViewer', () => {
  it('init', () => {
    aframeViewer.init({
      el: document.getElementById('vrmaker-aframe'),
      panoramas
    })
    expect(typeof aframeViewer.checkVersion).toBe('function')
    expect(typeof aframeViewer.initEl).toBe('function')
    expect(typeof aframeViewer.initPanoramas).toBe('function')
    expect(aframeViewer.getCurrentPanorama()).toEqual(panoramas[0])
  })

  it('initEl', () => {
    const aframeViewer = new VRMaker.AframeViewer()
    aframeViewer.initEl(el)
    expect(aframeViewer.getEl()).toBe(el)
  })

  it('initPanoramas', () => {
    aframeViewer.initPanoramas(panoramas)
    expect(typeof aframeViewer.selectPanorama).toBe('function')
    expect(aframeViewer.getPanoramas()).toEqual(panoramas)
  })

  it('addPanoramas', () => {
    const oldPanoramas = clone(panoramas)
    aframeViewer.addPanoramas([{ objectId: '2' }])
    expect(aframeViewer.getPanoramas()).not.toBe(oldPanoramas)
  })

  it('selectPanorama', () => {
    const newPanorama = { objectId: '2' }
    const foundOldPanorama = aframeViewer.getCurrentPanorama()
    aframeViewer.selectPanorama(newPanorama.objectId)
    const foundNewPanorama = aframeViewer.getCurrentPanorama()
    expect(foundOldPanorama).not.toBe(foundNewPanorama)
  })

  it('getEl', () => {
    expect(aframeViewer.getEl()).toBe(el)
  })

  it('getPanoramas', () => {
    expect(aframeViewer.getPanoramas()).toBe(panoramas)
  })

  it('getCurrentPanorama', () => {
    aframeViewer.selectPanorama(panorama)
    console.log(aframeViewer.getCurrentPanorama())
    console.log(panorama)
    expect(aframeViewer.getCurrentPanorama()).toBe(panorama)
  })
})
