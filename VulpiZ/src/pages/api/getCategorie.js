import { pool } from '../../db/databaseConfig';

export async function GET() {
    try {
        // Utiliser directement la connexion à la base de données
        const [rows] = await pool.execute("SELECT id_categorie, nom_categorie FROM categorie");
        
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Erreur:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}