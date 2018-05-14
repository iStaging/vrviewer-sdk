import api from '~js/index'
import { includes, getFilename } from '~js/utils'
import server from '~js/server'
import firebaseConfig from '~js/firebase-config'
const FIREBASE_METHOD = {
  PATH: 0,
  STORAGE: 1
}
let urlStart = ''
if (includes(server.usServers, api.env)) {
  urlStart = server.firebaseStorageUrlStart
} else {
  urlStart = server.cnImageServer
}

export default class Cubemap {
  constructor (panorama, userId) {
    this.panorama = panorama
    this.userId = userId
    this.filename = ''
    this.preivewUrl = ''
    this.cubeUrl = ''
  }

  init () {
    if (includes(server.usServers, api.env)) {
      if (this.panorama.adjustedRawUrl) { // for filter image 濾鏡圖
        this.generateCubemapUrl(FIREBASE_METHOD.STORAGE, 'adjustedRawUrl')
      } else if (this.panorama.cubemapFilePath) { // for old uploaded image raw url
        this.generateCubemapUrl(FIREBASE_METHOD.PATH, 'cubemapFilePath')
      } else if (this.panorama.rawUrl) { // firebase latest uploaded image raw url
        this.generateCubemapUrl(FIREBASE_METHOD.STORAGE, 'rawUrl')
      }
    } else {
      if (this.panorama.cubemapFilePath) {
        this.generateCubemapUrl(FIREBASE_METHOD.PATH, 'cubemapFilePath')
      } else if (this.panorama.rawUrl) {
        this.generateCubemapUrl(FIREBASE_METHOD.PATH, 'rawUrl')
      }
    }
  }

  generateCubemapUrl (method = FIREBASE_METHOD.PATH, panoramaKey = '') {
    if (method === FIREBASE_METHOD.PATH) {
      this.filename = `${this.userId}/panoramas/${getFilename(this.panorama[panoramaKey])}`
      this.preivewUrl = urlStart + this.panorama[panoramaKey].replace('panoramas/', 'panoramas/cubemap_preview_')
      this.cubeUrl = urlStart + this.panorama[panoramaKey].replace('panoramas/', 'panoramas/cubemap_%s_')
    } else if (method === FIREBASE_METHOD.STORAGE) {
      if (includes(this.panorama[panoramaKey], 'firebasestorage.googleapis.com') &&
        this.panorama[panoramaKey].split(firebaseConfig.storageBucket)[1] &&
        this.panorama[panoramaKey].split(firebaseConfig.storageBucket)[1].split('/o/')[1]) {
        // Firebase url
        this.filename = decodeURIComponent(this.panorama[panoramaKey].split(firebaseConfig.storageBucket)[1].split('/o/')[1]).split('?')[0]
      } else if (includes(this.panorama[panoramaKey], firebaseConfig.storageBucket) &&
        this.panorama[panoramaKey].split(`${firebaseConfig.storageBucket}/`)) {
        // GCP url
        this.filename = this.panorama[panoramaKey].split(`${firebaseConfig.storageBucket}/`)[1]
      } else if (includes(this.panorama[panoramaKey], server.firebaseStorageUrlStart)) {
        // cdn url
        this.filename = this.panorama[panoramaKey].split(server.firebaseStorageUrlStart)[1]
      }
      if (this.filename) {
        this.preivewUrl = urlStart + this.filename.replace('panoramas/', 'panoramas/cubemap_preview_')
        this.cubeUrl = urlStart + this.filename.replace('panoramas/', 'panoramas/cubemap_%s_')
      }
    }
  }
}
