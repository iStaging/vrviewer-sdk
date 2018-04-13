import VRMaker from '../src'
import { clone } from '@/common/utils'
import AFRAME from 'aframe'

window.AFRAME = AFRAME
let elId
let htmlEl
let panoramas
let panorama
let aframeViewer

beforeEach(() => {
  htmlEl = document.createElement('div')
  aframeViewer = new VRMaker.AframeViewer()
  panorama = { objectId: '1' }
  panoramas = [panorama]
  elId = 'vrmaker-aframe'
  htmlEl.id = elId
  aframeViewer.init({
    el: htmlEl,
    panoramas
  })
})

describe('commonViewer', () => {
  it('init', () => {
    expect(typeof aframeViewer.checkVersion).toBe('function')
    expect(typeof aframeViewer.initEl).toBe('function')
    expect(typeof aframeViewer.initPanoramas).toBe('function')
    expect(aframeViewer.getCurrentPanorama()).toEqual(panoramas[0])
  })

  it('initEl', () => {
    aframeViewer.initEl(elId)
    expect(aframeViewer.getEl()).toBe(elId)
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
    panoramas.push({ objectId: '2' })
    aframeViewer.selectPanorama(panoramas[1].objectId)
    expect(aframeViewer.getCurrentPanorama().objectId).toBe(panoramas[1].objectId)
  })

  it('getEl', () => {
    expect(aframeViewer.getEl()).toBe(htmlEl)
  })

  it('getPanoramas', () => {
    expect(aframeViewer.getPanoramas()).toEqual(panoramas)
  })

  it('getCurrentPanorama', () => {
    expect(aframeViewer.getCurrentPanorama()).toEqual(panorama)
  })
})
