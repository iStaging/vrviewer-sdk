import aframeConstants from '@/aframeViewer/aframe-constants'
import CommonViewer from '@/common/common-viewer'
import { setAttributes } from '@/common/utils'

const commonViewer = new CommonViewer()

const aframeHelpers = {
  initAssetsEl () {
    aframeConstants.getAssetsEl().setAttribute('timeout', '1000')
    aframeConstants.getSceneEl().append(aframeConstants.getAssetsEl())
    commonViewer.getPanoramas().forEach(panorama => {
      const imgEl = document.createElement('img')
      imgEl.src = panorama.downloadLink
      imgEl.id = panorama.panoramaId
      aframeConstants.getAssetsEl().appendChild(imgEl)
    })
  },

  initSkyEl () {
    aframeConstants.getSkyEl().setAttribute('src', `#${commonViewer.getCurrentPanorama().panoramaId}`)
    aframeConstants.getSceneEl().appendChild(aframeConstants.getSkyEl())
    commonViewer.getEl().appendChild(aframeConstants.getSceneEl())
  },

  initCameraEl () {
    aframeConstants.getCameraContainerEl().id = 'camera-container'
    const cameraX = aframeConstants.getCameraStartRotation().x || 0
    // const cameraY = cameraRotationOffset + (aframeConstants.getCameraStartRotation().y || 0)
    const cameraY = aframeConstants.getCameraStartRotation().y || 0
    const cameraZ = aframeConstants.getCameraStartRotation().z || 0

    aframeConstants.getCameraContainerEl().setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )
  },

  initCameraAnimationEl (config) {
    if (config.autoRotate.enabled) {
      const cameraEl = aframeConstants.getCameraEl()
      const cameraContainerEL = aframeConstants.getCameraContainerEl()
      const cameraAnimationEl = aframeConstants.getCameraAnimationEl()

      setAttributes(cameraAnimationEl, {
        attribute: 'rotation',
        fill: 'forwards',
        easing: 'linear',
        dur: `${config.autoRotate.duration}`,
        from: `0 0 0`,
        to: `0 360 0`,
        repeat: 'indefinite',
        startEvents: 'rotation-start',
        pauseEvents: 'rotation-pause'
      })

      aframeConstants.getCameraContainerEl().appendChild(cameraEl)
      aframeConstants.getCameraContainerEl().appendChild(cameraAnimationEl)
      aframeConstants.getSceneEl().appendChild(cameraContainerEL)
    }
  }
}

export default aframeHelpers
