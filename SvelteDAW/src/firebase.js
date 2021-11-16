// Aqui va el driver de conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXEM387rvlJUKftUAkNIXZA13SGjyi2GE",
  authDomain: "svelte-daw.firebaseapp.com",
  projectId: "svelte-daw",
  storageBucket: "svelte-daw.appspot.com",
  messagingSenderId: "139517520625",
  appId: "1:139517520625:web:4a0ed09107eb61c999d750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();