import { pool } from '../../db/databaseConfig';

export async function GET({ request }) {
    const url = new URL(request.url);
    const pseudo = url.searchParams.get('pseudo');
    
    try {
        const [rows] = await pool.execute(
            'SELECT pseudo_utilisateur FROM utilisateur WHERE pseudo_utilisateur = ?',
            [pseudo]
        );
        return new Response(
            JSON.stringify({ exists: rows.length > 0 }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}