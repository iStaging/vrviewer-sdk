import api from './index'
import server from './server'
import { includes, isEqual } from './utils'
import store from '../store/index'

/* eslint-disable */
// https://docs.google.com/spreadsheets/d/1xHvGvshOPPZawstl8fDj4_ul5JFs4C0sbgZ7yWACQlA/edit#gid=435244376
const gaEvents = {
  hasInit: false,
  gaSets: {
    'dimension1': '',
    'dimension2': '',
    'dimension3': '',
    'dimension4': '',
    'dimension5': '',
    'dimension7': ''
  },
  init (url = location.pathname) {
    if (includes(server.usServers, api.env)) {
      const gaUrl = 'https://www.google-analytics.com/analytics.js'
      ;(function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r
        i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date()
        a = s.createElement(o),
          m = s.getElementsByTagName(o)[0]
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', gaUrl, 'ga')
      ga('create', server.gaId, 'auto')

      const username = store.state.user.user.username
      const headquarterId = store.state.user.headquarter.objectId
      const userHeadquarterId = store.state.user.user.headquarter.objectId
      const buildingId = store.state.route.params.buildingId || store.state.buildings.currentBuilding.objectId || ''
      const propertyId = store.state.route.query.group || store.state.property.property.objectId || ''
      const shouldCheckProperty = store.state.route.query.group
      const shouldCheckHeadquarter = store.state.route.name !== 'default'
      // dimension1: username
      // dimension2: headquarterIdUrlHasTitle
      // dimension3: headquarterId
      // dimension4: deviceType
      // dimension5: buildingId
      // dimension6: sharecode, had been deprecated
      // dimension7: propertyId

      // user will have customSetting, headquarter default value
      // if (!Object.keys(user).length || !buildingId || (shouldCheckProperty && !propertyId)) {
      if (!username || !buildingId ||
        (shouldCheckProperty && !propertyId) ||
        (shouldCheckHeadquarter && (!headquarterId || !userHeadquarterId))) {
        return
      }
      const gaSets = {
        'dimension1': store.state.user.user.username || '',
        'dimension2': store.state.user.headquarter.objectId || '',
        'dimension3': store.state.user.user.headquarter.objectId || '',
        'dimension4': 'Web',
        'dimension5': buildingId,
        'dimension7': propertyId
      }
      if (!isEqual(this.gaSets, gaSets)) {
        console.log('gaSets: ', gaSets)
        this.gaSets = gaSets
        ga('set', gaSets)
        ga('send', {
          hitType: 'pageview',
          page: url
        })
      }
      this.hasInit = true
    }
  },
  sendEvent (category = '', action = '', label = '') {
    if (includes(server.usServers, api.env)) {
      if (!this.hasInit) {
        this.init()
      }
      if (this.hasInit) {
        ga('send', {
          hitType: 'event',
          eventCategory: category,
          eventAction: action,
          eventLabel: label
        })
        const shouldShowGaConsole = true
        if (shouldShowGaConsole) {
          console.log(`GA: ${category}, ${action}, ${label}`)
        }
      }
    }
  }
}
/* eslint-enable */

export default gaEvents
