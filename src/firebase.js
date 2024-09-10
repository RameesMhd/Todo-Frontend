import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  // Make sure you import auth

const apiKey = process.env.REACT_APP_FIREBASE_apiKey
const authDomain = process.env.REACT_APP_FIREBASE_authDomain
const projectId = process.env.REACT_APP_FIREBASE_projectId
const storageBucket = process.env.REACT_APP_FIREBASE_storageBucket
const messagingSenderId = process.env.REACT_APP_FIREBASE_messagingSenderId
const appId = process.env.REACT_APP_FIREBASE_appId
const measurementId = process.env.REACT_APP_FIREBASE_measurementId

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };
