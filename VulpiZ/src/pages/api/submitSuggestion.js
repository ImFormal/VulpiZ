import { pool } from '../../db/databaseConfig';
import { sanitizeInput } from '../../js/sanitizeInput.js';

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const category = formData.get('category');
        const question = sanitizeInput(formData.get('question'));
        const answer = sanitizeInput(formData.get('answer'));
        const userId = formData.get('uid');

        if (!question || !answer) {
            return new Response(JSON.stringify({ 
                error: 'Question ou réponse invalide après nettoyage'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await pool.execute(
            "INSERT INTO suggestion (question_suggestion, reponse_suggestion, id_categorie, id_utilisateur) VALUES (?, ?, ?, ?)",
            [question, answer, category, userId]
        );

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur détaillée:', error);
        return new Response(JSON.stringify({ 
            error: 'Erreur serveur',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}