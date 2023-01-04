import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlT48VJu4HJdD7FGwn-ijxCPhAx9pvLgA",
    authDomain: "newlifehospitals-54914.firebaseapp.com",
    projectId: "newlifehospitals-54914",
    storageBucket: "newlifehospitals-54914.appspot.com",
    messagingSenderId: "489316624342",
    appId: "1:489316624342:web:0543bfb6aa27b8ffb52677",
    measurementId: "G-H23VX58SDV"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
