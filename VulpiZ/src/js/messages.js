export function showError(message) {
    const errorDiv = document.getElementById('message');
    if (errorDiv) {
        clearMessage();
        errorDiv.innerHTML = message;
        errorDiv.style.display = 'block';
        errorDiv.classList.add('show-error');
    }
}

export function showSuccess(message) {
    const errorDiv = document.getElementById('message');
    if (errorDiv) {
        clearMessage();
        errorDiv.innerHTML = message;
        errorDiv.style.display = 'block';
        errorDiv.classList.add('show-success');
    }
}

export function clearMessage() {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.innerHTML = '';
        messageDiv.style.display = 'none';
        
        if(messageDiv.classList.contains('show-error')) {
            messageDiv.classList.remove('show-error');
        }

        if(messageDiv.classList.contains('show-success')) {
            messageDiv.classList.remove('show-success');
        }
    }
}

export function getFirebaseErrorMessage(error) {
    switch (error.code) {
        // Messages d'erreur pour l'inscription
        case 'auth/email-already-in-use':
            return 'Cette adresse email est déjà utilisée.';
        case 'auth/invalid-email':
            return 'L\'adresse email n\'est pas valide.';
        case 'auth/operation-not-allowed':
            return 'La création de compte est temporairement désactivée.';
        case 'auth/weak-password':
            return 'Le mot de passe doit contenir au moins 8 caractères.';
        case 'auth/invalid-credential':
            return 'Identifiants incorrects.';
        
        // Messages d'erreur pour la connexion
        case 'auth/user-disabled':
            return 'Ce compte a été désactivé.';
        case 'auth/user-not-found':
            return 'Aucun compte n\'existe avec cette adresse email.';
        case 'auth/wrong-password':
            return 'Email ou mot de passe incorrect.';
        case 'auth/too-many-requests':
                return 'Trop de tentatives de connexion échouées.<br>Veuillez réessayer plus tard.';  
            
        default:
            return 'Une erreur s\'est produite.';
    }
}

export function getPasswordErrorMessages(password) {
    const errors = [];
 
    if (password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 8 caractères.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins une majuscule.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un caractère spécial.');
    }
    if (!/\d/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins un chiffre.');
    }
 
    return {
        isValid: errors.length === 0,
        errors: errors.join('<br>')
    };
 }