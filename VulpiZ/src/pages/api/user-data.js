import { pool } from '../../db/databaseConfig';

export async function GET({ request }) {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM utilisateur WHERE id_utilisateur = ?',
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