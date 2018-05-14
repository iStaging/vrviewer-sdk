import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import audio from './modules/audio'
import buildings from './modules/data/buildings'
import color from './modules/color'
import floorplan from './modules/floorplan'
import fullscreen from './modules/fullscreen'
import information from './modules/information'
import krpano from './modules/krpano'
import location from './modules/location'
import markerInfo from './modules/marker-info'
import markers from './modules/data/markers'
import mobileMenu from './modules/mobile-menu'
import panoramas from './modules/data/panoramas'
import panoramasList from './modules/panoramas-list'
import popup from './modules/popup'
import share from './modules/share'
import profile from './modules/profile'
import progress from './modules/progress'
import promotion from './modules/promotion'
import ui from './modules/ui'
import user from './modules/data/user'
import vrmode from './modules/vrmode'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    audio,
    buildings,
    color,
    floorplan,
    fullscreen,
    information,
    krpano,
    location,
    markerInfo,
    markers,
    mobileMenu,
    panoramas,
    panoramasList,
    popup,
    share,
    profile,
    progress,
    promotion,
    ui,
    user,
    vrmode
  },
  strict: true
})

export default store
