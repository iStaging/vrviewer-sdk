import Vue from 'vue'
import Groups from '@/common/ViewerList/Groups.vue'
import store from '@/store'
import router from '@/router'
import { i18n } from '@/main'
const Constructor = Vue.extend(Groups)
const object = {
  showComment: true,
  showContactInfo: true,
  showPoweredBy: true,
  logoSize: 125,
  floorplan: '',
  music: ''
}
const property = {
  objectId: 'groupId'
}
const music = 'off'
const propertyId = property.objectId
const buildings = [
  { objectId: '1', name: 'name1', ...object },
  { objectId: '2', name: 'name2', ...object },
  { objectId: '3', name: 'name3', ...object },
  { objectId: '4', name: 'name4', ...object }
]
const index = 1
describe('common/ViewerList/Groups.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    router
  }).$mount()

  it('應該要有 className groups', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('groups')
  })

  it('4 個 buildings 要產出 4 個 li 及 button', () => {
    store.commit('SET_BUILDINGS', buildings)
    vm._watcher.run()
    const liEl = vm.$el.querySelectorAll('.groups-li')
    expect(liEl.length)
      .to.equal(buildings.length)
  })

  it('當前 building 與 currentBuilding 相同時要有 className groups-li-active', () => {
    store.commit('SET_BUILDING', buildings[index])
    vm._watcher.run()
    const liEl = vm.$el.querySelectorAll('.groups-li')
    expect(Array.prototype.slice.call(liEl[index].classList))
      .to.include('groups-li-active')
  })

  it('當前 building 與 currentBuilding 不同時按下 button，改變 router', () => {
    router.push(`/${buildings[index].objectId}?group=${propertyId}&ui=true&music=${music}`)
    store.commit('SET_PROGRESS_ACTIVE', false)
    store.commit('SET_BUILDING_NOT_FOUND', false)
    store.commit('SET_PANORAMAS_NOT_FOUND', false)
    store.commit('SET_KRPANO_ACTIVE', true)
    vm._watcher.run()

    const building = buildings[2]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .to.equal(route)
  })

  it('當前 building 與 currentBuilding 相同時按下 button，什麼也不做', () => {
    router.push(`/${buildings[index].objectId}?group=${propertyId}&ui=true&music=${music}`)
    vm._watcher.run()

    const building = buildings[index]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .not.to.equal(route)
  })

  it('當 isProgressActive = true 時按下 button，什麼也不做', () => {
    store.commit('SET_PROGRESS_ACTIVE', true)
    vm._watcher.run()
    const building = buildings[1]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .not.to.equal(route)
  })

  it('當 isKrpanoActive = false 且 isNoPanoramasFound = true 且 isBuildingNotFound 為 false 時按下 button，什麼也不做', () => {
    store.commit('SET_PROGRESS_ACTIVE', false)
    store.commit('SET_BUILDING_NOT_FOUND', false)
    store.commit('SET_PANORAMAS_NOT_FOUND', true)
    store.commit('SET_KRPANO_ACTIVE', false)
    vm._watcher.run()

    const building = buildings[0]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .not.to.equal(route)
  })

  it('當 isKrpanoActive = false 且 isNoPanoramasFound = false 且 isBuildingNotFound 為 true 時按下 button，什麼也不做', () => {
    store.commit('SET_BUILDING_NOT_FOUND', true)
    store.commit('SET_PANORAMAS_NOT_FOUND', false)
    store.commit('SET_KRPANO_ACTIVE', false)
    vm._watcher.run()

    const building = buildings[3]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .not.to.equal(route)
  })

  it('當 isKrpanoActive = true 且 isBuildingNotFound = true 時按下 button，改變 router', () => {
    store.commit('SET_KRPANO_ACTIVE', true)
    store.commit('SET_BUILDING_NOT_FOUND', true)
    store.commit('SET_KRPANO_ACTIVE', true)
    vm._watcher.run()

    const building = buildings[2]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .to.equal(route)
  })

  it('當 isKrpanoActive = true 且 isNoPanoramasFound = true 時按下 button，改變 router', () => {
    store.commit('SET_BUILDING_NOT_FOUND', false)
    store.commit('SET_PANORAMAS_NOT_FOUND', true)
    vm._watcher.run()

    const building = buildings[0]
    vm.selectBuilding(building)
    const route = `/${building.objectId}?group=${propertyId}${vm.isUiMode ? '&ui=true' : ''}${music ? `&music=${music}` : ''}`

    expect(store.state.route.fullPath)
      .to.equal(route)
  })
})
