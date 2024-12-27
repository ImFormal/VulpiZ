// src/components/AuthManager.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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

// Gestion de l'authentification
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (document.getElementById('userEmail')) {
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userId').textContent = user.uid;
        }
    } else {
        window.location.href = '/connexion';
    }
});

// Gestion de la déconnexion
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                localStorage.clear(); // Nettoie le localStorage
                sessionStorage.clear(); // Nettoie le sessionStorage
            } catch (error) {
                console.error("Erreur lors de la déconnexion:", error);
            }
        });
    }
});