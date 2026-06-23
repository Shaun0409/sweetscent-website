// ============================================
// SWEET SCENT - MAIN SCRIPT
// ============================================

let products = [];

// ===== PRODUCTS DATA =====
const productData = [
    // ===== MALE FRAGRANCES =====
    {
        id: 1,
        name: 'Most Wanted',
        category: 'male',
        description: 'A bold and energetic fragrance with a fresh, spicy, and woody character. Perfect for the confident man who likes to stand out.',
        inspired: 'Azzaro Wanted',
        notes: '🍋 Lemon • 🌿 Ginger • 🫚 Cardamom • 🌲 Juniper Berries • 🍦 Tonka Bean • 🌱 Vetiver • 🪵 Amberwood',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-crown',
        badge: 'Bestseller',
        image: 'images/products/Male/Most Wanted.png'
    },
    {
        id: 2,
        name: 'Dunhill Desire',
        category: 'male',
        description: 'A warm, fruity, and seductive fragrance that balances sweetness with masculine depth.',
        inspired: 'Dunhill Desire Red',
        notes: '🍎 Apple • 🌸 Orange Blossom • 🍊 Bergamot • 🌹 Rose • 🌿 Patchouli • 🍦 Vanilla • 🤍 Musk',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-gem',
        badge: '',
        image: 'images/products/Male/Dunhill Desire.png'
    },
    {
        id: 3,
        name: 'Scandal',
        category: 'male',
        description: 'A rich and modern fragrance with sweet caramel notes blended with fresh aromatics and woody accords.',
        inspired: 'Jean Paul Gaultier Scandal Pour Homme',
        notes: '🍊 Mandarin Orange • 🌿 Clary Sage • 🍬 Caramel • 🍦 Tonka Bean • 🌱 Vetiver',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-bolt',
        badge: '',
        image: 'images/products/Male/Scandal.png'
    },
    {
        id: 4,
        name: 'Invictus',
        category: 'male',
        description: 'A fresh aquatic fragrance with a sporty and masculine edge, designed for winners.',
        inspired: 'Paco Rabanne Invictus',
        notes: '🍊 Grapefruit • 🌊 Marine Notes • 🌿 Bay Leaf • 🌼 Jasmine • 🪵 Guaiac Wood • ✨ Ambergris',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-trophy',
        badge: '',
        image: 'images/products/Male/Invictus.png'
    },
    {
        id: 5,
        name: 'Bad',
        category: 'male',
        description: 'A daring and sophisticated scent combining freshness, spice, and smoky warmth.',
        inspired: 'Diesel Bad',
        notes: '🍋 Bergamot • 💜 Lavender • 🫚 Cardamom • 🐟 Caviar Accord • 🚬 Tobacco • 🪵 Woody Notes',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-skull',
        badge: '',
        image: 'images/products/Male/Bad.png'
    },
    {
        id: 6,
        name: 'Aventus',
        category: 'male',
        description: 'A powerful and iconic fragrance known for its fresh fruity opening and smoky woody dry-down.',
        inspired: 'Creed Aventus',
        notes: '🍍 Pineapple • 🍋 Bergamot • 🫐 Blackcurrant • 🌳 Birch • 🌿 Patchouli • 🍃 Oakmoss • 🤍 Musk',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-fire',
        badge: 'Premium',
        image: 'images/products/Male/Aventus.png'
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
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-flower',
        badge: 'Bestseller',
        image: 'images/products/Female/Jadore.png'
    },
    {
        id: 8,
        name: 'Contre Moi',
        category: 'female',
        description: 'A soft and sensual vanilla fragrance with delicate floral touches.',
        inspired: 'Louis Vuitton Contre Moi',
        notes: '🍦 Vanilla • 🌸 Orange Blossom • 🌺 Magnolia • 🌹 Rose • 🍫 Cocoa',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-heart',
        badge: '',
        image: 'images/products/Female/Contre-moi.png'
    },
    {
        id: 9,
        name: 'Coconut',
        category: 'female',
        description: 'A timeless fragrance that is fresh, elegant, and effortlessly sophisticated.',
        inspired: 'Chanel Coco Mademoiselle',
        notes: '🍊 Orange • 🍋 Bergamot • 🌹 Rose • 🌼 Jasmine • 🌿 Patchouli • 🍦 Vanilla • 🤍 White Musk',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-umbrella-beach',
        badge: '',
        image: 'images/products/Female/Coconut.png'
    },
    {
        id: 10,
        name: 'Delirious',
        category: 'female',
        description: 'A playful and youthful fragrance bursting with fruity sweetness and soft florals.',
        inspired: 'Katy Perry Mad Love',
        notes: '🍏 Apple Sorbet • 🍓 Strawberry • 🌼 Jasmine • 🌸 Peony • 🥥 Coconut • 🪵 Sandalwood',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-star',
        badge: '',
        image: 'images/products/Female/Delirious.png'
    },
    {
        id: 11,
        name: 'Mad Love',
        category: 'female',
        description: 'A playful and youthful fragrance bursting with fruity sweetness and soft florals.',
        inspired: 'Katy Perry Mad Love',
        notes: '🍏 Apple Sorbet • 🍓 Strawberry • 🌼 Jasmine • 🌸 Peony • 🥥 Coconut • 🪵 Sandalwood',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-heartbeat',
        badge: '',
        image: 'images/products/Female/Mad Love.png'
    },
    {
        id: 12,
        name: 'Marshmallow',
        category: 'female',
        description: 'A sweet and addictive fragrance with fluffy marshmallow and creamy vanilla accords.',
        inspired: 'Kilian Love, Don\'t Be Shy',
        notes: '🍊 Neroli • 🍋 Bergamot • 🌸 Orange Blossom • 🌺 Honeysuckle • 🍬 Marshmallow • 🍦 Vanilla • 🤍 Musk',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' },
            { size: '100ml', price: 'R450' }
        ],
        icon: 'fa-candy-cane',
        badge: '',
        image: 'images/products/Female/Marshmallow.png'
    },

    // ===== UNISEX FRAGRANCES =====
    {
        id: 13,
        name: 'Hibiscus Garden',
        category: 'unisex',
        description: 'A vibrant and exotic fragrance blending florals, fruits, and warm undertones.',
        inspired: 'Hibiscus Mahajád',
        notes: '🌺 Hibiscus • 🌹 Rose • 🌿 Mint • 🫐 Blackcurrant • 👜 Leather • 🍦 Vanilla',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-leaf',
        badge: 'Premium',
        image: 'images/products/Unisex/hibiscus-Garden.jpeg'
    },
    {
        id: 14,
        name: 'Oud Ispahan',
        category: 'unisex',
        description: 'A luxurious oriental fragrance combining rich oud and velvety rose.',
        inspired: 'Oud Ispahan',
        notes: '🪵 Oud • 🌹 Rose • ✨ Labdanum • 🪵 Sandalwood • 🌿 Patchouli',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
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
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-moon',
        badge: 'Premium',
        image: 'images/products/Unisex/after-dark.png'
    },
    {
        id: 16,
        name: 'Phantom Nights',
        category: 'unisex',
        description: 'A dark and mysterious fragrance with sweet gourmand notes and rich depth.',
        inspired: 'Black Phantom',
        notes: '🥃 Rum • ☕ Coffee • 🍫 Dark Chocolate • 🍮 Caramel • 🌾 Sugar Cane • 🪵 Sandalwood',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-ghost',
        badge: 'Premium',
        image: 'images/products/Unisex/phantom-nights.jpeg'
    },
    {
        id: 17,
        name: 'Fresh Neroli',
        category: 'unisex',
        description: 'A crisp and refreshing fragrance inspired by the Mediterranean coastline.',
        inspired: 'Tom Ford Neroli Portofino',
        notes: '🌼 Neroli • 🍋 Bergamot • 🍋 Lemon • 🌸 Orange Blossom • 💜 Lavender • ✨ Amber',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-sun',
        badge: 'Premium',
        image: 'images/products/Unisex/fresh-neroli.jpeg'
    },
    {
        id: 18,
        name: 'Vanilla Nude',
        category: 'unisex',
        description: 'A smooth and comforting fragrance with warm vanilla and soft musky notes.',
        inspired: 'Calvin Klein Nude Vanilla',
        notes: '🍦 Vanilla • 🌼 Jasmine • 🌲 Cedarwood • 🤍 Musk • ✨ Amber',
        displayPrice: 'R150',
        sizes: [
            { size: '30ml', price: 'R150' }
        ],
        icon: 'fa-ice-cream',
        badge: 'Layer',
        image: 'images/products/Unisex/vanilla-nude.jpeg'
    },
    {
        id: 19,
        name: 'Vanilla Sex',
        category: 'unisex',
        description: 'A luxurious vanilla fragrance with creamy, warm, and sensual character.',
        inspired: 'Tom Ford Vanilla Sex',
        notes: '🍦 Vanilla Absolute • 🍦 Tonka Bean • 🪵 Sandalwood • 🌰 Almond',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-pepper-hot',
        badge: 'Premium',
        image: 'images/products/Unisex/vanilla-sex.jpeg'
    },
    {
        id: 20,
        name: 'Crystal Rouge',
        category: 'unisex',
        description: 'An iconic fragrance known for its airy sweetness, elegance, and exceptional longevity.',
        inspired: 'Baccarat Rouge 540',
        notes: '✨ Saffron • 🌼 Jasmine • 🪵 Amberwood • ✨ Ambergris • 🌲 Cedarwood',
        displayPrice: 'R180',
        sizes: [
            { size: '30ml', price: 'R180' }
        ],
        icon: 'fa-gem',
        badge: 'Premium',
        image: 'images/products/Unisex/crystal-rouge.png'
    }
];

// ===== LOAD PRODUCTS =====
function loadProducts() {
    products = productData;
    renderProducts('male');
}

// ===== RENDER PRODUCTS =====
function renderProducts(category = 'male') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const filtered = products.filter(p => p.category === category);

    if (!filtered || filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <p style="color:#999; font-size:1.1rem;">No products found in this category</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}

            <div class="product-image" style="cursor:pointer;">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <i class="fas ${product.icon}" style="display:none;"></i>
                <div class="price-bubble">From ${product.displayPrice}</div>
            </div>

            <h3 class="product-name">${product.name}</h3>
            <p class="product-inspired">Inspired by: ${product.inspired}</p>
            <p class="product-description">${product.description}</p>

            <div class="product-notes">
                <span class="notes-label">Notes:</span>
                <span class="notes-text">${product.notes}</span>
            </div>

            <button class="btn-whatsapp btn-detail" data-product-id="${product.id}" style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px;">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `).join('');

    // Setup detail buttons
    setupDetailButtons();
}

// ===== RENDER UNISEX =====
function renderUnisex() {
    const grid = document.getElementById('unisexGrid');
    if (!grid) return;

    const unisexProducts = products.filter(p => p.category === 'unisex');

    if (!unisexProducts || unisexProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <p style="color:#999; font-size:1.1rem;">No unisex products available</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = unisexProducts.map(product => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}

            <div class="product-image" style="cursor:pointer;">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <i class="fas ${product.icon}" style="display:none;"></i>
                <div class="price-bubble">${product.displayPrice}</div>
            </div>

            <h3 class="product-name">${product.name}</h3>
            <p class="product-inspired">Inspired by: ${product.inspired}</p>
            <p class="product-description">${product.description}</p>

            <div class="product-notes">
                <span class="notes-label">Notes:</span>
                <span class="notes-text">${product.notes}</span>
            </div>

            <button class="btn-whatsapp btn-detail" data-product-id="${product.id}" style="margin-top:auto; width:100%; justify-content:center; font-size:0.84rem; padding:11px 20px;">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `).join('');

    setupDetailButtons();
}

// ===== DETAIL BUTTONS =====
function setupDetailButtons() {
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                openProductModal(product);
            }
        });
    });
    
    // Also make product image clickable
    document.querySelectorAll('.product-image').forEach(img => {
        img.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                openProductModal(product);
            }
        });
    });
}

// ===== OPEN PRODUCT MODAL =====
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');
    
    // Get the price per unit for each size
    const sizeOptions = product.sizes.map((size, index) => `
        <option value="${size.size}" data-price="${parseInt(size.price.replace('R', ''))}" ${index === 0 ? 'selected' : ''}>
            ${size.size} - ${size.price}
        </option>
    `).join('');
    
    // Get the initial selected size price
    const initialPrice = parseInt(product.sizes[0].price.replace('R', ''));
    
    content.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image" onerror="this.style.display='none'">
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-inspired">Inspired by: ${product.inspired}</p>
        <p class="modal-product-description">${product.description}</p>
        <div class="modal-product-notes">
            <span class="modal-notes-label">Notes:</span>
            <span class="modal-notes-text">${product.notes}</span>
        </div>
        <p class="modal-product-price" id="modalUnitPrice">${product.sizes[0].price}</p>
        
        <div class="modal-quantity-selector">
            <label for="modalSize">Size:</label>
            <select id="modalSize">
                ${sizeOptions}
            </select>
            <label for="modalQuantity">Qty:</label>
            <select id="modalQuantity">
                ${[1,2,3,4,5,6,7,8,9,10].map(num => `<option value="${num}">${num}</option>`).join('')}
            </select>
        </div>
        
        <p class="modal-total-price">Total: <strong id="modalTotalPrice">${product.sizes[0].price}</strong></p>
        
        <a href="#" class="btn-whatsapp modal-whatsapp-btn" id="modalWhatsAppBtn">
            <i class="fab fa-whatsapp"></i> Order via WhatsApp
        </a>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set up the calculation
    const sizeSelect = document.getElementById('modalSize');
    const quantitySelect = document.getElementById('modalQuantity');
    const unitPriceDisplay = document.getElementById('modalUnitPrice');
    const totalPriceDisplay = document.getElementById('modalTotalPrice');
    const whatsappBtn = document.getElementById('modalWhatsAppBtn');
    
    function updatePrices() {
        // Get the selected option and its price
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const unitPrice = parseInt(selectedOption.dataset.price);
        const sizeLabel = selectedOption.value;
        const quantity = parseInt(quantitySelect.value);
        const totalPrice = unitPrice * quantity;
        
        // Update displays
        unitPriceDisplay.textContent = `R${unitPrice}`;
        totalPriceDisplay.textContent = `R${totalPrice}`;
        
        // Update WhatsApp link
        const message = `Hi Sweet Scent! I'd like to order ${product.name} - ${sizeLabel} (R${unitPrice}) x${quantity} = R${totalPrice}. Please assist. 🙏`;
        whatsappBtn.href = `https://wa.me/27622102873?text=${encodeURIComponent(message)}`;
    }
    
    sizeSelect.addEventListener('change', updatePrices);
    quantitySelect.addEventListener('change', updatePrices);
    
    // Initial update
    updatePrices();
}

// ===== CLOSE MODAL =====
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
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

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }

        const whatsappMessage = `Hi Sweet Scent!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/27622102873?text=${whatsappMessage}`, '_blank');

        form.reset();
        alert('Thank you! Your message has been sent via WhatsApp.');
    });
}

// ===== MODAL CLOSE EVENTS =====
function setupModalEvents() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    
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
    renderUnisex();
    setupTabs();
    setupHamburger();
    setupActiveNav();
    setupContactForm();
    setupModalEvents();
    initAOS();

    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
});