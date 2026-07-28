// ============================================
// SWEET SCENT - MAIN SCRIPT (COMPLETE WITH FIXES)
// ============================================

let products = [];
let cart = [];
let currentCategory = 'all';
let currentPage = 1;
let appliedPromoCode = null;
let discountApplied = 0;
let promoCodeId = null;
const ITEMS_PER_PAGE = 6;

// ===== SUPABASE CONFIGURATION =====
const SUPABASE_URL = 'https://kpnfylunzxrvxsymyrks.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbmZ5bHVuenhydnhzeW15cmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NjgwNjksImV4cCI6MjA5OTI0NDA2OX0.oMitGZ7hif6rQsojuqfypRrRJHfTL1XmVo-Dx57GmFg';

// Initialize Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== PRODUCT DATA (Fallback/Seed) =====
const productData = [
    // ===== MALE FRAGRANCES ======
    {
        id: 1,
        name: 'Most Wanted',
        category: 'male',
        description: 'A bold and energetic fragrance with a fresh, spicy, and woody character. Perfect for the confident man who likes to stand out.',
        inspired: 'Azzaro Wanted',
        notes: '🍋 Lemon • 🌿 Ginger • 🫚 Cardamom • 🌲 Juniper Berries • 🍦 Tonka Bean • 🌱 Vetiver • 🪵 Amberwood',
        displayPrice: 'R150',
        price30ml: 'R150',
        price100ml: 'R450',
        inStock: true,
        sizes: [
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Most Wanted.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Most Wanted.png' }
        ],
        icon: 'fa-crown',
        image: '/images/products/Male/100ml/Most Wanted.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Dunhill Desire.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Dunhill Desire.png' }
        ],
        icon: 'fa-gem',
        image: '/images/products/Male/100ml/Dunhill Desire.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Scandal.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Scandal.png' }
        ],
        icon: 'fa-bolt',
        image: '/images/products/Male/100ml/Scandal.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Invictus.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Invictus.png' }
        ],
        icon: 'fa-trophy',
        image: '/images/products/Male/100ml/Invictus.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Bad.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Bad.png' }
        ],
        icon: 'fa-skull',
        image: '/images/products/Male/100ml/Bad.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Male/30ml/Aventus.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Male/100ml/Aventus.png' }
        ],
        icon: 'fa-fire',
        image: '/images/products/Male/100ml/Aventus.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Jadore.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Jadore.png' }
        ],
        icon: 'fa-flower',
        badge: 'Bestseller',
        image: '/images/products/Female/100ml/Jadore.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Contre-moi.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Contre-moi.png' }
        ],
        icon: 'fa-heart',
        image: '/images/products/Female/100ml/Contre-moi.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Coconut.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Coconut.png' }
        ],
        icon: 'fa-umbrella-beach',
        image: '/images/products/Female/100ml/Coconut.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Delirious.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Delirious.png' }
        ],
        icon: 'fa-star',
        image: '/images/products/Female/100ml/Delirious.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Mad Love.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Mad Love.png' }
        ],
        icon: 'fa-heartbeat',
        image: '/images/products/Female/100ml/Mad Love.png'
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
            { size: '30ml', price: 'R150', image: '/images/products/Female/30ml/Marshmallow.png' },
            { size: '100ml', price: 'R450', image: '/images/products/Female/100ml/Marshmallow.png' }
        ],
        icon: 'fa-candy-cane',
        image: '/images/products/Female/100ml/Marshmallow.png'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/phantom-nights.jpeg' }
        ],
        icon: 'fa-ghost',
        badge: 'Premium',
        image: '/images/products/Unisex/phantom-nights.jpeg'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/oud-ispahan.jpg' }
        ],
        icon: 'fa-tree',
        badge: 'Premium',
        image: '/images/products/Unisex/oud-ispahan.jpg'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/after-dark.png' }
        ],
        icon: 'fa-moon',
        badge: 'Premium',
        image: '/images/products/Unisex/after-dark.png'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/vanilla-sex.jpeg' }
        ],
        icon: 'fa-pepper-hot',
        badge: 'Premium',
        image: '/images/products/Unisex/vanilla-sex.jpeg'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/fresh-neroli.jpeg' }
        ],
        icon: 'fa-sun',
        badge: 'Premium',
        image: '/images/products/Unisex/fresh-neroli.jpeg'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/hibiscus-garden.jpeg' }
        ],
        icon: 'fa-leaf',
        badge: 'Premium',
        image: '/images/products/Unisex/hibiscus-garden.jpeg'
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
            { size: '30ml', price: 'R150', image: '/images/products/Unisex/vanilla-nude.jpeg' }
        ],
        icon: 'fa-ice-cream',
        badge: 'Premium',
        image: '/images/products/Unisex/vanilla-nude.jpeg'
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
            { size: '30ml', price: 'R180', image: '/images/products/Unisex/crystal-rouge.png' }
        ],
        icon: 'fa-gem',
        badge: 'Premium',
        image: '/images/products/Unisex/crystal-rouge.png'
    }
];

// ===== LOAD PRODUCTS =====
async function loadProducts() {
    try {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('id');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            products = data;
            console.log('✅ Products loaded from Supabase');
        } else {
            products = productData;
            const { error: seedError } = await supabaseClient
                .from('products')
                .upsert(products);
            
            if (seedError) throw seedError;
            console.log('✅ Products seeded to Supabase');
        }
        
        renderProducts();
        setupDetailButtons();
        setupRealTimeUpdates();
        updateCartUI();
        
    } catch (error) {
        console.error('Error loading products:', error);
        products = productData;
        renderProducts();
        setupDetailButtons();
        updateCartUI();
    }
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const categoryMap = {
        1: 'male',
        2: 'female',
        3: 'unisex'
    };
    
    if (!currentPage || currentPage < 1 || currentPage > 3) {
        currentPage = 1;
    }
    
    const category = categoryMap[currentPage] || 'male';
    const filtered = products.filter(function(p) { return p.category === category; });
    
    document.querySelectorAll('.category-tab').forEach(function(tab) {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    currentCategory = category;

    if (!filtered || filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <p style="color:#999; font-size:1.1rem;">No products found in this category</p>
            </div>
        `;
        updatePaginationButtons();
        return;
    }

    grid.innerHTML = filtered.map(function(product) {
        const isOutOfStock = product.inStock === false;
        
        return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            ${isOutOfStock ? `<div class="out-of-stock-badge">Out of Stock</div>` : ''}
            
            <div class="product-image" style="cursor:pointer; ${isOutOfStock ? 'opacity:0.7;' : ''}">
                <img src="${product.image || '/images/placeholder.png'}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <i class="fas ${product.icon || 'fa-flask'}" style="display:none;"></i>
                <div class="price-bubble">From ${product.displayPrice || 'R150'}</div>
            </div>

            <h3 class="product-name">${product.name}</h3>
            <p class="product-inspired">Inspired by: ${product.inspired || 'Iconic Scent'}</p>

            ${isOutOfStock ? `
                <button class="btn-out-of-stock" disabled style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px; background:#ccc; color:#666; border:none; border-radius:50px; cursor:not-allowed;">
                    <i class="fas fa-times-circle"></i> Out of Stock
                </button>
            ` : `
                <button class="btn-whatsapp btn-detail" data-product-id="${product.id}" style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px;">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            `}
        </div>
    `}).join('');

    updatePaginationButtons();
    setupDetailButtons();
}

// ===== UPDATE PAGINATION BUTTONS =====
function updatePaginationButtons() {
    const container = document.querySelector('.pagination-container');
    if (!container) return;
    
    const totalPages = 3;
    const pageLabels = {
        1: 'Male',
        2: 'Female',
        3: 'Unisex'
    };
    
    let buttonsHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" title="${pageLabels[i]}">
                ${i}
            </button>
        `;
    }
    
    container.innerHTML = buttonsHTML;
    container.style.display = 'flex';
    
    container.querySelectorAll('.page-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            if (page !== currentPage) {
                currentPage = page;
                renderProducts();
                document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== SETUP CATEGORY TABS =====
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    if (!tabs.length) return;
    
    const pageMap = {
        'male': 1,
        'female': 2,
        'unisex': 3
    };
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            
            const category = this.dataset.category;
            const page = pageMap[category] || 1;
            
            currentPage = page;
            currentCategory = category;
            renderProducts();
            
            document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            if (card) {
                var productId = parseInt(card.dataset.productId);
                var product = products.find(function(p) { return p.id === productId; });
                if (product) {
                    openProductModal(product);
                }
            }
        });
    });
}

// ===== OPEN PRODUCT MODAL (WITH PROMO CODE SUPPORT) =====
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
        
        <!-- PROMO CODE SECTION IN MODAL -->
        <div class="modal-promo-section" style="margin:10px 0; padding:10px 12px; background:#F8F7F4; border-radius:8px; border:1px solid #F0EDE8;">
            <div class="promo-toggle" onclick="toggleModalPromo()" style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                <i class="fas fa-ticket-alt" style="color:#9CAF88;"></i>
                <span style="font-size:0.85rem; font-weight:500; color:#2F3E2F;">Have a promo code?</span>
                <button class="promo-toggle-btn" id="modalPromoToggleBtn" style="background:none; border:none; color:#999; cursor:pointer; transition:transform 0.3s ease; margin-left:auto;">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            
            <div class="modal-promo-input" id="modalPromoInputArea" style="display:none; margin-top:8px;">
                <div style="display:flex; gap:8px;">
                    <input type="text" id="modalPromoCodeInput" placeholder="Enter promo code" style="flex:1; padding:8px 12px; border:1.5px solid #E0DDD8; border-radius:8px; font-size:0.85rem; text-transform:uppercase;">
                    <button class="btn-primary" id="modalPromoApplyBtn" style="padding:8px 16px; font-size:0.8rem; white-space:nowrap;">Apply</button>
                </div>
                <div id="modalPromoStatus" class="promo-status" style="margin-top:6px; font-size:0.8rem;"></div>
                <div id="modalPromoAppliedInfo" style="display:none; margin-top:6px; padding:8px 12px; background:#E8F5E9; border-radius:6px; border:1px solid #81C784;">
                    <div style="display:flex; align-items:center; gap:6px; color:#27ae60; font-weight:600; font-size:0.85rem;">
                        <i class="fas fa-check-circle"></i>
                        <span>Promo code applied!</span>
                    </div>
                    <div style="font-size:0.8rem; color:#2F3E2F; margin-top:2px;">
                        <span style="color:#666;">Distributor:</span> <span id="modalPromoDistributor" style="font-weight:500;"></span>
                    </div>
                    <div style="font-size:0.8rem; color:#2F3E2F;">
                        <span style="color:#666;">Code:</span> <span id="modalPromoCodeDisplay" style="font-weight:700; background:#fff; padding:0 6px; border-radius:4px;"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <p class="modal-total-price">Total: <strong id="modalTotalPrice">${defaultSize.price}</strong></p>
        
        <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
            <button class="btn-whatsapp modal-add-to-cart-btn" id="modalAddToCartBtn" style="flex:1; min-width:140px; justify-content:center;">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <a href="#" class="btn-whatsapp modal-whatsapp-btn" id="modalWhatsAppBtn" style="flex:1; min-width:140px; justify-content:center; text-decoration:none;">
                <i class="fab fa-whatsapp"></i> Order Now
            </a>
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
    var modalPromoCode = null;
    var modalDiscount = 0;
    
    // Modal promo functions
    function toggleModalPromo() {
        const area = document.getElementById('modalPromoInputArea');
        const btn = document.getElementById('modalPromoToggleBtn');
        if (!area || !btn) return;
        
        if (area.style.display === 'none') {
            area.style.display = 'block';
            btn.querySelector('i').style.transform = 'rotate(180deg)';
        } else {
            area.style.display = 'none';
            btn.querySelector('i').style.transform = 'rotate(0deg)';
        }
    }
    
    async function applyModalPromo() {
        const input = document.getElementById('modalPromoCodeInput');
        const status = document.getElementById('modalPromoStatus');
        const code = input.value.trim();
        
        if (!code) {
            status.innerHTML = '⚠️ Please enter a promo code';
            status.className = 'promo-status error';
            return;
        }
        
        status.innerHTML = '⏳ Checking code...';
        status.className = 'promo-status loading';
        
        try {
            const cleanCode = code.toUpperCase().trim();
            const { data, error } = await supabaseClient
                .from('promo_codes')
                .select('*')
                .eq('code', cleanCode)
                .eq('is_active', true)
                .single();
            
            if (error || !data) {
                status.innerHTML = '❌ Invalid promo code';
                status.className = 'promo-status error';
                return;
            }
            
            modalPromoCode = data;
            const discountPercent = data.discount_percentage || 0;
            modalDiscount = selectedPrice * parseInt(quantitySelect.value) * (discountPercent / 100);
            
            status.innerHTML = `✅ Code "${cleanCode}" applied! ${discountPercent}% off`;
            status.className = 'promo-status success';
            input.disabled = true;
            document.getElementById('modalPromoApplyBtn').disabled = true;
            document.getElementById('modalPromoApplyBtn').textContent = 'Applied ✓';
            
            document.getElementById('modalPromoAppliedInfo').style.display = 'block';
            document.getElementById('modalPromoDistributor').textContent = data.distributor_name;
            document.getElementById('modalPromoCodeDisplay').textContent = cleanCode;
            
            updateModalTotal();
            updateWhatsAppLink();
            
        } catch (error) {
            console.error('Error validating promo code:', error);
            status.innerHTML = '❌ Error validating code';
            status.className = 'promo-status error';
        }
    }
    
    function updateModalTotal() {
        var quantity = parseInt(quantitySelect.value);
        var total = selectedPrice * quantity;
        
        if (modalPromoCode && modalDiscount > 0) {
            var discountedTotal = total - modalDiscount;
            totalPriceDisplay.innerHTML = `
                <span style="text-decoration:line-through; color:#999; font-size:0.8rem;">R${total}</span>
                <span style="color:#27ae60; font-weight:700;">R${discountedTotal.toFixed(2)}</span>
                <span style="font-size:0.7rem; color:#27ae60; display:block;">(${modalPromoCode.discount_percentage}% off - Save R${modalDiscount.toFixed(2)})</span>
            `;
        } else {
            totalPriceDisplay.textContent = 'R' + total;
        }
    }
    
    function updateWhatsAppLink() {
        var quantity = parseInt(quantitySelect.value);
        var total = selectedPrice * quantity;
        var finalTotal = total;
        var discountText = '';
        
        if (modalPromoCode && modalDiscount > 0) {
            finalTotal = total - modalDiscount;
            discountText = `%0A🎟️ Promo Code: ${modalPromoCode.code} (${modalPromoCode.discount_percentage}% off - R${modalDiscount.toFixed(2)} saved)%0A👤 Distributor: ${modalPromoCode.distributor_name}`;
        }
        
        var message = 'Hello Sweet Scent%0A%0AI\'d like to place an order.%0A%0A--- ORDER SUMMARY ---%0A';
        message += '%0AProduct: ' + product.name;
        message += '%0ASize: ' + selectedSize.size;
        message += '%0AQuantity: ' + quantity;
        message += '%0ATotal: R' + finalTotal.toFixed(2);
        if (modalPromoCode && modalDiscount > 0) {
            message += '%0AOriginal Price: R' + total;
        }
        message += discountText;
        message += '%0A%0APlease confirm my order and send me your payment details.%0A%0AThank you.';
        
        whatsappBtn.href = 'https://wa.me/27622102873?text=' + message;
    }
    
    // Setup modal promo listeners
    document.getElementById('modalPromoApplyBtn').addEventListener('click', applyModalPromo);
    document.getElementById('modalPromoCodeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyModalPromo();
        }
    });
    
    // Update price when size or quantity changes
    sizeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            
            var size = this.dataset.size;
            var price = this.dataset.price;
            var image = this.dataset.image;
            
            selectedSize = product.sizes.find(function(s) { return s.size === size; });
            selectedPrice = parseInt(price.replace('R', ''));
            
            // Reset modal promo when size changes
            modalPromoCode = null;
            modalDiscount = 0;
            document.getElementById('modalPromoCodeInput').disabled = false;
            document.getElementById('modalPromoCodeInput').value = '';
            document.getElementById('modalPromoApplyBtn').disabled = false;
            document.getElementById('modalPromoApplyBtn').textContent = 'Apply';
            document.getElementById('modalPromoStatus').className = 'promo-status';
            document.getElementById('modalPromoStatus').textContent = '';
            document.getElementById('modalPromoAppliedInfo').style.display = 'none';
            
            productImage.src = image;
            updateModalTotal();
            updateWhatsAppLink();
        });
    });
    
    quantitySelect.addEventListener('change', function() {
        updateModalTotal();
        updateWhatsAppLink();
    });
    
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
    
    updateModalTotal();
    updateWhatsAppLink();
}

// ===== CLOSE MODAL =====
function closeModal() {
    var modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== CART FUNCTIONS =====
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
        var price = parseInt(String(item.selectedSize.price).replace('R', ''));
        total += price * item.quantity;
    });
    return total;
}

function updateCartUI() {
    var countEl = document.getElementById('cartCount');
    var countElMobile = document.getElementById('cartCountMobile');
    var itemsEl = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');
    
    var totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    
    if (countEl) countEl.textContent = totalItems;
    if (countElMobile) countElMobile.textContent = totalItems;
    
    if (itemsEl) {
        if (cart.length === 0) {
            itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            itemsEl.innerHTML = cart.map(function(item) {
                var price = parseInt(String(item.selectedSize.price).replace('R', ''));
                var subtotal = price * item.quantity;
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
    
    updateCartTotalDisplay(totalEl);
}

function updateCartTotalDisplay(totalEl) {
    if (!totalEl) return;
    
    const total = getCartTotal();
    const discountDisplay = document.getElementById('promoDiscountDisplay');
    const discountValue = document.getElementById('promoDiscountValue');
    
    if (appliedPromoCode && discountApplied > 0) {
        const discountedTotal = total - discountApplied;
        totalEl.innerHTML = `
            <span style="text-decoration:line-through; color:#999; font-size:0.8rem;">
                R${total.toFixed(2)}
            </span>
            <span style="color:#27ae60; font-weight:700;">
                R${discountedTotal.toFixed(2)}
            </span>
        `;
        
        if (discountDisplay) {
            discountDisplay.style.display = 'block';
            discountDisplay.innerHTML = `
                <div class="discount-badge">
                    <i class="fas fa-tags"></i>
                    ${appliedPromoCode.discount_percentage}% off - You save <strong>R${discountApplied.toFixed(2)}</strong>
                </div>
            `;
        }
        
        if (discountValue) {
            discountValue.textContent = `${appliedPromoCode.discount_percentage}% (R${discountApplied.toFixed(2)} off)`;
        }
    } else {
        totalEl.textContent = `R${total.toFixed(2)}`;
        if (discountDisplay) {
            discountDisplay.style.display = 'none';
        }
        if (discountValue) {
            discountValue.textContent = '';
        }
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
    var cartBtnMobile = document.getElementById('cartBtnMobile');
    var cartOverlay = document.getElementById('cartOverlay');
    var cartClose = document.getElementById('cartClose');
    var checkoutBtn = document.getElementById('cartCheckout');
    
    function openCart(e) {
        if (e) e.preventDefault();
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartUI();
    }
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartBtnMobile) cartBtnMobile.addEventListener('click', openCart);
    
    if (cartClose) cartClose.addEventListener('click', closeCart);
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeCart();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeCart();
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

// ===== SEND CART ORDER - NOW RECORDS PROMO USAGE =====
function sendCartOrder() {
    let message = `Hello Sweet Scent%0A%0AI'd like to place an order.%0A%0A--- ORDER SUMMARY ---%0A`;
    let total = 0;
    
    cart.forEach((item, index) => {
        const price = parseInt(String(item.selectedSize.price).replace('R', ''));
        const subtotal = price * item.quantity;
        total += subtotal;
        message += `%0A${index + 1}. ${item.name}%0A   Size: ${item.selectedSize.size}%0A   Quantity: ${item.quantity}%0A   Price: ${item.selectedSize.price}%0A   Subtotal: R${subtotal}%0A`;
    });
    
    // Calculate final total with discount
    let finalTotal = total;
    if (appliedPromoCode && discountApplied > 0) {
        finalTotal = total - discountApplied;
        message += `%0A--- SUBTOTAL: R${total} ---`;
        message += `%0A🎟️ Promo Code: ${appliedPromoCode.code}`;
        message += `%0A👤 Distributor: ${appliedPromoCode.distributor_name}`;
        message += `%0A💰 Discount: ${appliedPromoCode.discount_percentage}% (-R${discountApplied.toFixed(2)})`;
        message += `%0A--- FINAL TOTAL: R${finalTotal.toFixed(2)} ---`;
    } else if (appliedPromoCode) {
        message += `%0A--- TOTAL: R${total} ---`;
        message += `%0A%0A🎟️ Promo Code: ${appliedPromoCode.code}`;
        message += `%0A👤 Distributor: ${appliedPromoCode.distributor_name}`;
    } else {
        message += `%0A--- TOTAL: R${total} ---`;
    }
    
    message += `%0A%0APlease confirm my order and send me your payment details.%0A%0AThank you.`;
    
    // 🔥 RECORD PROMO USAGE HERE - ONLY WHEN ORDER IS SENT
    if (appliedPromoCode && promoCodeId) {
        recordPromoUsage(promoCodeId, total, finalTotal);
    }
    
    window.open(`https://wa.me/27622102873?text=${message}`, '_blank');
    closeCart();
}

// ===== REAL-TIME UPDATES =====
function setupRealTimeUpdates() {
    supabaseClient
        .channel('products-changes')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'products' },
            function(payload) {
                console.log('🔄 Real-time update:', payload);
                loadProducts();
            }
        )
        .subscribe();
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

// ===== MODAL EVENTS =====
function setupModalEvents() {
    var modal = document.getElementById('productModal');
    var closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ============================================
// PROMO CODE FUNCTIONS
// ============================================

// Toggle cart promo input visibility
function togglePromoInput() {
    const area = document.getElementById('promoInputArea');
    const btn = document.getElementById('promoToggleBtn');
    if (!area || !btn) return;
    
    if (area.style.display === 'none') {
        area.style.display = 'block';
        btn.classList.add('active');
    } else {
        area.style.display = 'none';
        btn.classList.remove('active');
    }
}

// Toggle modal promo input visibility
function toggleModalPromo() {
    const area = document.getElementById('modalPromoInputArea');
    const btn = document.getElementById('modalPromoToggleBtn');
    if (!area || !btn) return;
    
    if (area.style.display === 'none') {
        area.style.display = 'block';
        btn.querySelector('i').style.transform = 'rotate(180deg)';
    } else {
        area.style.display = 'none';
        btn.querySelector('i').style.transform = 'rotate(0deg)';
    }
}

// Validate a promo code
async function validatePromoCode(code) {
    try {
        const cleanCode = code.toUpperCase().trim();
        
        const { data, error } = await supabaseClient
            .from('promo_codes')
            .select('*')
            .eq('code', cleanCode)
            .eq('is_active', true)
            .single();
        
        if (error || !data) {
            return { valid: false, message: 'Invalid promo code. Please check and try again.' };
        }
        
        return { 
            valid: true, 
            data: data,
            message: `✅ Code "${cleanCode}" applied!`
        };
    } catch (error) {
        console.error('Error validating promo code:', error);
        return { valid: false, message: 'Error validating code. Please try again.' };
    }
}

// Apply promo code with automatic discount (Cart)
async function applyPromoCode() {
    const input = document.getElementById('promoCodeInput');
    const status = document.getElementById('promoCodeStatus');
    const code = input.value.trim();
    
    if (!code) {
        status.innerHTML = '⚠️ Please enter a promo code';
        status.className = 'promo-status error';
        return;
    }
    
    // If a promo is already applied, clear it first
    if (appliedPromoCode) {
        clearPromoCode();
    }
    
    status.innerHTML = '⏳ Checking code...';
    status.className = 'promo-status loading';
    
    const result = await validatePromoCode(code);
    
    if (result.valid) {
        appliedPromoCode = result.data;
        promoCodeId = result.data.id;
        
        // Calculate discount
        const discountPercent = result.data.discount_percentage || 0;
        const total = getCartTotal();
        const discountAmount = total * (discountPercent / 100);
        discountApplied = discountAmount;
        
        status.innerHTML = `✅ ${result.message}`;
        status.className = 'promo-status success';
        input.disabled = true;
        document.getElementById('promoApplyBtn').disabled = true;
        document.getElementById('promoApplyBtn').textContent = 'Applied ✓';
        
        // Store in session
        sessionStorage.setItem('promoCode', code.toUpperCase());
        sessionStorage.setItem('promoCodeId', result.data.id);
        sessionStorage.setItem('discountApplied', discountAmount);
        sessionStorage.setItem('promoData', JSON.stringify(result.data));
        
        // Show applied info
        document.getElementById('promoAppliedInfo').style.display = 'block';
        document.getElementById('promoDistributorName').textContent = result.data.distributor_name;
        document.getElementById('promoCodeDisplay').textContent = code.toUpperCase();
        document.getElementById('promoDiscountValue').textContent = `${discountPercent}% (R${discountAmount.toFixed(2)} off)`;
        
        // Show discount display
        const discountDisplay = document.getElementById('promoDiscountDisplay');
        if (discountDisplay) {
            if (discountPercent > 0) {
                discountDisplay.style.display = 'block';
                discountDisplay.innerHTML = `
                    <div class="discount-badge">
                        <i class="fas fa-tags"></i>
                        ${discountPercent}% off - You save <strong>R${discountAmount.toFixed(2)}</strong>
                    </div>
                `;
            } else {
                discountDisplay.style.display = 'none';
            }
        }
        
        // Update cart total with discount
        updateCartUI();
        
        showCartNotification(`✅ Promo code "${code}" applied! ${discountPercent}% off!`);
        
    } else {
        status.innerHTML = `❌ ${result.message}`;
        status.className = 'promo-status error';
        appliedPromoCode = null;
        discountApplied = 0;
        promoCodeId = null;
    }
}

// Record promo code usage - CALLED FROM sendCartOrder()
async function recordPromoUsage(promoCodeId, originalTotal, finalTotal) {
    try {
        const productIds = cart.map(item => item.id);
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(7);
            sessionStorage.setItem('sessionId', sessionId);
        }
        
        // Record usage
        const { error } = await supabaseClient
            .from('promo_code_usage')
            .insert({
                promo_code_id: promoCodeId,
                session_id: sessionId,
                order_total: finalTotal || originalTotal,
                original_total: originalTotal,
                discount_applied: originalTotal - (finalTotal || originalTotal),
                product_ids: productIds,
                used_at: new Date().toISOString()
            });
        
        if (error) throw error;
        
        // Update usage count
        const { data: currentData } = await supabaseClient
            .from('promo_codes')
            .select('usage_count')
            .eq('id', promoCodeId)
            .single();
        
        const newCount = (currentData?.usage_count || 0) + 1;
        
        await supabaseClient
            .from('promo_codes')
            .update({ usage_count: newCount })
            .eq('id', promoCodeId);
        
        console.log('✅ Promo usage recorded successfully');
        
    } catch (error) {
        console.error('Error recording promo usage:', error);
    }
}

// Clear promo code
function clearPromoCode() {
    appliedPromoCode = null;
    discountApplied = 0;
    promoCodeId = null;
    
    const input = document.getElementById('promoCodeInput');
    const status = document.getElementById('promoCodeStatus');
    const applyBtn = document.getElementById('promoApplyBtn');
    const appliedInfo = document.getElementById('promoAppliedInfo');
    const discountDisplay = document.getElementById('promoDiscountDisplay');
    const discountValue = document.getElementById('promoDiscountValue');
    
    if (input) {
        input.value = '';
        input.disabled = false;
    }
    if (applyBtn) {
        applyBtn.disabled = false;
        applyBtn.textContent = 'Apply';
    }
    if (status) {
        status.className = 'promo-status';
        status.textContent = '';
    }
    if (appliedInfo) {
        appliedInfo.style.display = 'none';
    }
    if (discountDisplay) {
        discountDisplay.style.display = 'none';
    }
    if (discountValue) {
        discountValue.textContent = '';
    }
    
    // Remove from session
    sessionStorage.removeItem('promoCode');
    sessionStorage.removeItem('promoCodeId');
    sessionStorage.removeItem('discountApplied');
    sessionStorage.removeItem('promoData');
    
    // Update cart total
    updateCartUI();
    
    showCartNotification('Promo code removed');
}

// Setup promo code button
function setupPromoCodeButton() {
    const applyBtn = document.getElementById('promoApplyBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyPromoCode);
    }
    
    const input = document.getElementById('promoCodeInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyPromoCode();
            }
        });
    }
    
    // Check if promo code was previously applied (session)
    const savedCode = sessionStorage.getItem('promoCode');
    const savedData = sessionStorage.getItem('promoData');
    if (savedCode && savedData) {
        try {
            const data = JSON.parse(savedData);
            appliedPromoCode = data;
            promoCodeId = data.id;
            
            const input = document.getElementById('promoCodeInput');
            if (input) {
                input.value = savedCode;
                // Auto-apply after a short delay
                setTimeout(function() {
                    applyPromoCode();
                }, 500);
            }
        } catch (e) {
            console.error('Error restoring promo code:', e);
        }
    }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupCategoryTabs();
    setupHamburger();
    setupActiveNav();
    setupContactForm();
    setupModalEvents();
    setupValuePopup();
    setupCartModal();
    setupPromoCodeButton();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
});