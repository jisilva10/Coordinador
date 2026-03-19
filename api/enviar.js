// Este archivo se ejecuta en el servidor de Vercel, de forma segura.
export default async function handler(req, res) {
    // Solo permitimos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // Aquí llamamos a la variable de entorno que configuraste en Vercel
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    try {
        // Vercel se comunica con n8n de forma invisible para el usuario
        const n8nResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (n8nResponse.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Error en n8n' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error de conexión con el servidor' });
    }
}
