// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZwOMfk2MuAd41iMzr-42Bhh-Xm7G-_gc",
  authDomain: "authfirebaseastro.firebaseapp.com",
  projectId: "authfirebaseastro",
  storageBucket: "authfirebaseastro.firebasestorage.app",
  messagingSenderId: "370000466805",
  appId: "1:370000466805:web:0934fa22c6f9e5d707b93c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
auth.languageCode = 'es'; // Set the default language of the SDK to Spanish

export const firebase = {
    app,
    auth
}

console.log("firebase", firebase);