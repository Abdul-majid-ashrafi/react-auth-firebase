import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import axios from "axios";

export const httpRequst = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_6XZ1hwfMa1dH6zL4E_HlDcNTaIxKWCg",
    authDomain: "veziu-app.firebaseapp.com",
    databaseURL: "https://veziu-app.firebaseio.com",
    projectId: "veziu-app",
    storageBucket: "veziu-app.appspot.com",
    messagingSenderId: "737695062433",
    appId: "1:737695062433:web:870d5b1c338530585fd3e0",
    measurementId: "G-W1MJS7369K"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// export const firestore = firebase.firestore();
