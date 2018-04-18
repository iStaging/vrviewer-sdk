import { clone } from '@/common/utils'
import { logoTripodImage } from '@/common/resources'

let _tripodSettings = {
  image: logoTripodImage,
  size: 100 // 0 ~ 100
}

class KrpanoTripod {
  setTripodSettings (settings) {
    _tripodSettings = settings
  }

  getTripodSettings () {
    return clone(_tripodSettings)
  }
}

export default KrpanoTripod
