import firebase from 'firebase'
import firebaseConfig from './firebase-config'
import { includes } from './utils'
import { version } from '../../package.json'

console.info('version:', version)
const env = process.env.NODE_ENV
const server = {}
server.backendUrl = process.env.BACKEND_URL
server.viewerUrl = process.env.VIEWER_URL
server.portalUrl = process.env.PORTAL_URL
if (process.env.USE_GOOGLE_MAP) {
  server.googleApiKey = process.env.GOOGLE_API_KEY
}
server.gaId = process.env.GA_ID
for (let item in process.env) {
  console.log(`${item}:`, process.env[item])
}
server.usServers = ['devus', 'testus', 'produs']
server.prodServers = ['prod', 'produs']

if (includes(server.usServers, env)) {
  firebase.initializeApp(firebaseConfig)
}
switch (env) {
  case 'devus':
    server.firebaseStorageUrlStart = 'https://vrcam-dev-cdn.istaging.com/'
    break
  case 'testus':
    server.firebaseStorageUrlStart = 'https://vrcam-test-cdn.istaging.com/'
    break
  case 'produs':
    server.firebaseStorageUrlStart = 'https://vrcam-prod-cdn.istaging.com/'
    break
  default:
}
server.cnImageServer = `http://vrcam-cn-storage.oss-cn-shanghai.aliyuncs.com/`
server.facebookAppId = '956126194495663'
export default server
