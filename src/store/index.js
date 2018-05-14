import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import buildings from './modules/data/buildings'
import floorplan from './modules/floorplan'
import fullscreen from './modules/fullscreen'
import krpano from './modules/krpano'
import markerInfo from './modules/marker-info'
import markers from './modules/data/markers'
import mobileMenu from './modules/mobile-menu'
import panoramas from './modules/data/panoramas'
import panoramasList from './modules/panoramas-list'
import popup from './modules/popup'
import share from './modules/share'
import profile from './modules/profile'
import progress from './modules/progress'
import vrmode from './modules/vrmode'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    buildings,
    floorplan,
    fullscreen,
    krpano,
    markerInfo,
    markers,
    mobileMenu,
    panoramas,
    panoramasList,
    popup,
    share,
    profile,
    progress,
    vrmode
  },
  strict: true
})

export default store
