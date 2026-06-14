// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCmOIdlcDqVfcNGnCdqur2sYVlFw-MOw",
  authDomain: "fir-chat-cc19d.firebaseapp.com",
  projectId: "fir-chat-cc19d",
  storageBucket: "fir-chat-cc19d.firebasestorage.app",
  messagingSenderId: "41375492252",
  appId: "1:41375492252:web:e437a62fb082742612a559",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
