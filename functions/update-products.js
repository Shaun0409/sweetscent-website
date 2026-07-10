// ============================================
// NETLIFY FUNCTION: Update Products
// ============================================

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse the request body
        const { products } = JSON.parse(event.body);

        if (!products || !Array.isArray(products)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid products data' })
            };
        }

        // In a real production environment, you would:
        // 1. Write to a database (Firebase, Supabase, etc.)
        // 2. Or use a CMS API
        // 3. Or use a file storage service

        // For demo purposes, we'll return success with the data
        // The client will still need to manually update, but we've prepared
        // the infrastructure for auto-update

        // We're using Netlify's file system, but it's read-only in production.
        // For auto-update, we need a database.

        // RECOMMENDED: Use Firebase or Supabase for live updates
        // For now, we'll return the updated data

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                message: 'Products updated successfully!',
                data: products,
                note: 'In production, this would write to a database.'
            })
        };

    } catch (error) {
        console.error('Error updating products:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Internal server error',
                details: error.message 
            })
        };
    }
};