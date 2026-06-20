// ===== LOAD PRODUCTS FROM JSON =====
let products = [];

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        renderProducts('male');
        renderUnisex();
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback if JSON fails
        products = getFallbackProducts();
        renderProducts('male');
        renderUnisex();
        return products;
    }
}

// ===== FALLBACK PRODUCTS =====
function getFallbackProducts() {
    return [
        // ... your product data here
    ];
}

// ===== RENDER PRODUCTS =====
function renderProducts(category = 'male') {
    const grid = document.getElementById('productGrid');
    const filtered = products.filter(p => p.category === category);
    
    if (!filtered || filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px;">
                <p style="color:#999;">No products found in this category</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.sort((a, b) => (a.order || 0) - (b.order || 0)).map(product => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}">
            ${product.badge ? `<div class="sale-badge" style="position:absolute; top:10px; right:10px; background:${product.badge === 'Premium' ? 'var(--gold)' : 'var(--olive)'}; font-size:0.7rem; padding:4px 12px;">${product.badge}</div>` : ''}
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">` :
                    `<i class="fas ${product.icon || 'fa-flask'}"></i>`
                }
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description || 'Luxury fragrance'}</p>
            <div class="product-details">
                <span class="product-sizes"><i class="fas fa-flask"></i> ${product.sizes || '30ml | 100ml'}</span>
                <span class="product-price">${product.price || 'R150'}</span>
            </div>
            <a href="https://wa.me/27622102873?text=Hi%20Sweet%20Scent!%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.sizes || '')}).%20Please%20assist.%20🙏" 
               target="_blank" 
               class="btn-whatsapp">
                <i class="fab fa-whatsapp"></i> Order via WhatsApp
            </a>
        </div>
    `).join('');
}

// ===== RENDER UNISEX =====
function renderUnisex() {
    const grid = document.getElementById('unisexGrid');
    const unisexProducts = products.filter(p => p.category === 'unisex');
    
    if (!unisexProducts || unisexProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px;">
                <p style="color:#999;">No unisex products available</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = unisexProducts.sort((a, b) => (a.order || 0) - (b.order || 0)).map(product => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}">
            ${product.badge ? `<div class="sale-badge" style="position:absolute; top:10px; right:10px; background:${product.badge === 'Premium' ? 'var(--gold)' : 'var(--olive)'}; font-size:0.7rem; padding:4px 12px;">${product.badge}</div>` : ''}
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">` :
                    `<i class="fas ${product.icon || 'fa-flask'}"></i>`
                }
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description || 'Luxury fragrance'}</p>
            <div class="product-details">
                <span class="product-sizes"><i class="fas fa-flask"></i> ${product.sizes || '30ml'}</span>
                <span class="product-price">${product.price || 'R180'}</span>
            </div>
            <a href="https://wa.me/27622102873?text=Hi%20Sweet%20Scent!%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.sizes || '')}).%20Please%20assist.%20🙏" 
               target="_blank" 
               class="btn-whatsapp">
                <i class="fab fa-whatsapp"></i> Order via WhatsApp
            </a>
        </div>
    `).join('');
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    loadProducts().then(() => {
        setupTabs();
        setupHamburger();
        setupActiveNav();
        initAOS();
    });
});