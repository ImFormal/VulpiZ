import { auth } from '../firebase/firebaseConfig';

async function loadCategories() {
    try {
        console.log('Tentative de chargement des catégories...');
        const response = await fetch('/api/getCategorie');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        return [];
    }
}

export async function openMainPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup suggestion-popup">
            <button class="close-button">×</button>
            <h2>Suggestion</h2>
            <div class="separator-popup"></div>
            <form id="suggestionForm">
                <div class="form-group">
                    <label for="category">Catégorie*</label>
                    <select id="category" required>
                        <option value="">Sélectionner une catégorie</option>
                        ${(await loadCategories()).map(cat => 
                            `<option value="${cat.id_categorie}">${cat.nom_categorie}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="question">Question*</label>
                    <textarea id="question" required></textarea>
                </div>
                <div class="form-group">
                    <label for="answer">Réponse*</label>
                    <input type="text" id="answer" required>
                </div>
                <p class="warning">Tout abus de contenu inadapté sera sanctionné</p>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    `;

    document.body.appendChild(popup);
    
    popup.querySelector('.close-button').addEventListener('click', () => popup.remove());
    popup.querySelector('#suggestionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showConfirmationPopup(popup);
    });
}

function showConfirmationPopup(mainPopup) {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay confirmation';
    popup.innerHTML = `
        <div class="popup confirmation-popup">
            <h2>Souhaitez-vous envoyer votre suggestion ?</h2>
            <div class="separator-popup"></div>
            <div class="buttons">
                <button class="confirm-yes">OUI</button>
                <button class="confirm-no">NON</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector('.confirm-yes').addEventListener('click', () => {
        submitSuggestion(mainPopup, popup);
    });

    popup.querySelector('.confirm-no').addEventListener('click', () => {
        popup.remove();
    });
}

async function submitSuggestion(mainPopup, confirmPopup) {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('Vous devez être connecté pour proposer une suggestion.');
            mainPopup.remove();
            confirmPopup.remove();
            return;
        }

        const category = document.querySelector('#category').value;
        const question = document.querySelector('#question').value;
        const answer = document.querySelector('#answer').value;

        const formData = new FormData();
        formData.append('category', category);
        formData.append('question', question);
        formData.append('answer', answer);
        formData.append('uid', currentUser.uid);

        const response = await fetch('/api/submitSuggestion', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de l\'envoi');
        }

        if (data.success) {
            mainPopup.remove();
            confirmPopup.remove();
            showSuccessPopup();
        }
    } catch (error) {
        console.error('Erreur détaillée:', error);
        alert(`Une erreur est survenue lors de l'envoi de la suggestion: ${error.message}`);
    }
}

function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup success-popup">
            <button class="close-button">×</button>
            <h2>Suggestion envoyé !</h2>
        </div>
    `;

    document.body.appendChild(popup);
    popup.querySelector('.close-button').addEventListener('click', () => popup.remove());
}