import {
  COLOR
} from '@/api/constants'

const state = {
  themeColor: COLOR.DEFAULT_THEME,
  mainColor: COLOR.DEFAULT_MAIN_COLOR,
  subColor: COLOR.DEFAULT_SUB_COLOR
}

export const getters = {
  themeColor: state => state.themeColor,
  mainColor: state => state.mainColor,
  subColor: state => state.subColor
}

export const actions = {
  setThemeColor ({ commit, rootState }, color = COLOR.DEFAULT_THEME) {
    commit('SET_THEME_COLOR', color)
  },

  setMainColor ({ commit }, color = COLOR.DEFAULT_MAIN_COLOR) {
    commit('SET_MAIN_COLOR', color)
  },

  setSubColor ({ commit }, color = COLOR.DEFAULT_SUB_COLOR) {
    commit('SET_SUB_COLOR', color)
  }
}

export const mutations = {
  SET_THEME_COLOR (state, color = COLOR.DEFAULT_THEME) {
    state.themeColor = color
  },

  SET_MAIN_COLOR (state, color = COLOR.DEFAULT_MAIN_COLOR) {
    state.mainColor = color
  },

  SET_SUB_COLOR (state, color = COLOR.DEFAULT_SUB_COLOR) {
    state.subColor = color
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
