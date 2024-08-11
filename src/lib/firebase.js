import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyDakPS441Y14aPISzhbXAGdLhUcaOgQh98',
    authDomain: "chatapp-fd4b7.firebaseapp.com",
    projectId: "chatapp-fd4b7",
    storageBucket: "chatapp-fd4b7.appspot.com",
    messagingSenderId: "409619510115",
    appId: "1:409619510115:web:5d17b31b8d39f61352d956",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
