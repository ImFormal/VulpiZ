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

export function initializeRegister() {
    console.log("Initialisation de la page d'inscription");
    
    const submitButton = document.getElementById('submit');
    console.log("Bouton submit trouvé:", submitButton);

    if (submitButton) {
        submitButton.addEventListener("click", async (e) => {
            console.log("Clic sur le bouton submit");
            e.preventDefault();
            e.stopPropagation();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const pseudo = document.getElementById('pseudo').value;
            const droit = document.getElementById('droit').checked;

            console.log("Valeurs récupérées:", {
                email: email ? "présent" : "manquant",
                password: password ? "présent" : "manquant",
                pseudo: pseudo ? "présent" : "manquant",
                droit: droit ? "accepté" : "non accepté"
            });

            if (!email || !password || !pseudo || !droit) {
                console.log("Champs manquants");
                alert("Veuillez remplir tous les champs et accepter les conditions");
                return;
            }

            try {
                console.log("Tentative de création du compte...");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("Compte créé avec succès:", userCredential);
                window.location.href = "/connexion";
            } catch (error) {
                console.error("Erreur lors de l'inscription:", error);
                alert(error.message);
            }
        });
    } else {
        console.error("Bouton submit non trouvé dans le DOM");
    }
}