// ============================================
// SWEET SCENT - ADMIN DASHBOARD
// ============================================

let products = [];
let changesMade = false;

// ===== PRODUCT DATA (from script.js) =====
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
function loadProducts() {
    const tbody = document.getElementById('productTableBody');
    
    try {
        products = JSON.parse(JSON.stringify(productData)); // Deep copy
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:#E74C3C;">
                    <i class="fas fa-exclamation-circle"></i> Error loading products. 
                    <br><small style="color:#999;">${error.message}</small>
                </td>
            </tr>
        `;
    }
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const tbody = document.getElementById('productTableBody');
    
    if (!products || products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:#999;">
                    <i class="fas fa-box-open"></i> No products found.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(product => {
        const categoryMap = {
            male: '👨 Male',
            female: '👩 Female',
            unisex: '👤 Unisex'
        };
        const categoryLabel = categoryMap[product.category] || product.category;
        
        const inStock = product.inStock !== undefined ? product.inStock : true;
        const price30ml = product.price30ml || product.sizes?.[0]?.price || 'R150';
        const price100ml = product.price100ml || product.sizes?.[1]?.price || 'R450';
        
        const imageSrc = product.image || '';
        const hasImage = imageSrc && imageSrc !== '';
        
        return `
            <tr data-product-id="${product.id}">
                <td>
                    <div class="product-cell">
                        <div class="product-thumb">
                            ${hasImage ? 
                                `<img src="${imageSrc}" alt="${product.name}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-flask\\'></i>'">` :
                                `<i class="fas fa-flask"></i>`
                            }
                        </div>
                        <span class="product-name-text">${product.name}</span>
                    </div>
                </td>
                <td><span class="product-category-tag">${categoryLabel}</span></td>
                <td>
                    <input type="text" class="price-input" 
                           data-field="price30ml" 
                           value="${price30ml}" 
                           placeholder="R150">
                </td>
                <td>
                    <input type="text" class="price-input" 
                           data-field="price100ml" 
                           value="${price100ml}" 
                           placeholder="R450">
                </td>
                <td>
                    <div class="toggle-wrapper">
                        <label class="toggle">
                            <input type="checkbox" class="stock-toggle" 
                                   data-product-id="${product.id}" 
                                   ${inStock ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                        <span class="toggle-label ${inStock ? 'in-stock' : 'out-of-stock'}">
                            ${inStock ? '✅ In Stock' : '❌ Out of Stock'}
                        </span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Add event listeners to toggles
    document.querySelectorAll('.stock-toggle').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.toggle-wrapper').querySelector('.toggle-label');
            if (this.checked) {
                label.textContent = '✅ In Stock';
                label.className = 'toggle-label in-stock';
            } else {
                label.textContent = '❌ Out of Stock';
                label.className = 'toggle-label out-of-stock';
            }
            changesMade = true;
            updateStatusMessage('Unsaved changes...', '');
        });
    });

    // Add event listeners to price inputs
    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('change', function() {
            changesMade = true;
            updateStatusMessage('Unsaved changes...', '');
        });
        input.addEventListener('input', function() {
            changesMade = true;
            updateStatusMessage('Unsaved changes...', '');
        });
    });

    changesMade = false;
    updateStatusMessage('', '');
}

// ===== UPDATE STATUS MESSAGE =====
function updateStatusMessage(message, type) {
    const el = document.getElementById('statusMessage');
    if (!message) {
        el.className = 'status-message hidden';
        return;
    }
    el.textContent = message;
    el.className = `status-message ${type}`;
}

// ===== SAVE CHANGES =====
async function saveChanges() {
    const saveBtn = document.getElementById('saveChanges');
    const originalText = saveBtn.innerHTML;
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="loading-spinner" style="width:18px;height:18px;"></span> Saving...';
    updateStatusMessage('Saving changes...', '');

    try {
        // Collect data from UI
        const rows = document.querySelectorAll('#productTableBody tr[data-product-id]');
        const updatedProducts = [];

        rows.forEach(row => {
            const id = parseInt(row.dataset.productId);
            const product = products.find(p => p.id === id);
            if (!product) return;

            const price30mlInput = row.querySelector('input[data-field="price30ml"]');
            const price100mlInput = row.querySelector('input[data-field="price100ml"]');
            const toggle = row.querySelector('.stock-toggle');

            const inStock = toggle ? toggle.checked : true;
            const price30ml = price30mlInput ? price30mlInput.value.trim() : product.price30ml || 'R150';
            const price100ml = price100mlInput ? price100mlInput.value.trim() : product.price100ml || 'R450';

            // Update product data
            const updatedProduct = {
                ...product,
                inStock: inStock,
                price30ml: price30ml,
                price100ml: price100ml,
                displayPrice: price30ml,
                updated_at: new Date().toISOString()
            };

            updatedProducts.push(updatedProduct);
        });

        if (updatedProducts.length === 0) {
            throw new Error('No products to save');
        }

        // Generate the complete JavaScript code for the updated products
        const jsCode = `// ===== PRODUCTS DATA (Updated ${new Date().toLocaleString()}) =====\nconst productData = ${JSON.stringify(updatedProducts, null, 4)};`;

        // Download as JavaScript file
        const blob = new Blob([jsCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `products_updated_${new Date().toISOString().split('T')[0]}.js`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Also download as JSON
        const jsonStr = JSON.stringify(updatedProducts, null, 2);
        const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `products_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(jsonLink);
        jsonLink.click();
        document.body.removeChild(jsonLink);
        URL.revokeObjectURL(jsonUrl);

        products = updatedProducts;

        updateStatusMessage('✅ Changes saved! Files downloaded. Replace your script.js product data with the downloaded JS file.', 'success');
        changesMade = false;

        setTimeout(() => {
            updateStatusMessage('', '');
        }, 10000);

    } catch (error) {
        console.error('Error saving:', error);
        updateStatusMessage(`❌ Error: ${error.message}`, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
    }
}

// ===== SETUP SAVE BUTTON =====
function setupSaveButton() {
    const saveBtn = document.getElementById('saveChanges');
    saveBtn.addEventListener('click', saveChanges);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupSaveButton();
});