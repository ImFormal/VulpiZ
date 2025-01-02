import { pool } from '../../db/databaseConfig';

export async function POST({ request }) {
    try {
        const { uid, pseudo } = await request.json();
        
        const [result] = await pool.execute(
            `INSERT INTO utilisateur (
                id_utilisateur,
                pseudo_utilisateur,
                avatar_utilisateur,  // Stocker l'ID, pas le chemin
                titre_utilisateur,
                xp_utilisateur,
                lvl_utilisateur,
                monnaie_utilisateur
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                uid,
                pseudo,
                0,  
                0, 
                0,                    
                1,                    
                0                    
            ]
        );
        
        return new Response(
            JSON.stringify({ success: true }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Erreur SQL:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}