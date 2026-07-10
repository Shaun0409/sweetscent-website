// ============================================
// SWEET SCENT - MAIN SCRIPT
// ============================================

let products = [];
let cart = [];
let currentCategory = 'all';
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

// ===== SUPABASE CONFIGURATION =====
// REPLACE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://kpnfylunzxrvxsymyrks.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbmZ5bHVuenhydnhzeW15cmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NjgwNjksImV4cCI6MjA5OTI0NDA2OX0.oMitGZ7hif6rQsojuqfypRrRJHfTL1XmVo-Dx57GmFg';

// Initialize Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== PRODUCTS DATA (Fallback/Seed) =====
const productData = [
    // ===== MALE FRAGRANCES ======
    {
        id: 1,
        name: 'Most Wanted',
        category: 'male',
        description: 'A bold and energetic fragrance with a fresh, spicy, and woody character. Perfect for the confident man who likes to stand out.',
        inspired: 'Azzaro Wanted',
        notes: '🍋 Lemon • 🌿 Ginger • 🫚 Cardamom • 🌲 Juniper Berries • 🍦 Tonka Bean • 🌱 Vetiver • 🪵 Amberwood',
        displayprice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Most Wanted.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Most Wanted.png' }
        ],
        icon: 'fa-crown',
        image: 'images/products/Male/100ml/Most Wanted.png'
    },
    {
        id: 2,
        name: 'Dunhill Desire',
        category: 'male',
        description: 'A warm, fruity, and seductive fragrance that balances sweetness with masculine depth.',
        inspired: 'Dunhill Desire Red',
        notes: '🍎 Apple • 🌸 Orange Blossom • 🍊 Bergamot • 🌹 Rose • 🌿 Patchouli • 🍦 Vanilla • 🤍 Musk',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Dunhill Desire.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Dunhill Desire.png' }
        ],
        icon: 'fa-gem',
        image: 'images/products/Male/100ml/Dunhill Desire.png'
    },
    {
        id: 3,
        name: 'Scandal',
        category: 'male',
        description: 'A rich and modern fragrance with sweet caramel notes blended with fresh aromatics and woody accords.',
        inspired: 'Jean Paul Gaultier Scandal Pour Homme',
        notes: '🍊 Mandarin Orange • 🌿 Clary Sage • 🍬 Caramel • 🍦 Tonka Bean • 🌱 Vetiver',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Scandal.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Scandal.png' }
        ],
        icon: 'fa-bolt',
        image: 'images/products/Male/100ml/Scandal.png'
    },
    {
        id: 4,
        name: 'Invictus',
        category: 'male',
        description: 'A fresh aquatic fragrance with a sporty and masculine edge, designed for winners.',
        inspired: 'Paco Rabanne Invictus',
        notes: '🍊 Grapefruit • 🌊 Marine Notes • 🌿 Bay Leaf • 🌼 Jasmine • 🪵 Guaiac Wood • ✨ Ambergris',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Invictus.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Invictus.png' }
        ],
        icon: 'fa-trophy',
        image: 'images/products/Male/100ml/Invictus.png'
    },
    {
        id: 5,
        name: 'Bad',
        category: 'male',
        description: 'A daring and sophisticated scent combining freshness, spice, and smoky warmth.',
        inspired: 'Diesel Bad',
        notes: '🍋 Bergamot • 💜 Lavender • 🫚 Cardamom • 🐟 Caviar Accord • 🚬 Tobacco • 🪵 Woody Notes',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Bad.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Bad.png' }
        ],
        icon: 'fa-skull',
        image: 'images/products/Male/100ml/Bad.png'
    },
    {
        id: 6,
        name: 'Aventus',
        category: 'male',
        description: 'A powerful and iconic fragrance known for its fresh fruity opening and smoky woody dry-down.',
        inspired: 'Creed Aventus',
        notes: '🍍 Pineapple • 🍋 Bergamot • 🫐 Blackcurrant • 🌳 Birch • 🌿 Patchouli • 🍃 Oakmoss • 🤍 Musk',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Aventus.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Aventus.png' }
        ],
        icon: 'fa-fire',
        image: 'images/products/Male/100ml/Aventus.png'
    },

    // ===== FEMALE FRAGRANCES =====
    {
        id: 7,
        name: "J'adore",
        category: 'female',
        description: 'An elegant floral fragrance that feels feminine, radiant, and luxurious.',
        inspired: 'Dior J\'adore',
        notes: '🍐 Pear • 🍈 Melon • 🌸 Magnolia • 🌼 Jasmine • 🌹 Rose • 🍑 Peach • 🍦 Vanilla • 🤍 Musk',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Jadore.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Jadore.png' }
        ],
        icon: 'fa-flower',
        badge: 'Bestseller',
        image: 'images/products/Female/100ml/Jadore.png'
    },
    {
        id: 8,
        name: 'Contre Moi',
        category: 'female',
        description: 'A soft and sensual vanilla fragrance with delicate floral touches.',
        inspired: 'Louis Vuitton Contre Moi',
        notes: '🍦 Vanilla • 🌸 Orange Blossom • 🌺 Magnolia • 🌹 Rose • 🍫 Cocoa',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Contre-moi.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Contre-moi.png' }
        ],
        icon: 'fa-heart',
        image: 'images/products/Female/100ml/Contre-moi.png'
    },
    {
        id: 9,
        name: 'Coconut',
        category: 'female',
        description: 'A timeless fragrance that is fresh, elegant, and effortlessly sophisticated.',
        inspired: 'Chanel Coco Mademoiselle',
        notes: '🍊 Orange • 🍋 Bergamot • 🌹 Rose • 🌼 Jasmine • 🌿 Patchouli • 🍦 Vanilla • 🤍 White Musk',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Coconut.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Coconut.png' }
        ],
        icon: 'fa-umbrella-beach',
        image: 'images/products/Female/100ml/Coconut.png'
    },
    {
        id: 10,
        name: 'Delirious',
        category: 'female',
        description: 'A playful and youthful fragrance bursting with fruity sweetness and soft florals.',
        inspired: 'Katy Perry Mad Love',
        notes: '🍏 Apple Sorbet • 🍓 Strawberry • 🌼 Jasmine • 🌸 Peony • 🥥 Coconut • 🪵 Sandalwood',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Delirious.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Delirious.png' }
        ],
        icon: 'fa-star',
        image: 'images/products/Female/100ml/Delirious.png'
    },
    {
        id: 11,
        name: 'Mad Love',
        category: 'female',
        description: 'A playful and youthful fragrance bursting with fruity sweetness and soft florals.',
        inspired: 'Katy Perry Mad Love',
        notes: '🍏 Apple Sorbet • 🍓 Strawberry • 🌼 Jasmine • 🌸 Peony • 🥥 Coconut • 🪵 Sandalwood',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Mad Love.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Mad Love.png' }
        ],
        icon: 'fa-heartbeat',
        image: 'images/products/Female/100ml/Mad Love.png'
    },
    {
        id: 12,
        name: 'Marshmallow',
        category: 'female',
        description: 'A sweet and addictive fragrance with fluffy marshmallow and creamy vanilla accords.',
        inspired: 'Kilian Love, Don\'t Be Shy',
        notes: '🍊 Neroli • 🍋 Bergamot • 🌸 Orange Blossom • 🌺 Honeysuckle • 🍬 Marshmallow • 🍦 Vanilla • 🤍 Musk',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Marshmallow.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Marshmallow.png' }
        ],
        icon: 'fa-candy-cane',
        image: 'images/products/Female/100ml/Marshmallow.png'
    },

    // ===== UNISEX FRAGRANCES =====
    {
        id: 13,
        name: 'Phantom Nights',
        category: 'unisex',
        description: 'A dark and mysterious fragrance with sweet gourmand notes and rich depth.',
        inspired: 'Black Phantom',
        notes: '🥃 Rum • ☕ Coffee • 🍫 Dark Chocolate • 🍮 Caramel • 🌾 Sugar Cane • 🪵 Sandalwood',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/phantom-nights.jpeg' }
        ],
        icon: 'fa-ghost',
        badge: 'Premium',
        image: 'images/products/Unisex/phantom-nights.jpeg'
    },
    {
        id: 14,
        name: 'Oud Ispahan',
        category: 'unisex',
        description: 'A luxurious oriental fragrance combining rich oud and velvety rose.',
        inspired: 'Oud Ispahan',
        notes: '🪵 Oud • 🌹 Rose • ✨ Labdanum • 🪵 Sandalwood • 🌿 Patchouli',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/oud-ispahan.jpg' }
        ],
        icon: 'fa-tree',
        badge: 'Premium',
        image: 'images/products/Unisex/oud-ispahan.jpg'
    },
    {
        id: 15,
        name: 'After Dark',
        category: 'unisex',
        description: 'A deliciously comforting fragrance where fresh coffee meets creamy vanilla and rose.',
        inspired: 'Montale Intense Café',
        notes: '☕ Coffee • 🌹 Rose • 🍦 Vanilla • 🤍 White Musk • ✨ Amber',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/after-dark.png' }
        ],
        icon: 'fa-moon',
        badge: 'Premium',
        image: 'images/products/Unisex/after-dark.png'
    },
    {
        id: 16,
        name: 'Vanilla Sex',
        category: 'unisex',
        description: 'A luxurious vanilla fragrance with creamy, warm, and sensual character.',
        inspired: 'Tom Ford Vanilla Sex',
        notes: '🍦 Vanilla Absolute • 🍦 Tonka Bean • 🪵 Sandalwood • 🌰 Almond',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/vanilla-sex.jpeg' }
        ],
        icon: 'fa-pepper-hot',
        badge: 'Premium',
        image: 'images/products/Unisex/vanilla-sex.jpeg'
    },
    {
        id: 17,
        name: 'Fresh Neroli',
        category: 'unisex',
        description: 'A crisp and refreshing fragrance inspired by the Mediterranean coastline.',
        inspired: 'Tom Ford Neroli Portofino',
        notes: '🌼 Neroli • 🍋 Bergamot • 🍋 Lemon • 🌸 Orange Blossom • 💜 Lavender • ✨ Amber',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/fresh-neroli.jpeg' }
        ],
        icon: 'fa-sun',
        badge: 'Premium',
        image: 'images/products/Unisex/fresh-neroli.jpeg'
    },
    {
        id: 18,
        name: 'Hibiscus Garden',
        category: 'unisex',
        description: 'A vibrant and exotic fragrance blending florals, fruits, and warm undertones.',
        inspired: 'Hibiscus Mahajád',
        notes: '🌺 Hibiscus • 🌹 Rose • 🌿 Mint • 🫐 Blackcurrant • 👜 Leather • 🍦 Vanilla',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/hibiscus-Garden.jpeg' }
        ],
        icon: 'fa-leaf',
        badge: 'Premium',
        image: 'images/products/Unisex/hibiscus-garden.jpeg'
    },
    {
        id: 19,
        name: 'Vanilla Nude',
        category: 'unisex',
        description: 'A smooth and comforting fragrance with warm vanilla and soft musky notes.',
        inspired: 'Calvin Klein Nude Vanilla',
        notes: '🍦 Vanilla • 🌼 Jasmine • 🌲 Cedarwood • 🤍 Musk • ✨ Amber',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Unisex/vanilla-nude.jpeg' }
        ],
        icon: 'fa-ice-cream',
        badge: 'Premium',
        image: 'images/products/Unisex/vanilla-nude.jpeg'
    },
    {
        id: 20,
        name: 'Crystal Rouge',
        category: 'unisex',
        description: 'An iconic fragrance known for its airy sweetness, elegance, and exceptional longevity.',
        inspired: 'Baccarat Rouge 540',
        notes: '✨ Saffron • 🌼 Jasmine • 🪵 Amberwood • ✨ Ambergris • 🌲 Cedarwood',
        displayPrice: 'R180',
        price30ml: 'R180',
        price100ml: '',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R180', image: 'images/products/Unisex/crystal-rouge.png' }
        ],
        icon: 'fa-gem',
        badge: 'Premium',
        image: 'images/products/Unisex/crystal-rouge.png'
    }
];

// ===== LOAD PRODUCTS =====
async function loadProducts() {
    try {
        // Try Supabase first
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('id');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            products = data;
            console.log('✅ Products loaded from Supabase');
        } else {
            // Seed Supabase with initial data
            products = productData;
            const { error: seedError } = await supabaseClient
                .from('products')
                .upsert(products);
            
            if (seedError) throw seedError;
            console.log('✅ Products seeded to Supabase');
        }
        
        renderProducts();
        setupPagination();
        setupDetailButtons();
        setupAddToCartButtons();
        setupRealTimeUpdates();
        
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to local data
        products = productData;
        renderProducts();
        setupPagination();
        setupDetailButtons();
        setupAddToCartButtons();
    }
}

// ===== REAL-TIME UPDATES =====
function setupRealTimeUpdates() {
    supabaseClient
        .channel('products-changes')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'products' },
            function(payload) {
                console.log('🔄 Real-time update:', payload);
                // Reload products from Supabase
                loadProducts();
                // Update cart if needed
                updateCartUI();
            }
        )
        .subscribe();
}

// ===== GET FILTERED PRODUCTS =====
function getFilteredProducts() {
    if (currentCategory === 'all') {
        return products;
    }
    return products.filter(function(p) { return p.category === currentCategory; });
}

// ===== GET PAGINATED PRODUCTS =====
function getPaginatedProducts(filtered) {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
}

// ===== GET TOTAL PAGES =====
function getTotalPages(filtered) {
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const filtered = getFilteredProducts();
    const totalPages = getTotalPages(filtered);
    
    // Reset to page 1 if current page exceeds total pages
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = 1;
    }
    
    const paginated = getPaginatedProducts(filtered);

    if (!paginated || paginated.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <p style="color:#999; font-size:1.1rem;">No products found in this category</p>
            </div>
        `;
        updatePaginationButtons(totalPages);
        return;
    }

    grid.innerHTML = paginated.map(function(product) {
        const isOutOfStock = product.inStock === false;
        
        return `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            ${isOutOfStock ? `<div class="out-of-stock-badge">Out of Stock</div>` : ''}
            
            <div class="product-image" style="cursor:pointer; ${isOutOfStock ? 'opacity:0.7;' : ''}">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <i class="fas ${product.icon}" style="display:none;"></i>
                <div class="price-bubble">From ${product.displayPrice}</div>
            </div>

            <h3 class="product-name">${product.name}</h3>
            <p class="product-inspired">Inspired by: ${product.inspired}</p>

            ${isOutOfStock ? `
                <button class="btn-out-of-stock" disabled style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px; background:#ccc; color:#666; border:none; border-radius:50px; cursor:not-allowed;">
                    <i class="fas fa-times-circle"></i> Out of Stock
                </button>
            ` : `
                <button class="btn-whatsapp btn-detail" data-product-id="${product.id}" style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px;">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
                <button class="btn-add-cart" data-product-id="${product.id}" style="margin-top:8px; width:100%; justify-content:center; font-size:0.8rem; padding:8px 16px; background:#2F3E2F; color:white; border:none; border-radius:50px; cursor:pointer; transition:all 0.3s ease;">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            `}
        </div>
    `}).join('');

    // Update pagination
    updatePaginationButtons(totalPages);
    
    // Setup detail buttons
    setupDetailButtons();
    setupAddToCartButtons();
}

// ===== UPDATE PAGINATION BUTTONS =====
function updatePaginationButtons(totalPages) {
    const container = document.querySelector('.pagination-container');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    let buttonsHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    container.innerHTML = buttonsHTML;
    
    // Re-attach pagination events
    container.querySelectorAll('.page-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            if (page !== currentPage) {
                currentPage = page;
                renderProducts();
                // Scroll to catalogue
                document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== SETUP CATEGORY TABS =====
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    if (!tabs.length) return;
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.dataset.category;
            currentPage = 1; // Reset to page 1
            
            // Re-render products
            renderProducts();
            
            // Scroll to catalogue
            document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ===== SETUP ADD TO CART BUTTONS =====
function setupAddToCartButtons() {
    document.querySelectorAll('.btn-add-cart').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var productId = parseInt(this.dataset.productId);
            var product = products.find(function(p) { return p.id === productId; });
            if (product) {
                addToCart(product);
            }
        });
    });
}

// ===== CART FUNCTIONS =====
function addToCart(product) {
    var existing = cart.find(function(item) { return item.id === product.id; });
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1, selectedSize: product.sizes[0] });
    }
    updateCartUI();
    showCartNotification(product.name + ' added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(function(item) { return item.id !== productId; });
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    var item = cart.find(function(item) { return item.id === productId; });
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        updateCartUI();
    }
}

function getCartTotal() {
    var total = 0;
    cart.forEach(function(item) {
        var price = parseInt(item.selectedSize.price.replace('R', ''));
        total += price * item.quantity;
    });
    return total;
}

function updateCartUI() {
    var countEl = document.getElementById('cartCount');
    var itemsEl = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');
    
    if (countEl) {
        var totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
        countEl.textContent = totalItems;
    }
    
    if (itemsEl) {
        if (cart.length === 0) {
            itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            itemsEl.innerHTML = cart.map(function(item) {
                return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-size">${item.selectedSize.size}</span>
                        <span class="cart-item-price">${item.selectedSize.price}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `}).join('');
        }
    }
    
    if (totalEl) {
        totalEl.textContent = 'R' + getCartTotal();
    }
}

function showCartNotification(message) {
    var toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #2F3E2F;
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-family: 'Arial', sans-serif;
        font-size: 0.9rem;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideUp 0.4s ease;
        max-width: 300px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
}

// ===== CART MODAL =====
function setupCartModal() {
    var cartBtn = document.getElementById('cartBtn');
    var cartOverlay = document.getElementById('cartOverlay');
    var cartClose = document.getElementById('cartClose');
    var checkoutBtn = document.getElementById('cartCheckout');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCart();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty. Add some products first!');
                return;
            }
            sendCartOrder();
        });
    }
}

function closeCart() {
    var cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function sendCartOrder() {
    var message = 'Hello Sweet Scent%0A%0AI\'d like to place an order.%0A%0A--- ORDER SUMMARY ---%0A';
    var total = 0;
    
    cart.forEach(function(item, index) {
        var price = parseInt(item.selectedSize.price.replace('R', ''));
        var subtotal = price * item.quantity;
        total += subtotal;
        message += '%0A' + (index + 1) + '. ' + item.name + '%0A   Size: ' + item.selectedSize.size + '%0A   Quantity: ' + item.quantity + '%0A   Price: ' + item.selectedSize.price + '%0A   Subtotal: R' + subtotal + '%0A';
    });
    
    message += '%0A--- TOTAL: R' + total + ' ---%0A%0ACustomer Details:%0AName: %0AContact Number: %0ADelivery method: (Uber Courier / Paxi / Collection)%0A%0AAdditional Notes:%0A%0APlease let me know the total amount and payment details.%0A%0AThank you.';
    
    window.open('https://wa.me/27622102873?text=' + message, '_blank');
    closeCart();
}

// ===== SETUP PAGINATION (Legacy - kept for compatibility) =====
function setupPagination() {
    // This is now handled by renderProducts()
    // Keep for compatibility with existing code
    var pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var page = parseInt(this.dataset.page);
            if (page !== currentPage) {
                currentPage = page;
                renderProducts();
                document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== DETAIL BUTTONS =====
function setupDetailButtons() {
    document.querySelectorAll('.btn-detail').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var productId = parseInt(this.dataset.productId);
            var product = products.find(function(p) { return p.id === productId; });
            if (product) {
                openProductModal(product);
            }
        });
    });
    
    document.querySelectorAll('.product-image').forEach(function(img) {
        img.addEventListener('click', function() {
            var card = this.closest('.product-card');
            var productId = parseInt(card.dataset.productId);
            var product = products.find(function(p) { return p.id === productId; });
            if (product) {
                openProductModal(product);
            }
        });
    });
}

// ===== OPEN PRODUCT MODAL =====
function openProductModal(product) {
    var modal = document.getElementById('productModal');
    var content = document.getElementById('modalContent');
    
    var defaultSize = product.sizes[0];
    var defaultPrice = parseInt(defaultSize.price.replace('R', ''));
    
    var sizeButtonsHTML = product.sizes.map(function(size, index) {
        return `
            <button class="modal-size-btn ${index === 0 ? 'active' : ''}" data-size="${size.size}" data-price="${size.price}" data-image="${size.image}">
                ${size.size} · ${size.price}
            </button>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="modal-product-image-wrapper">
            <img src="${defaultSize.image}" alt="${product.name}" class="modal-product-image" id="modalProductImage" onerror="this.style.display='none'">
        </div>
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-inspired">Inspired by: ${product.inspired}</p>
        <p class="modal-product-description">${product.description}</p>
        <div class="modal-product-notes">
            <span class="modal-notes-label">Notes:</span>
            <span class="modal-notes-text">${product.notes}</span>
        </div>
        
        <div class="modal-size-selector">
            <span class="modal-size-label">Select Size:</span>
            <div class="modal-size-buttons">
                ${sizeButtonsHTML}
            </div>
        </div>
        
        <div class="modal-quantity-selector">
            <label for="modalQuantity">Quantity:</label>
            <select id="modalQuantity">
                ${[1,2,3,4,5,6,7,8,9,10].map(function(num) { return `<option value="${num}">${num}</option>`; }).join('')}
            </select>
        </div>
        
        <p class="modal-total-price">Total: <strong id="modalTotalPrice">${defaultSize.price}</strong></p>
        
        <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
            <button class="btn-whatsapp modal-add-to-cart-btn" id="modalAddToCartBtn" style="flex:1; min-width:140px; justify-content:center;">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn-whatsapp modal-whatsapp-btn" id="modalWhatsAppBtn" style="flex:1; min-width:140px; justify-content:center;">
                <i class="fab fa-whatsapp"></i> Order Now
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    var sizeButtons = document.querySelectorAll('.modal-size-btn');
    var productImage = document.getElementById('modalProductImage');
    var totalPriceDisplay = document.getElementById('modalTotalPrice');
    var quantitySelect = document.getElementById('modalQuantity');
    var whatsappBtn = document.getElementById('modalWhatsAppBtn');
    var addToCartBtn = document.getElementById('modalAddToCartBtn');
    
    var selectedSize = defaultSize;
    var selectedPrice = defaultPrice;
    
    function updateWhatsAppLink() {
        var quantity = parseInt(quantitySelect.value);
        var total = selectedPrice * quantity;
        totalPriceDisplay.textContent = 'R' + total;
        
        var message = 'Hello Sweet Scent%0A%0AI\'d like to place an order.%0A%0AProduct: ' + product.name + '%0ASize: ' + selectedSize.size + '%0AQuantity: ' + quantity + '%0ATotal: R' + total + '%0AName: %0A%0APlease let me know the total amount and payment details.%0A%0AThank you.';
        whatsappBtn.href = 'https://wa.me/27622102873?text=' + message;
    }
    
    function updatePriceAndImage() {
        updateWhatsAppLink();
    }
    
    sizeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            
            var size = this.dataset.size;
            var price = this.dataset.price;
            var image = this.dataset.image;
            
            selectedSize = product.sizes.find(function(s) { return s.size === size; });
            selectedPrice = parseInt(price.replace('R', ''));
            
            productImage.src = image;
            updatePriceAndImage();
        });
    });
    
    quantitySelect.addEventListener('change', updatePriceAndImage);
    
    addToCartBtn.addEventListener('click', function() {
        var quantity = parseInt(quantitySelect.value);
        var existing = cart.find(function(item) { return item.id === product.id; });
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity, selectedSize: selectedSize });
        }
        updateCartUI();
        showCartNotification(product.name + ' added to cart!');
        closeModal();
    });
    
    updatePriceAndImage();
}

// ===== CLOSE MODAL =====
function closeModal() {
    var modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== CLOSE MODAL EVENTS =====
function setupModalEvents() {
    var modal = document.getElementById('productModal');
    var closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('contactName').value.trim();
        var phone = document.getElementById('contactPhone').value.trim();
        var message = document.getElementById('contactMessage').value.trim();

        if (!name || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }

        var whatsappMessage = 'Hi Sweet Scent!%0A%0AName: ' + encodeURIComponent(name) + '%0APhone: ' + encodeURIComponent(phone) + '%0AMessage: ' + encodeURIComponent(message);
        window.open('https://wa.me/27622102873?text=' + whatsappMessage, '_blank');

        form.reset();
        alert('Thank you! Your message has been sent via WhatsApp.');
    });
}

// ===== MOBILE HAMBURGER =====
function setupHamburger() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            var icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== ACTIVE NAV LINK =====
function setupActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        var current = '';
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        var header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    });
}

// ===== VALUE POPUP =====
function setupValuePopup() {
    var popup = document.getElementById('valuePopup');
    var closeBtn = document.getElementById('valuePopupClose');
    var title = document.getElementById('valuePopupTitle');
    var description = document.getElementById('valuePopupDescription');
    
    var valueDescriptions = {
        quality: {
            title: 'Quality',
            description: 'We never compromise on quality. Every fragrance is crafted with precision, using premium ingredients to ensure a long-lasting experience that you can trust.'
        },
        affordability: {
            title: 'Affordability',
            description: 'We believe everyone deserves to smell great without breaking the bank. Our fragrances are priced fairly and easily accessible to all South Africans.'
        },
        consistency: {
            title: 'Consistency',
            description: 'Every bottle of Sweet Scent delivers the same exceptional quality. We maintain strict quality control to ensure you get the same great fragrance every time.'
        },
        community: {
            title: 'Community',
            description: 'Sweet Scent is built on community. We believe in creating meaningful connections and serving the people who make our journey possible.'
        },
        integrity: {
            title: 'Integrity',
            description: 'We operate with honesty and transparency. From our ingredients to our pricing, we are open and honest with our customers about what goes into every bottle.'
        },
        passion: {
            title: 'Passion',
            description: 'Fragrance is our passion. Every scent we create is born from a genuine love for the art of perfumery and a desire to help people feel confident and beautiful.'
        }
    };
    
    document.querySelectorAll('.value-tag').forEach(function(tag) {
        tag.addEventListener('click', function() {
            var value = this.dataset.value;
            var data = valueDescriptions[value];
            if (data) {
                title.textContent = data.title;
                description.textContent = data.description;
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}

// ===== INITIALIZE AOS =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupCategoryTabs();
    setupHamburger();
    setupActiveNav();
    setupContactForm();
    setupModalEvents();
    setupValuePopup();
    setupCartModal();
    initAOS();

    setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
});