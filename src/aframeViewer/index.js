import CommonViewer from '@/common/common-viewer.js'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
  }

  generateAframe (config) {
    const aSceneEl = document.createElement('a-scene')
    const aSkyEl = document.createElement('a-sky')
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    const aAnimation = document.createElement('a-animation')
    const el = this.getEl()
    const { downloadLink } = this.getCurrentPanorama()
    const cameraRotationOffset = 90
    let cameraStartRotation
    console.log('FONCI', config)

    this.getCurrentPanorama().panoramaRotation
      ? cameraStartRotation = this.getCurrentPanorama().panoramaRotation
      : cameraStartRotation = {}

    // a-sky
    aSkyEl.setAttribute('src', downloadLink)
    aSceneEl.setAttribute('embedded', '')
    aSceneEl.appendChild(aSkyEl)
    el.appendChild(aSceneEl)

    // a-camera
    const cameraX = cameraStartRotation.x || 0
    const cameraY = cameraRotationOffset + (cameraStartRotation.y || 0)
    // const cameraY = cameraStartRotation.y || 0
    const cameraZ = cameraStartRotation.z || 0

    aCameraContainerEl.setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )

    // a-animation
    aAnimation.setAttribute('attribute', 'rotation')
    aAnimation.setAttribute('fill', 'forwards')
    aAnimation.setAttribute('easing', 'linear')
    aAnimation.setAttribute('dur', '200000')
    aAnimation.setAttribute('from', `0 ${0 + cameraRotationOffset} 0`)
    aAnimation.setAttribute('to', `0 ${360 + cameraRotationOffset} 0`)
    // aAnimation.setAttribute('from', `0 0 0`)
    // aAnimation.setAttribute('to', `0 360 0`)
    aAnimation.setAttribute('repeat', 'indefinite')
    aAnimation.setAttribute('startEvents', 'rotation-start')
    aAnimation.setAttribute('pauseEvents', 'rotation-pause')

    // a-scene
    aCameraContainerEl.appendChild(aCameraEl)
    aCameraContainerEl.appendChild(aAnimation)
    aSceneEl.appendChild(aCameraContainerEl)

    // config
    if (config && config.disableVR) {
      aSceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    aSceneEl.addEventListener('click', function (e) {
      aAnimation.emit('pause')
    })
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const currentPanorama = this.getCurrentPanorama()
    const aSkyEl = document.querySelector('a-sky')
    const img = new Image()

    img.onload = () => {
      aSkyEl.setAttribute('src', currentPanorama.downloadLink)
      if (callback) {
        callback()
      }
    }
    img.src = currentPanorama.downloadLink
  }

  toggleVRMode (boolean) {
    const aSceneEl = document.getElementsByTagName('a-scene')[0]
    if (boolean) {
      aSceneEl.enterVR()
      this.enterFullScreen()
    } else {
      aSceneEl.exitVR()
      this.exitFullScreen()
    }
  }

  enterFullScreen () {
    if (document.requestFullscreen) {
      document.requestFullscreen()
    } else if (document.webkitRequestFullscreen) {
      document.webkitRequestFullscreen()
    } else if (document.mozRequestFullScreen) {
      document.mozRequestFullScreen()
    } else if (document.msRequestFullscreen) {
      document.msRequestFullscreen()
    }
  }

  exitFullScreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  destroy () {
    const aSceneEl = document.getElementsByTagName('a-scene')[0]
    aSceneEl.parentNode.removeChild(aSceneEl)
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
