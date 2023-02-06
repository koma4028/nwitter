import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    // 환경변수로 하면 'Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key).' 에러 발생
    // 다른 가이드 참고하여 .env.development 생성하였는데도 동일 에러 발생
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey: "AIzaSyA1-8mD8NM2AgtMVRmiOotPITnR0O6QMOU",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const myFirebaseApp = firebase.initializeApp(firebaseConfig);
const fbAuth = firebase.auth(myFirebaseApp);
// const analytics = getAnalytics(myFirebaseApp);

export { myFirebaseApp, fbAuth };