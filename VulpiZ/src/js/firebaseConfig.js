import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASgZLSHX5ym6eNou3P5mh7OQi7C4Fe-Gk",
  authDomain: "bdd-vulpiz.firebaseapp.com",
  databaseURL: "https://bdd-vulpiz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bdd-vulpiz",
  storageBucket: "bdd-vulpiz.firebasestorage.app",
  messagingSenderId: "408502257550",
  appId: "1:408502257550:web:d4b79709ffe9eafb6906df",
  measurementId: "G-SN4P106NSF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);