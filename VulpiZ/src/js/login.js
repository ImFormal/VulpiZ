import { auth } from '../firebase/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showError, clearMessage, getFirebaseErrorMessage } from '../js/messages.js';
import { sanitizeInput } from '../js/sanitizeInput.js';

export function initializeLogin() {
    console.log("Initialisation de la page de connexion");
    
    const submitButton = document.getElementById('submit');
    
    if (submitButton) {
        clearMessage();
        
        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const email = sanitizeInput(document.getElementById('email').value);
            const password = sanitizeInput(document.getElementById('password').value);

            if (!email) {
                showError('L\'adresse email est requise.');
                return;
            }

            if (!password) {
                showError('Le mot de passe est requis.');
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = "/";
            } catch (error) {
                console.error("Erreur lors de la connexion:", error);
                showError(getFirebaseErrorMessage(error));
            }
        });
    }
}