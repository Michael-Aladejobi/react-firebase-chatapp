import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chatapp-fd4b7.firebaseapp.com",
    projectId: "chatapp-fd4b7",
    storageBucket: "chatapp-fd4b7.appspot.com",
    messagingSenderId: "409619510115",
    appId: "1:409619510115:web:5d17b31b8d39f61352d956",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
