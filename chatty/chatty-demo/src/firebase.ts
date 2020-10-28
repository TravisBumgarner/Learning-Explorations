import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/database";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDhEY_mCWTsqVQU3fVmeRd_JzWpUkomRa4",
    authDomain: "revolving-door-76ffa.firebaseapp.com",
    databaseURL: "https://revolving-door-76ffa.firebaseio.com",
    projectId: "revolving-door-76ffa",
    storageBucket: "revolving-door-76ffa.appspot.com",
    messagingSenderId: "607826445616",
    appId: "1:607826445616:web:7cfa529a6f45ee2e50b4f5",
    measurementId: "G-L8W2X01RS6"
};


firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth
export const db = firebase.database()