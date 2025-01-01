import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showError, showSuccess, clearMessage, getFirebaseErrorMessage } from './messages';

async function checkPseudoExists(pseudo) {
    const response = await fetch(`/api/check-pseudo?pseudo=${encodeURIComponent(pseudo)}`);
    if (!response.ok) throw new Error('Erreur serveur lors de la vérification du pseudo');
    const data = await response.json();
    return data.exists;
}

async function addUserToDatabase(uid, email, pseudo) {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, email, pseudo })
    });
    if (!response.ok) throw new Error('Erreur serveur lors de l\'enregistrement');
    return response.json();
}

async function registerUser(email, password, pseudo) {
    let firebaseUser;
    try {
        // Création du compte Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;

        // Ajout dans la base de données SQL
        try {
            await addUserToDatabase(firebaseUser.uid, email, pseudo);
            return true;
        } catch (error) {
            // Si erreur SQL, supprimer le compte Firebase
            await firebaseUser.delete();
            throw error;
        }
    } catch (error) {
        if (firebaseUser) {
            await firebaseUser.delete();
        }
        throw error;
    }
}

export function initializeRegister() {
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

            // Validations
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

            if(password !== passwordConfirmation) {
                showError('Les mots de passe doivent être identiques.');
                return;
            }

            if (!droit) {
                showError('Vous devez accepter les conditions d\'utilisation.');
                return;
            }

            try {
                const pseudoExists = await checkPseudoExists(pseudo);
                if (pseudoExists) {
                    showError('Le pseudo est déjà utilisé.');
                    return;
                }

                await registerUser(email, password, pseudo);
                showSuccess('Compte créé !<br>Un mail de confirmation vous a été envoyé.');
            } catch (error) {
                showError(getFirebaseErrorMessage(error));
            }
        });
    }
}