import { pool } from '../../db/databaseConfig';

export async function GET({ request }) {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');

    try {
        const [rows] = await pool.execute(
            `SELECT u.*, a.url, t.nom_titre
            FROM utilisateur u 
            LEFT JOIN avatar a ON u.avatar_utilisateur = a.id_avatar
            LEFT JOIN titre t ON u.titre_utilisateur = t.id_titre
            WHERE id_utilisateur = ?`,
            [uid]
        );
        
        return new Response(
            JSON.stringify(rows[0] || {}),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}