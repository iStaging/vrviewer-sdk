// Make sure you have already using vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.

var fetchPanoCollectionPromise = new Promise((resolve, reject) => {
  const url = 'https://evs-dev-api.istaging.com.cn'
  const collectionId = 'pc_8db3528f-c375-4733-81b1-d410b7cd4631'
  window.axios({
    method: 'get',
    url: `${url}/api/v1/openlink/${collectionId}`
  }).then(function (response) {
    if (response.status === 200) {
      var panoCollection = response.data
      resolve(panoCollection)
      console.log('panoCollection', panoCollection)
    }
  }).catch(function (error) {
    reject(error)
  })
})

Promise.all([fetchPanoCollectionPromise]).then((resp) => {
  var panoCollection = resp[0]
  VRViewer.init({
    el: '#vrviewer-sdk',
    lang: 'zh-cn',
    panoCollection: panoCollection,
    setting: {
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
        size: 60
      }
    }
  })
})

var customPopupSection = document.querySelector('.custom-popup-section')
// customPopupSection.classList.add('hide')
// var customPopupContentSection = document.querySelector('.custom-popup-content-section');
// customPopupContentSection.classList.add('hide');
var customPopupContentSections = document.querySelectorAll('.custom-popup-content-section')
customPopupContentSections.forEach(function (contentSection) {
  contentSection.classList.add('hide')
})

VRViewer.onMarkerClick = (marker) => {
  console.log('onMarkerClick callback: ', marker)

  // handle your custom tag in marker click callback function
  if (marker.type ==='custom') {
    console.log('custom marker type: ', marker.customTagInfo.type)
    switch (marker.customTagInfo.type) {
      case 'CashGift':
        // console.log('in CashGift handle')
        var cashGiftSection = document.querySelector('.cash-gift-section');
        cashGiftSection.classList.remove('hide')
        break
      case 'FlashSale':
        // console.log('in FlashSale handle')
        var falshSaleSection = document.querySelector('.flash-sale-section');
        falshSaleSection.classList.remove('hide')
        break
      case 'GroupBuy':
        // console.log('in GroupBuy handle')
        var groupBuySection = document.querySelector('.group-buy-section');
        groupBuySection.classList.remove('hide')
        break
      case 'DiscountCoupon':
        // console.log('in DiscountCoupon handle')
        var discountCouponSection = document.querySelector('.discount-coupon-section');
        discountCouponSection.classList.remove('hide')
        break
      default:
        // console.log('in default handle')
        break
    }
    customPopupSection.classList.remove('hide')
    VRViewer.togglePanoramasList()
  }
}

var customPopupClose = document.querySelector('.custom-popup-section-close');
customPopupClose.addEventListener('click', function() {
  customPopupSection.classList.add('hide')
  customPopupContentSections.forEach(function (contentSection) {
    if (!contentSection.classList.contains('hide')) {
      contentSection.classList.add('hide')
    }
  })
  // customPopupContentSection.classList.add('hide');
  VRViewer.togglePanoramasList()
});
