import { clone } from '@/common/utils'
import tripodImage from '../../../img/krpano-img/logo-tripod.png'

class KrpanoTripod {
  constructor () {
    let _tripodSettings = {
      image: tripodImage,
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
