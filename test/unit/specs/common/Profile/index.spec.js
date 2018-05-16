import Vue from 'vue'
import Profile from '@/common/Profile/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(Profile)

describe('common/Profile/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Icon
    }
  }).$mount()

  it('應該要有 className profile', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('profile')
  })

  it('應該要有一個區塊 className profile-building-info', () => {
    expect(vm.$el.querySelector('.profile-building-info'))
      .not.to.equal(null)
  })

  it('hasProperty = true 時應該要顯示 property.name', () => {
    const name = 'property'
    store.commit('SET_HAS_PROPERTY', true)
    store.commit('SET_PROPERTY', {
      name
    })
    vm._watcher.run()
    const textEl = vm.$el.querySelector('.profile-building-info-title')
    expect(textEl.textContent)
      .to.contain(name)
  })

  it('hasProperty = false 時應該要顯示 building.name', () => {
    const name = 'building'
    store.commit('SET_HAS_PROPERTY', false)
    store.commit('SET_BUILDING', {
      name
    })
    vm._watcher.run()
    const el = vm.$el.querySelector('.profile-building-info-title')
    expect(el.textContent)
      .to.contain(name)
  })

  it('UI 模式時完全不顯示個人資訊', () => {
    store.commit('SET_UI_MODE', true)
    vm._watcher.run()
    expect(vm.$el.querySelector('.profile-figure'))
      .to.equal(null)
  })

  it('非 UI 模式時，但進階用戶設定不顯示個人資訊時不要顯示個人資訊', () => {
    store.commit('SET_UI_MODE', false)
    store.commit('SET_USER', {
      customSetting: {
        customBranding: true
      }
    })
    store.commit('SET_BUILDING', {
      showContactInfo: false
    })
    vm._watcher.run()
    expect(vm.$el.querySelector('.profile-figure'))
      .to.equal(null)
  })

  it('非 UI 模式時，基本用戶顯示預設資訊', () => {
    store.commit('SET_USER', {
      customSetting: {
        customBranding: false
      }
    })
    vm._watcher.run()
    const textEl = vm.$el.querySelector('.profile-detail')
    expect(textEl.textContent)
      .to.contain(vm.defaultName)
    expect(textEl.textContent)
      .to.contain(vm.defaultDescription)
  })

  it('預設顯示基本用戶資料', () => {
    const name = 'user'
    const companyDisplayName = 'company'
    const phone = 'phone'
    store.commit('SET_USER', {
      customSetting: {
        customBranding: true
      },
      name,
      companyDisplayName,
      phone
    })
    store.commit('SET_BUILDING', {
      showContactInfo: true
    })
    vm._watcher.run()
    const textEl = vm.$el.querySelector('.profile-detail')
    expect(textEl.textContent)
      .to.contain(name)
    expect(textEl.textContent)
      .to.contain(companyDisplayName)
    expect(textEl.textContent)
      .to.contain(phone)
  })

  it('點擊頭像時，基本用戶切換隱藏/顯示', () => {
    const avatarEl = vm.$el.querySelector('.profile-figure')
    avatarEl.click()
    expect(vm.shouldShowProfile)
      .to.equal(false)

    avatarEl.click()
    expect(vm.shouldShowProfile)
      .to.equal(true)
  })

  it('user 資料的 showAdminProfile = true 時，用戶顯示為 adminProfile 裡的資料', () => {
    const name = 'admin'
    const companyDisplayName = 'admin company'
    const phone = 'admin phone'
    store.commit('SET_USER', {
      customSetting: {
        customBranding: true
      },
      showAdminProfile: true,
      adminProfile: {
        name,
        companyDisplayName,
        phone
      }
    })
    vm._watcher.run()
    const textEl = vm.$el.querySelector('.profile-detail')
    expect(textEl.textContent)
      .to.contain(name)
    expect(textEl.textContent)
      .to.contain(companyDisplayName)
    expect(textEl.textContent)
      .to.contain(phone)
  })
})
