import { clone } from '@/common/utils'
import { logoTripodImage } from '@/common/resources'

class KrpanoTripod {
  constructor () {
    let _tripodSettings = {
      image: logoTripodImage,
      size: 100 // 0 ~ 100
    }

    this.setTripodSettings = (settings) => {
      _tripodSettings = settings
    }

    this.getTripodSettings = () => {
      return clone(_tripodSettings)
    }
  }
}

export default KrpanoTripod
