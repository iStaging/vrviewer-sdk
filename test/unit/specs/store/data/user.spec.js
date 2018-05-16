import { getters, mutations } from '@/store/modules/data/user'
import { testAction } from '../../App.spec'
import {
  COMPANY
} from '@/api/constants'
const actionsInjector = require('inject-loader!@/store/modules/data/user') // eslint-disable-line
const {
  user,
  customSetting
} = getters
const {
  SET_USER_ID,
  SET_USER,
  SET_HEADQUARTER
} = mutations
const userId = '7607834b-6c69-481f-9d6e-612ff8351c1d' // test us istagingdev@gmail.com
const data = {
  objectId: userId,
  'group': {
    'objectId': '1b15116c-7dea-4eb1-ae19-f66cef007591'
  },
  'headquarter': {
    'objectId': '57d91834c4c971006108a009',
    'createdAt': 1500343858000,
    'updatedAt': 1500343858000,
    'name': '中信房屋',
    'title': 'cthouse',
    'showProfile': false,
    'allowUpgrade': false,
    'showBuildingList': false
  },
  'email': 'hbagent2@gmail.com',
  'phone': '22222222222',
  'name': 'agent 2',
  'username': 'hbagent2@gmail.com',
  'profileUrl': '',
  'companyDisplayName': 'Tencol test店',
  'showAdminProfile': false,
  'company': 'Tencol test店',
  'customSetting': {
    'liveToursNumber': 999,
    'panoramasNumberPerLiveTour': 30,
    'addAgent': false,
    'showPromotionHeader': true,
    'customBranding': true,
    'copyLiveTourReceive': true,
    'copyLiveTourSend': true,
    'themePicker': false,
    'googleMap': false,
    'customMarkerIcon': true,
    'commentManage': true,
    'group': false,
    'inAppEdit': true
  }
}
const headquarters = [{
  'objectId': 'f94102be-d5bc-478b-85f2-9e6e94b7c65a',
  'name': '台慶不動產',
  'title': COMPANY.TAI_CHING
}]
const { actions } = actionsInjector({
  '../../../api/index': {
    async asyncRequest (urlEnd) {
      if (urlEnd.indexOf('publicProfile') > -1) {
        return { data }
      } else if (urlEnd.indexOf('headquarters') > -1) {
        return { data: headquarters }
      }
    }
  }
})

describe('store/modules/data/user', () => {
  it('user', () => {
    const state = {
      user: {}
    }
    const result = user(state, { user })
    expect(result).to.deep.equal({})
  })

  it('customSetting', () => {
    const state = {
      user: {
        customSetting: {}
      }
    }
    const result = customSetting(state, { customSetting })
    expect(result).to.deep.equal({})
  })

  it('fetchPublicProfile', done => {
    const state = {
      userId: '',
      user: {},
      headquarter: {}
    }
    testAction(actions.fetchPublicProfile, userId, state, [
      { type: 'SET_USER_ID', payload: data.objectId },
      { type: 'SET_USER', payload: data },
      { type: 'SET_HEADQUARTER', payload: data.headquarter }
    ], undefined, done)
  })

  it('fetchHeadquarters', done => {
    const state = {
      headquarter: {}
    }
    testAction(actions.fetchHeadquarters, '', state, [
      { type: 'SET_HEADQUARTER', payload: headquarters[0] }
    ], undefined, done)
  })

  it('SET_USER_ID', () => {
    const state = {
      userId: ''
    }
    SET_USER_ID(state, 'aaa')
    expect(state.userId)
      .to.equal('aaa')
  })

  it('SET_USER', () => {
    const state = {
      user: {}
    }
    SET_USER(state, { foo: 'baz' })
    expect(state.user)
      .to.deep.equal({ foo: 'baz' })
  })

  it('SET_HEADQUARTER', () => {
    const state = {
      headquarter: {}
    }
    SET_HEADQUARTER(state, { title: 'test' })
    expect(state.headquarter)
      .to.deep.equal({ title: 'test' })
  })
})
