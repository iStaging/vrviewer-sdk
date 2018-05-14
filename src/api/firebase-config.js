const env = process.env.NODE_ENV
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
switch (env) {
  case 'devus':
    firebaseConfig.apiKey = 'AIzaSyAoFth_ai13RL7qK5J2AlnlSrD876cRCGQ'
    firebaseConfig.authDomain = 'vrcam-dev-5a815.firebaseapp.com'
    firebaseConfig.databaseURL = 'https://vrcam-dev-5a815.firebaseio.com'
    firebaseConfig.projectId = 'vrcam-dev-5a815'
    firebaseConfig.storageBucket = 'vrcam-dev-5a815.appspot.com'
    firebaseConfig.messagingSenderId = '798666529342'
    break
  case 'testus':
    firebaseConfig.apiKey = 'AIzaSyDfNWcSyYhztNlHNHkxPA1WR9KREgSDqHE'
    firebaseConfig.authDomain = 'vrcam-test.firebaseapp.com'
    firebaseConfig.databaseURL = 'https://vrcam-test.firebaseio.com'
    firebaseConfig.projectId = 'vrcam-test'
    firebaseConfig.storageBucket = 'vrcam-test.appspot.com'
    firebaseConfig.messagingSenderId = '642936130505'
    break
  case 'produs':
    firebaseConfig.apiKey = 'AIzaSyAfk-fFLo11rMrr7RQrCrLskC03kMwFKhM'
    firebaseConfig.authDomain = 'vr-cam-161603.firebaseapp.com'
    firebaseConfig.databaseURL = 'https://vr-cam-161603.firebaseio.com'
    firebaseConfig.projectId = 'vr-cam-161603'
    firebaseConfig.storageBucket = 'vr-cam-161603.appspot.com'
    firebaseConfig.messagingSenderId = '585720971331'
    break
  default:
}

export default firebaseConfig
