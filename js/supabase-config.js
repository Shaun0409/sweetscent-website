// ============================================
// SUPABASE CONFIGURATION
// ============================================

// REPLACE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://kpnfylunzxrvxsymyrks.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbmZ5bHVuenhydnhzeW15cmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NjgwNjksImV4cCI6MjA5OTI0NDA2OX0.oMitGZ7hif6rQsojuqfypRrRJHfTL1XmVo-Dx57GmFg';

// Initialize Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== PRODUCT FUNCTIONS =====

// Load all products
async function loadProductsFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('id');
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error loading products:', error);
        return null;
    }
}

// Save products to Supabase
async function saveProductsToSupabase(products) {
    try {
        // Upsert (update or insert) each product
        const { data, error } = await supabaseClient
            .from('products')
            .upsert(products, { onConflict: 'id' });
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving products:', error);
        return null;
    }
}

// Real-time subscription
function subscribeToProducts(callback) {
    return supabaseClient
        .channel('products-changes')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'products' },
            (payload) => {
                console.log('🔄 Real-time update:', payload);
                callback(payload);
            }
        )
        .subscribe();
}

// ===== EXPORT =====
// For use in script.js and admin dashboard