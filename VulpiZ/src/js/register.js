import { auth } from '../firebase/firebaseConfig.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showError, showSuccess, clearMessage, getFirebaseErrorMessage } from '../js/messages.js';

export function initializeRegister() {
    console.log("Initialisation de la page d'inscription");
    
    const submitButton = document.getElementById('submit');
    
    if (submitButton) {
        clearMessage();
        
        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirmation = document.getElementById('password-confirmation').value;
            const pseudo = document.getElementById('pseudo').value;
            const droit = document.getElementById('droit').checked;

            if (!pseudo || pseudo.length < 3) {
                showError('Le pseudo doit contenir au moins 3 caractères.');
                return;
            }

            if (!email) {
                showError('L\'adresse email est requise.');
                return;
            }

            if (!password) {
                showError('Le mot de passe est requis.');
                return;
            }

            if (!passwordConfirmation) {
                showError('Vous devez confirmer votre mot de passe.');
                return;
            }

            if(password != passwordConfirmation){
                showError('Les mots de passe doivent être identiques.');
                return;
            }

            if (!droit) {
                showError('Vous devez accepter les conditions d\'utilisation.');
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                showSuccess('Compte créé !<br>Un mail de confirmation vous a été envoyé.')
            } catch (error) {
                console.error("Erreur lors de l'inscription:", error);
                showError(getFirebaseErrorMessage(error));
            }
        });
    }
}

