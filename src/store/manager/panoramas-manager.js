import {
  isMobile,
  loadImage
} from '@/api/utils'
import {
  krpanoHelpers
} from '@/api/helpers'

export default class PanoramasManager {
  constructor ({ dispatch, commit, state, rootState }) {
    this.dispatch = dispatch
    this.commit = commit
    this.state = state
    this.rootState = rootState
    this.panoramaMarkersReadyCounter = 0
  }

  completeCallback () {
    this.dispatch('setAppReady', true)
    this.dispatch('setKrpanoActive', true)
    this.dispatch('closeProgress')
    window.setTimeout(() => {
      if (this.rootState.krpano.krpanoEl) {
        if (isMobile()) {
          this.dispatch('initGyroFromIframe')
        }
        window.setTimeout(() => {
          this.rootState.krpano.krpanoEl.call(`first_panorama_ready(${this.rootState.krpano.isGyroEnabled});`)
        }, 1500)
        window.setTimeout(() => {
          if (krpanoHelpers) {
            krpanoHelpers.preloadThreeJsImages(this.state.panoramas)
            krpanoHelpers.adjustKrpanoRendering(this.rootState.krpano.krpanoEl)
          }
        }, 2500)
      }
    })
  }

  noPanoramasHandler () {
    this.commit('SET_PANORAMAS', [])
    this.commit('SET_PANORAMA', {})
    this.dispatch('closeProgress')
    this.dispatch('setPanoramasNotFound', true)
    this.completeCallback()
  }

  panoramaMarkersReadyHandler (panoramas) { // each image thumbnail loaded, do action here
    this.panoramaMarkersReadyCounter += 1
    if (this.panoramaMarkersReadyCounter >= panoramas.length) { // when all image thumbnail loaded, do action here
      const startIndex = 0
      this.commit('SET_PANORAMAS', panoramas || [])
      this.commit('SET_PANORAMA', (panoramas && panoramas.length) ? panoramas[startIndex] : {})
      this.dispatch('addProgressCount', 10)
      if (panoramas && panoramas.length) {
        const initPanorama = panoramas[startIndex]
        panoramas.forEach(panorama => {
          console.log('cubemapReady:', panorama.cubemapReady)
          loadImage([panorama.cubemapPreivewUrl, panorama.thumbnail], () => {
            this.previewImageLoadFinished(panoramas, initPanorama)
          }, undefined, () => {
            this.previewImageLoadFinished(panoramas, initPanorama)
          })
        })
      }
    }
  }

  previewImageLoadFinished (panoramas, initPanorama) {
    this.dispatch('addProgressCount', 1)
    if (this.rootState.progress.progressValue >= panoramas.length * 2 + 12) {
      if (initPanorama.cubemapReady) {
        this.completeCallback()
      } else {
        this.dispatch('setProgressMax', this.rootState.progress.progressMax + 1)
        loadImage(initPanorama.desktopUrl, () => {
          this.dispatch('addProgressCount', 1)
          this.completeCallback()
        }, undefined, () => {
          this.dispatch('addProgressCount', 1)
          this.completeCallback()
        })
      }
    }
  }
}
