import { pool } from '../../db/databaseConfig';

export async function GET({ request }) {
    try {
        // Récupérer les 10 meilleurs joueurs
        const [topPlayers] = await pool.execute(`
            SELECT 
                u.*,
                a.url,
                t.nom_titre,
                @rank := @rank + 1 as player_rank
            FROM utilisateur u
            LEFT JOIN avatar a ON u.avatar_utilisateur = a.id_avatar
            LEFT JOIN titre t ON u.titre_utilisateur = t.id_titre,
            (SELECT @rank := 0) r
            ORDER BY u.lvl_utilisateur DESC, u.xp_utilisateur DESC
            LIMIT 10
        `);

        // Récupérer le rang de l'utilisateur courant
        const url = new URL(request.url);
        const uid = url.searchParams.get('uid');
        let currentUser = null;

        if (uid) {
            const [userRows] = await pool.execute(`
                SELECT 
                    u.*,
                    a.url,
                    t.nom_titre,
                    (
                        SELECT COUNT(*) + 1
                        FROM utilisateur u2
                        WHERE u2.lvl_utilisateur > u.lvl_utilisateur 
                        OR (u2.lvl_utilisateur = u.lvl_utilisateur AND u2.xp_utilisateur > u.xp_utilisateur)
                    ) as player_rank
                FROM utilisateur u
                LEFT JOIN avatar a ON u.avatar_utilisateur = a.id_avatar
                LEFT JOIN titre t ON u.titre_utilisateur = t.id_titre
                WHERE u.id_utilisateur = ?
            `, [uid]);

            if (userRows.length > 0) {
                currentUser = userRows[0];
            }
        }

        return new Response(
            JSON.stringify({
                topPlayers: topPlayers.map(player => ({
                    ...player,
                    url: player.url || '/src/assets/default.png',
                    nom_titre: player.nom_titre || 'Renardo',
                    rank: player.player_rank
                })),
                currentUser: currentUser ? {
                    ...currentUser,
                    url: currentUser.url || '/src/assets/default.png',
                    nom_titre: currentUser.nom_titre || 'Renardo',
                    rank: currentUser.player_rank
                } : null
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Erreur API leaderboard:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}