// Aqui va el driver de conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1uLdwK81XjO4u14xXiJVkeelKWS9EKvI",
  authDomain: "sveltedaw2.firebaseapp.com",
  projectId: "sveltedaw2",
  storageBucket: "sveltedaw2.appspot.com",
  messagingSenderId: "821390868147",
  appId: "1:821390868147:web:2b099bb3f49c9d8acffac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();