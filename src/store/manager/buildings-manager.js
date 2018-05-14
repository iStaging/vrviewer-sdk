import {
  SOCIAL,
  COMPANY,
  COLOR
} from '~js/constants'
import {
  getParameterString
} from '~js/helpers'
import {
  isMobile
} from '~js/utils'
import router from '../../router/index'

export default class BuildingsHandler {
  static afterFetchProfileHandler ({ dispatch, building, buildingId }) {
    dispatch('fetchPanoramas', buildingId)
    dispatch('initSocial', buildingId)
    if (building.showComment) {
      dispatch('fetchComments', SOCIAL.FETCH_COMMENTS_COUNTS_EACH_TIME)
    }
  }

  static initAudio ({ dispatch, rootState, building }) {
    dispatch('setAudioEl', null)
    if (building && building.music && building.music !== 'none') {
      try {
        const audio = new Audio(building.music) // eslint-disable-line
        audio.autoplay = false
        audio.loop = true
        dispatch('setAudioEl', audio)
      } catch (err) {
        throw new Error('set audio failed', err)
      }
      // play audio
      if (!isMobile()) {
        if (process.env.URL_MUSIC_OFF) {
          if (rootState.route.query.music !== 'off' || rootState.route.query.music === 'on') {
            dispatch('playAudio')
          }
        } else {
          dispatch('playAudio')
        }
      }
    }
  }

  static initThemeColor ({ dispatch, rootState, building }) {
    if (process.env.USE_THEME_COLOR) {
      if (rootState.user.headquarter.title === COMPANY.ETWARM) {
        // 東森所有 building color 都是東森紅
        dispatch('setThemeColor', COLOR.ETWARM_THEME)
        dispatch('setMainColor', COLOR.ETWARM_MAIN_COLOR)
        dispatch('setSubColor', COLOR.ETWARM_SUB_COLOR)
      } else if (rootState.user.user.customSetting.themePicker) {
        dispatch('setThemeColor', building.themeColor)

        let mainColor = ''
        let subColor = ''
        switch (building.themeColor) {
          case 'blue':
            mainColor = COLOR.BLUE_MAIN_COLOR
            subColor = COLOR.BLUE_SUB_COLOR
            break
          case 'orange':
            mainColor = COLOR.ORANGE_MAIN_COLOR
            subColor = COLOR.ORANGE_SUB_COLOR
            break
          case 'green':
            mainColor = COLOR.GREEN_MAIN_COLOR
            subColor = COLOR.GREEN_SUB_COLOR
            break
          case 'black':
            mainColor = COLOR.BLACK_MAIN_COLOR
            subColor = COLOR.BLACK_SUB_COLOR
            break
          case 'yellow':
            mainColor = COLOR.YELLOW_MAIN_COLOR
            subColor = COLOR.YELLOW_SUB_COLOR
            break
          case 'pink':
          default:
            mainColor = COLOR.DEFAULT_MAIN_COLOR
            subColor = COLOR.DEFAULT_SUB_COLOR
            break
        }

        dispatch('setMainColor', mainColor)
        dispatch('setSubColor', subColor)
      } else {
        dispatch('setThemeColor', COLOR.DEFAULT_THEME)
        dispatch('setMainColor', COLOR.DEFAULT_MAIN_COLOR)
        dispatch('setSubColor', COLOR.DEFAULT_SUB_COLOR)
      }
    }
  }

  static noBuildingCallback ({ dispatch, commit, state, rootState }) {
    if (rootState.property.property.objectId && state.buildings.length) {
      window.setTimeout(() => {
        const parameter = getParameterString(rootState.route.query)
        router.push(`/${state.buildings[0].objectId}?group=${rootState.property.property.objectId}${parameter}`)
      }, 2000)
    }
    document.title = 'LiveTour not found'
    dispatch('closeProgress')
    dispatch('setBuildingNotFound', true)
    commit('SET_BUILDING', {})
    commit('SET_PANORAMAS', [])
    return null
  }
}
