import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import axios from "axios";

export const httpRequst = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// export const firestore = firebase.firestore();
