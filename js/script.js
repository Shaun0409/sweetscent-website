// ============================================
// SWEET SCENT - MAIN SCRIPT
// ============================================

let products = [];

// ===== LOAD PRODUCTS =====
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json();
        renderProducts('male');
        renderUnisex();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback products if JSON fails to load
        products = getFallbackProducts();
        renderProducts('male');
        renderUnisex();
    }
}

// ===== FALLBACK PRODUCTS =====
function getFallbackProducts() {
    return [
        { id: 1, name: 'Most Wanted', category: 'male', description: 'Bold and charismatic', sizes: '30ml | 100ml', price: 'R150 | R450', icon: 'fa-crown', badge: 'Bestseller' },
        { id: 2, name: "J'adore", category: 'female', description: 'Elegant and floral', sizes: '30ml | 100ml', price: 'R150 | R450', icon: 'fa-flower', badge: 'Bestseller' },
        { id: 13, name: 'Hibiscus Garden', category: 'unisex', description: 'Inspired by Hibiscus Mahaljad', sizes: '30ml', price: 'R180', icon: 'fa-leaf', badge: 'Premium' }
    ];
}

// ===== RENDER PRODUCTS =====
function renderProducts(category = 'male') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
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
            ${product.badge ? `<div class="sale-badge" style="position:absolute; top:10px; right:10px; background:${product.badge === 'Premium' ? '#C9A87C' : '#7B8C6B'}; font-size:0.7rem; padding:4px 12px; border-radius:50px; color:white; font-weight:600;">${product.badge}</div>` : ''}
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
    if (!grid) return;
    
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
            ${product.badge ? `<div class="sale-badge" style="position:absolute; top:10px; right:10px; background:${product.badge === 'Premium' ? '#C9A87C' : '#7B8C6B'}; font-size:0.7rem; padding:4px 12px; border-radius:50px; color:white; font-weight:600;">${product.badge}</div>` : ''}
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

// ===== TAB SWITCHING =====
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            renderProducts(category);
            
            // Smooth scroll to products
            const grid = document.getElementById('productGrid');
            if (grid) {
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== MOBILE HAMBURGER =====
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== ACTIVE NAV LINK =====
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Header shadow on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
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
    setupTabs();
    setupHamburger();
    setupActiveNav();
    initAOS();
});