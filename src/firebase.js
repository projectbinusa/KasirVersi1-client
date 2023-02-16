// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbI0oLO6Tr5CuicBNrNiIrcDjiMrVy2aA",
  authDomain: "kasir-application-76401.firebaseapp.com",
  projectId: "kasir-application-76401",
  storageBucket: "kasir-application-76401.appspot.com",
  messagingSenderId: "1092273575195",
  appId: "1:1092273575195:web:101a8c29c77a37a13a2fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);