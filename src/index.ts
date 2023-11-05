// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdqvYZ_FdKpojq58im_HLvOMFHA8CbbgE",
  authDomain: "hackathon-cube.firebaseapp.com",
  databaseURL: "https://hackathon-cube-default-rtdb.firebaseio.com",
  projectId: "hackathon-cube",
  storageBucket: "hackathon-cube.appspot.com",
  messagingSenderId: "734476983951",
  appId: "1:734476983951:web:ec00608a63343cc82f9afa",
  measurementId: "G-FLJZ44KWZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
signInAnonymously(auth).catch((error) => {
  console.error(error)
})