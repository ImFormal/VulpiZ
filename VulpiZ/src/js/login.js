import { auth } from '../firebase/firebaseConfig.js';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { showError, clearMessage, getFirebaseErrorMessage, showSuccess } from '../js/messages.js';
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
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                if (!user.emailVerified) {
                    showError('Veuillez vérifier votre email avant de vous connecter.<br>Un nouvel email de vérification va vous être envoyé.');
                    await sendEmailVerification(user);
                    await auth.signOut();
                    return;
                }
                
                window.location.href = "/";
            } catch (error) {
                console.error("Erreur lors de la connexion:", error);
                showError(getFirebaseErrorMessage(error));
            }
        });
    }

    // Gestion de la réinitialisation de mot de passe
    const resetMDP = document.getElementById('reset-mdp');
    if (resetMDP) {
        resetMDP.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const email = document.getElementById('email').value;
            
            if (!email) {
                showError('Veuillez entrer votre email');
                return;
            }

            try {
                await sendPasswordResetEmail(auth, email);
                showSuccess('Email de réinitialisation envoyé !<br>Veuillez consulter vos mails.');
            } catch (error) {
                console.error('Erreur complète:', error); // Pour voir l'erreur exacte
                showError(getFirebaseErrorMessage(error));
            }
        });
    }
}