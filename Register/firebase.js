// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkXC5vYmE3QljS6wQcdW5M6rRMt2rH9g4",
  authDomain: "resource-allocation-ngo.firebaseapp.com",
  projectId: "resource-allocation-ngo",
  storageBucket: "resource-allocation-ngo.firebasestorage.app",
  messagingSenderId: "804799514382",
  appId: "1:804799514382:web:d55b5671a5c5d5d514395f",
  measurementId: "G-5SHNG9VVWT"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);


/*firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

//export { app, analytics, auth };
window.auth = auth;
window.db = db;*/

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
window.auth = auth; window.db = db;
