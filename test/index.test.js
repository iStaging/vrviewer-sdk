/**
 * @jest-environment jsdom
 */

import VRMaker from '../src'
import AFRAME from 'aframe'

window.AFRAME = AFRAME

/* eslint-disable */
const aframeViewer =  new VRMaker.AframeViewer()

aframeViewer.init({
  el: document.getElementById('vrmaker-aframe'),
  panoramas: [{
    objectId: '782949e8-c37a-4171-a004-54c76937135c',
    // src: 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
    src: 'img/test.jpg',
    // cameraStartRotation: {
    //   x: 0,
    //   y: 360,
    //   z: 0
    // },
    index: 0
  }, {
    objectId: '782949e8-c37a-4171-a004-54c76937135c',
    src: 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
    index: 1
  }]
})

test('test', () => {
  expect('sese').toBe(aframeViewer.getCurrentPanorama())
})
