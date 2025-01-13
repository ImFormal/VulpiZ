import { auth } from '../firebase/firebaseConfig';

function createPlayerRow(player, isCurrentUser = false, isTop10 = false) {
    const isCurrentUserInTop10 = isCurrentUser && isTop10;
    return `
        <div class="leaderboard-row ${isCurrentUserInTop10 ? 'is-current-user' : ''}" data-uid="${player.id_utilisateur}">
            <div class="rank">${player.rank}</div>
            <div class="player-info">
                <img src="${player.url}" alt="Avatar" class="avatar">
                <span>[${player.nom_titre}] ${player.pseudo_utilisateur}</span>
            </div>
            <div class="level">${player.lvl_utilisateur}</div>
        </div>
    `;
}

export async function updateLeaderboard() {
    if (!auth.currentUser) return;

    try {
        const response = await fetch(`/api/leaderboard?uid=${auth.currentUser.uid}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || 'Erreur lors de la récupération du classement');
        }
        
        const data = await response.json();
        console.log("Données reçues:", data);
        
        const leaderboardContainer = document.querySelector('.leaderboard-container');
        const currentUserContainer = document.querySelector('.current-user-container');

        if (leaderboardContainer && data.topPlayers) {
            leaderboardContainer.innerHTML = data.topPlayers
                .map((player, index) => createPlayerRow(
                    player, 
                    player.id_utilisateur === auth.currentUser.uid,
                    index < 10
                ))
                .join('');
        }

        if (currentUserContainer && data.currentUser) {
            currentUserContainer.innerHTML = createPlayerRow(data.currentUser, true);
        }

    } catch (error) {
        console.error('Erreur détaillée:', {
            message: error.message,
            stack: error.stack
        });
    }
}

export function initializeLeaderboard() {
    console.log("Initialisation du leaderboard");
    const container = document.querySelector('.leaderboard-card');
    if (!container) return;

    updateLeaderboard();

    setInterval(updateLeaderboard, 30 * 60 * 1000);
}