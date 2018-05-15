export const CATEGORIES = [{
  value: 'livingroom',
  text: 'categories.livingroom'
}, {
  value: 'diningroom',
  text: 'categories.diningroom'
}, {
  value: 'kitchen',
  text: 'categories.kitchen'
}, {
  value: 'bedroom',
  text: 'categories.bedroom'
}, {
  value: 'study',
  text: 'categories.study'
}, {
  value: 'bathroom',
  text: 'categories.bathroom'
}, {
  value: 'toilet',
  text: 'categories.toilet'
}, {
  value: 'garden',
  text: 'categories.garden'
}, {
  value: 'garage',
  text: 'categories.garage'
}, {
  value: 'outdoors',
  text: 'categories.outdoors'
}, {
  value: 'others',
  text: 'categories.others'
}, {
  value: 'custom',
  text: 'categories.custom'
}]
export const POPUP = {
  WIDTH: 800,
  HEIGHT: 600,
  WIDTH_PERCENT: 65,
  WIDTH_TYPE: 'percent'
}
export const DEFAULT_LOGO_SIZE = 60
export const DEFAULT_SETTING = {
  autoRotateSetting: {
    active: true,
    revert: false,
    rotateDuration: 200000,
    restartTime: 20000
  },
  gyroSetting: {
    active: false
  },
  krpanoSetting: {
    mwheel: true,
    focus: false
  },
  tripodSetting: {
    image: 'https://www.istaging.com/sdk/logo-tripod.png',
    size: DEFAULT_LOGO_SIZE
  },
  hideUISetting: {
    hideCollectionInfo: false,
    hidePanoramaList: false,
    hideFloorplan: false,
    hideFullscreen: false,
    hideMarkerInfo: false
  },
  shareSetting: {
    shareUrl: 'https://www.istaging.com/'
  }
}
