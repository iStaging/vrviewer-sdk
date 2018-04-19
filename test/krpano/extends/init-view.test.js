import KrpanoInitView from '@/krpanoViewer/extends/init-view'

describe('krpano/extends/init-view.js', () => {
  let initViewSettings = {
    active: false
  }

  it('setInitViewSettings and getInitViewSettings should be worked', () => {
    const krpanoInitView = new KrpanoInitView()
    krpanoInitView.setInitViewSettings(initViewSettings)
    expect(krpanoInitView.getInitViewSettings()).toEqual(initViewSettings)
  })
})
