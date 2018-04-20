import { clone } from '@/common/utils'

let _krpanoId = ''
let _xml = ''
let _krpanoEl = {}
let _krpanoVrModeObj = {
  vrModeShouldHide: [],
  vrModeShouldShow: ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
}
let _krpanoLookAtH = 0
const krpanoConstants = {
  setKrpanoId: krpanoId => {
    _krpanoId = krpanoId
  },

  setKrpanoXml: xml => {
    _xml = xml
  },

  setKrpanoEl: krpanoEl => {
    _krpanoEl = krpanoEl
  },

  initVrModeShouldHide: () => {
    _krpanoVrModeObj.vrModeShouldHide = []
  },

  initVrModeShouldShow: () => {
    _krpanoVrModeObj.vrModeShouldShow = ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
  },

  addVrModeShouldHide: item => {
    _krpanoVrModeObj.vrModeShouldHide.push(item)
  },

  addVrModeShouldShow: item => {
    _krpanoVrModeObj.vrModeShouldShow.push(item)
  },

  setKrpanoLookAtH: h => {
    _krpanoLookAtH = h
  },

  getKrpanoId: () => _krpanoId,
  getKrpanoXml: () => _xml,
  getKrpanoEl: () => _krpanoEl,
  getKrpanoVrModeObj: () => clone(_krpanoVrModeObj),
  getKrpanoLookAtH: () => _krpanoLookAtH,
  getDefaultFov: () => 120,
  getKrpanoXOffset: () => 90,
  getVrThumbAth: () => 24,

  initConstants () {
    this.setKrpanoId('')
    this.setKrpanoEl({})
    this.setKrpanoXml('')
    this.setKrpanoLookAtH(0)
    this.initVrModeShouldHide()
    this.initVrModeShouldShow()
  }
}

export default krpanoConstants
