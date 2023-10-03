// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjAcC_uV7E-vk1GVHoxtSCVfb6T-TBGMM",
    authDomain: "softwarewaffe-70ab9.firebaseapp.com",
    projectId: "softwarewaffe-70ab9",
    storageBucket: "softwarewaffe-70ab9.appspot.com",
    messagingSenderId: "81696009276",
    appId: "1:81696009276:web:4e88e60f37dafb8b852739"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
export default db;
