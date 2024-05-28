// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Constants from 'expo-constants';

const getFirebaseConfig = () => {
  const { ios, android } = Constants.manifest.extra;
  if (Constants.platform.ios) {
    return ios.firebaseConfig;
  } else if (Constants.platform.android) {
    return android.firebaseConfig;
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(getFirebaseConfig());
}

export { firebase };
