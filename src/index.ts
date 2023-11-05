// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, set, ref, DatabaseReference, onDisconnect, remove } from "firebase/database";
import { Move } from "./three/cube";

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
	measurementId: "G-FLJZ44KWZ6",
};

interface user {
	racing: any;
	moves: String | null;
	name: String;
	id: String;
}

// Initialize Firebase
let userID;
let userRef;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
signInAnonymously(auth).catch((error) => {
	console.error(error);
});
auth.onAuthStateChanged((user) => {
	if (user) {
		userID = user.uid;
		userRef = ref(db, `users/${userID}`);
    console.log(userRef)

		set(userRef, {
			id: userID,
			code: "greg",
			moves: null,
			racing: null,
		});
    onDisconnect(userRef).remove();
		init();
	}
});

function init() {
	// set(ref(db, ))
}


