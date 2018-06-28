// Make sure you have already using vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.
const apiServerUrl = 'https://evs-test-api.istaging.com.cn'
const pathnameArray = location.pathname.split('/')
const collectionId = pathnameArray[pathnameArray.length - 1]
axios({
  method: 'get',
  url: `${apiServerUrl}/api/v1/openlink/${collectionId}`
}).then((response) => {
  if (response.status === 200) {
    const panoCollection = response.data
    console.log('panoCollection: ', panoCollection)

    VRViewer.init({
      el: '#vrviewer-sdk',
      lang: 'en',
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
        },
        shareSetting: {
          shareUrl: `http://localhost:3001/en/${collectionId}`
        }
      }
    })
  }
}).catch((error) => {
  console.log(error)
})

const customPopupSection = document.querySelector('.custom-popup-section')
const customPopupContentSections = document.querySelectorAll('.custom-popup-content-section')
customPopupContentSections.forEach((contentSection) => {
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
        const cashGiftSection = document.querySelector('.cash-gift-section');
        cashGiftSection.classList.remove('hide')
        break
      case 'FlashSale':
        // console.log('in FlashSale handle')
        const falshSaleSection = document.querySelector('.flash-sale-section');
        falshSaleSection.classList.remove('hide')
        break
      case 'GroupBuy':
        // console.log('in GroupBuy handle')
        const groupBuySection = document.querySelector('.group-buy-section');
        groupBuySection.classList.remove('hide')
        break
      case 'DiscountCoupon':
        // console.log('in DiscountCoupon handle')
        const discountCouponSection = document.querySelector('.discount-coupon-section');
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

const customPopupClose = document.querySelector('.custom-popup-section-close');
customPopupClose.addEventListener('click', () => {
  customPopupSection.classList.add('hide')
  customPopupContentSections.forEach(function (contentSection) {
    if (!contentSection.classList.contains('hide')) {
      contentSection.classList.add('hide')
    }
  })
  VRViewer.togglePanoramasList()
});

const chanageLanguage = (language) => {
  const pathnameArray = location.pathname.split('/')
  const collectionId = pathnameArray[pathnameArray.length - 1]
  location.href = `/${language}/${collectionId}`
}
