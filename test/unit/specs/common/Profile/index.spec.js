import { mount } from '@vue/test-utils'
import Profile from '@/common/Profile/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

describe('common/Profile/index.vue', () => {
  const cmp = mount(Profile, {
    i18n,
    store,
    components: {
      Icon
    }
  })

  it('應該要有 className profile', () => {
    expect(Array.prototype.slice.call(cmp.element.classList))
      .toContain('profile')
  })

  it('應該要有一個區塊 className profile-building-info', () => {
    expect(cmp.contains('.profile-building-info'))
      .not.toEqual(null)
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
    store.commit('SET_PANO_COLLECTION', {
      showContactInfo: true
    })
    cmp.vm._watcher.run()
    const textEl = cmp.element.querySelector('.profile-detail')
    expect(textEl.textContent)
      .to.contain(name)
    expect(textEl.textContent)
      .to.contain(companyDisplayName)
    expect(textEl.textContent)
      .to.contain(phone)
  })

  it('點擊頭像時，基本用戶切換隱藏/顯示', () => {
    const avatarEl = cmp.element.querySelector('.profile-figure')
    avatarEl.click()
    expect(cmp.vm.shouldShowProfile)
      .toEqual(false)

    avatarEl.click()
    expect(cmp.vm.shouldShowProfile)
      .toEqual(true)
  })
})
