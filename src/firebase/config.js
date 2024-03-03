// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUKXfuAo448f0YbgEL-jaObvGUTkB4B1I",
  authDomain: "twitter-firebase-f2c03.firebaseapp.com",
  projectId: "twitter-firebase-f2c03",
  storageBucket: "twitter-firebase-f2c03.appspot.com",
  messagingSenderId: "749341730943",
  appId: "1:749341730943:web:f0ba28bf0bc2d2ce22374a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// getAuth ve Google yetkilendirme kurulum 

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// veri tabanı kurulum
export const db = getFirestore(app);

// media depolama alanı kurulum
export const storage = getStorage(app);