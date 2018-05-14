<docs>
  Shortcut keys.
</docs>

<script>
import { mapActions, mapGetters } from 'vuex'
import gaEvents from '~js/ga-events'

export default {
  name: 'ShortcutKeys',
  mounted () {
    window.addEventListener('keydown', this.shortcutKeysHandler)
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.shortcutKeysHandler)
  },

  computed: {
    ...mapGetters([
      'buildings',
      'currentBuilding',
      'currentPanorama',
      'panoramas'
    ])
  },

  methods: {
    ...mapActions([
      'enterFullscreen',
      'enterVrMode',
      'toggleAudio',
      'toggleComments',
      'toggleFloorplan',
      'toggleInformation',
      'toggleLocation',
      'togglePanoramasList',
      'toggleProfile',
      'toggleShare',
      'selectBuilding',
      'selectPanorama',
      'updateLikeCount',
      'zoomIn',
      'zoomOut'
    ]),

    shortcutKeysHandler (e) {
      if (e.shiftKey) { // shift
        switch (e.keyCode) {
          case 49: // 1
            this.selectBuilding(this.buildings[0])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 50: // 2
            this.selectBuilding(this.buildings[1])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 51: // 3
            this.selectBuilding(this.buildings[2])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 52: // 4
            this.selectBuilding(this.buildings[3])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 53: // 5
            this.selectBuilding(this.buildings[4])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 54: // 6
            this.selectBuilding(this.buildings[5])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 55: // 7
            this.selectBuilding(this.buildings[6])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 56: // 8
            this.selectBuilding(this.buildings[7])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 57: // 9
            this.selectBuilding(this.buildings[8])
            gaEvents.sendEvent('Building', 'ChangeBuildingByShortcutKey', this.currentBuilding.objectId || '')
            break
        }
      } else {
        switch (e.keyCode) {
          case 49: // 1
            this.selectPanorama(this.panoramas[0])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 50: // 2
            this.selectPanorama(this.panoramas[1])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 51: // 3
            this.selectPanorama(this.panoramas[2])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 52: // 4
            this.selectPanorama(this.panoramas[3])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 53: // 5
            this.selectPanorama(this.panoramas[4])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 54: // 6
            this.selectPanorama(this.panoramas[5])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 55: // 7
            this.selectPanorama(this.panoramas[6])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 56: // 8
            this.selectPanorama(this.panoramas[7])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 57: // 9
            this.selectPanorama(this.panoramas[8])
            gaEvents.sendEvent('Panorama', 'ChangePanoramaByShortcutKey', this.currentPanorama.objectId || '')
            break
          case 66: // b
            this.togglePanoramasList()
            gaEvents.sendEvent('Building', 'TogglePanoramasListByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 67: // c
            this.toggleComments()
            gaEvents.sendEvent('Building', 'ToggleCommentsByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 70: // f
            this.toggleFloorplan()
            gaEvents.sendEvent('Building', 'ToggleFloorplanByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 73: // i
            this.toggleInformation()
            gaEvents.sendEvent('Building', 'ToggleInformationByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 75: // k
            this.updateLikeCount()
            gaEvents.sendEvent('Building', 'UpdateLikeCountByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 76: // l
            this.toggleLocation()
            gaEvents.sendEvent('Building', 'ToggleLocationByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 77: // m
            this.toggleAudio()
            gaEvents.sendEvent('Building', 'ToggleAudioByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 80: // p
            this.toggleProfile()
            gaEvents.sendEvent('Building', 'ToggleProfileByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 83: // s
            this.toggleShare()
            gaEvents.sendEvent('Building', 'ToggleShareByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 86: // v
            this.enterVrMode()
            gaEvents.sendEvent('Building', 'EnterVrModeByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 90: // z
            this.enterFullscreen()
            gaEvents.sendEvent('Building', 'EnterFullscreenByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 107: // +
            this.zoomIn()
            gaEvents.sendEvent('Building', 'ZoomInByShortcutKey', this.currentBuilding.objectId || '')
            break
          case 109: // -
            this.zoomOut()
            gaEvents.sendEvent('Building', 'ZoomOutByShortcutKey', this.currentBuilding.objectId || '')
            break
        }
      }
    }
  }
}
</script>
