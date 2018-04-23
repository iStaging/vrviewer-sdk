import aframeConstants from '@/aframeViewer/aframe-constants'
import CommonViewer from '@/common/common-viewer'

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
      aframeConstants.getCameraAnimationEl().setAttribute('attribute', 'rotation')
      aframeConstants.getCameraAnimationEl().setAttribute('fill', 'forwards')
      aframeConstants.getCameraAnimationEl().setAttribute('easing', 'linear')
      aframeConstants.getCameraAnimationEl().setAttribute('dur', `${config.autoRotate.duration}`)
      aframeConstants.getCameraAnimationEl().setAttribute('from', `0 0 0`)
      aframeConstants.getCameraAnimationEl().setAttribute('to', `0 360 0`)
      aframeConstants.getCameraAnimationEl().setAttribute('repeat', 'indefinite')
      aframeConstants.getCameraAnimationEl().setAttribute('startEvents', 'rotation-start')
      aframeConstants.getCameraAnimationEl().setAttribute('pauseEvents', 'rotation-pause')

      aframeConstants.getCameraContainerEl().appendChild(aframeConstants.getCameraEl())
      aframeConstants.getCameraContainerEl().appendChild(aframeConstants.getCameraAnimationEl())
      aframeConstants.getSceneEl().appendChild(aframeConstants.getCameraContainerEl())
    }
  }
}

export default aframeHelpers
