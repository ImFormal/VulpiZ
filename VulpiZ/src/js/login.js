import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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

export function initializeLogin() {
    console.log("Initialisation de la page de connexion");
    const form = document.querySelector('form');
    console.log("Formulaire trouvé:", form);

    if (form) {
        form.addEventListener("submit", async (e) => {
            console.log("Soumission du formulaire de connexion");
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log("Tentative de connexion...");

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Connexion réussie");
                window.location.href = "/";
            } catch (error) {
                console.error("Erreur lors de la connexion:", error);
                alert(error.message);
            }
        });
    } else {
        console.error("Formulaire de connexion non trouvé");
    }
}