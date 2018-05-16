import Vue from 'vue'
import App from '@/App'

const Constructor = Vue.extend(App)
const vm = new Constructor().$mount()

describe('HandleData.vue mixin - formatDate():', () => {
  it('should accept string date and return YYYY/MM/DD format', () => {
    const date1 = '20170707'
    const date2 = '2017/07/07'
    const date3 = '2017-07-07'
    const result = '2017/07/07'
    expect(vm.formatDate(date1)).toEqual(result)
    expect(vm.formatDate(date2)).toEqual(result)
    expect(vm.formatDate(date3)).toEqual(result)
  })
  it('should accept new Date() string value and return YYYY/MM/DD format', () => {
    const date = new Date('2017/07/07')
    const result = '2017/07/07'
    expect(vm.formatDate(date)).toEqual(result)
  })
  it('should accept timestamp and return YYYY/MM/DD format', () => {
    const date = new Date('2017/07/07').getTime()
    const result = '2017/07/07'
    expect(vm.formatDate(date)).toEqual(result)
  })
})

describe('HandleData.vue mixin - isEmpty():', () => {
  it('should return true with empty string', () => {
    const emptyString = ''
    expect(vm.isEmpty(emptyString)).toEqual(true)
  })
  it('should return true with empty array', () => {
    const emptyArray = []
    expect(vm.isEmpty(emptyArray)).toEqual(true)
  })
  it('should return true with empty object', () => {
    const emptyObject = {}
    expect(vm.isEmpty(emptyObject)).toEqual(true)
  })
})

describe('HandleData.vue mixin - generateUpgradePlan():', () => {
  it('should basic user return upgrade plan to pro plan', () => {
    const basicUser = {
      plan: 'Basic'
    }
    expect(vm.generateUpgradePlan(basicUser)).toEqual('pro')
  })
  it('should pro user return upgrade plan to advanced plan', () => {
    const proUser = {
      plan: 'Pro'
    }
    expect(vm.generateUpgradePlan(proUser)).toEqual('advanced')
  })
  it('should advanced user return upgrade plan to premium plan', () => {
    const advancedUser = {
      plan: 'Advanced'
    }
    expect(vm.generateUpgradePlan(advancedUser)).toEqual('premium')
  })
  it('should premium user return upgrade plan to nothing', () => {
    const premiumUser = {
      plan: 'Premium'
    }
    expect(vm.generateUpgradePlan(premiumUser)).toEqual('')
  })
})
