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
    const currentPanorama = commonViewer.getCurrentPanorama()
    const skyEl = aframeConstants.getSkyEl()
    const sceneEl = aframeConstants.getSceneEl()
    skyEl.setAttribute('src', `#${currentPanorama.panoramaId}`)
    sceneEl.appendChild(aframeConstants.getSkyEl())
    commonViewer.getEl().appendChild(sceneEl)
  },

  initCameraEl () {
    aframeConstants.getCameraContainerEl().id = 'camera-container'
    const cameraRotationOffset = 90
    const cameraStartRotation = aframeConstants.getCameraStartRotation()
    const cameraX = cameraStartRotation.x || 0
    const cameraY = cameraRotationOffset + (cameraStartRotation.y || 0)
    const cameraZ = cameraStartRotation.z || 0

    aframeConstants.getCameraContainerEl().setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )
  },

  initCameraAnimationEl (config) {
    if (config.autoRotate.enabled) {
      const sceneEl = aframeConstants.getSceneEl()
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

      cameraContainerEL.appendChild(cameraEl)
      cameraContainerEL.appendChild(cameraAnimationEl)
      sceneEl.appendChild(cameraContainerEL)
    }
  }
}

export default aframeHelpers
