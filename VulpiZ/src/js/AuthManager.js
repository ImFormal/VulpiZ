import { auth } from '../firebase/firebaseConfig.js';
import { onAuthStateChanged, signOut } from "firebase/auth";

export function initializeAuthManager() {
   console.log("Initialisation de l'AuthManager");
   
   // Gestion de l'authentification
   onAuthStateChanged(auth, async (user) => {
       if (user) {
           try {
               await user.reload(); // Recharger les infos utilisateur

               if (!user.email || user.disabled) {
                   // Compte supprimé ou désactivé
                   await signOut(auth);
                   window.location.href = '/connexion';
                   return;
               }

               if (!user.emailVerified) {
                   await signOut(auth);
                   return;
               }

               if (document.getElementById('userEmail')) {
                   document.getElementById('userEmail').textContent = user.email;
               }
           } catch (error) {
               // Erreur lors du rechargement = compte probablement supprimé
               console.error("Erreur de vérification du compte:", error);
               await signOut(auth);
               window.location.href = '/connexion';
           }
       } else {
           window.location.href = '/connexion';
       }
   });

   // Gestion de la déconnexion
   const logoutLink = document.getElementById('logout');
   if (logoutLink) {
       logoutLink.addEventListener('click', async (e) => {
           e.preventDefault();
           try {
               await signOut(auth);
               localStorage.clear();
               sessionStorage.clear();
               window.location.href = '/connexion';
           } catch (error) {
               console.error("Erreur lors de la déconnexion:", error);
           }
       });
   }
}