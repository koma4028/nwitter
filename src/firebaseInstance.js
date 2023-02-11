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
    authDomain: "nwitter-928a5.firebaseapp.com",
    projectId: "nwitter-928a5",
    storageBucket: "nwitter-928a5.appspot.com",
    messagingSenderId: "569826260290",
    appId: "1:569826260290:web:2feb800c421fbb6d7a84db",
    measurementId: "G-VWFQCJGLW7"
};

const defaultFirebaseApp = firebase;
const myFirebaseApp = firebase.initializeApp(firebaseConfig);
const fbAuth = firebase.auth(myFirebaseApp);
const fbFirestore = firebase.firestore(myFirebaseApp);
// const analytics = getAnalytics(myFirebaseApp);

export { defaultFirebaseApp, myFirebaseApp, fbAuth, fbFirestore };