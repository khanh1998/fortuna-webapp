import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDA05AWcq6aEzFLomEzTuPq-PUZ7nnwg-Q',
  authDomain: 'fortuna-fortune.firebaseapp.com',
  projectId: 'fortuna-fortune',
  storageBucket: 'fortuna-fortune.appspot.com',
  messagingSenderId: '553234502119',
  appId: '1:553234502119:web:70c613ca4fdce9722c6d42',
  measurementId: 'G-51MQ0ZXQWG',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'en';
const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');
export {
  firebase,
  provider,
};
