// ============================================
// SWEET SCENT - MAIN SCRIPT
// ============================================

let products = [];

// ===== PRODUCTS DATA =====
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Most Wanted.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Most Wanted.png' }
        ],
        icon: 'fa-crown',
        // badge: 'Bestseller',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Dunhill Desire.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Dunhill Desire.png' }
        ],
        icon: 'fa-gem',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Scandal.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Scandal.png' }
        ],
        icon: 'fa-bolt',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Invictus.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Invictus.png' }
        ],
        icon: 'fa-trophy',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Bad.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Bad.png' }
        ],
        icon: 'fa-skull',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Male/30ml/Aventus.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Male/100ml/Aventus.png' }
        ],
        icon: 'fa-fire',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Contre-moi.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Contre-moi.png' }
        ],
        icon: 'fa-heart',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Coconut.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Coconut.png' }
        ],
        icon: 'fa-umbrella-beach',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Delirious.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Delirious.png' }
        ],
        icon: 'fa-star',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Mad Love.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Mad Love.png' }
        ],
        icon: 'fa-heartbeat',
        badge: '',
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
        sizes: [
            { size: '30ml', price: 'R150', image: 'images/products/Female/30ml/Marshmallow.png' },
            { size: '100ml', price: 'R450', image: 'images/products/Female/100ml/Marshmallow.png' }
        ],
        icon: 'fa-candy-cane',
        badge: '',
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
    
    // Default to first size (30ml)
    const defaultSize = product.sizes[0];
    const defaultPrice = parseInt(defaultSize.price.replace('R', ''));
    
    // Create size buttons HTML
    const sizeButtonsHTML = product.sizes.map((size, index) => `
        <button class="modal-size-btn ${index === 0 ? 'active' : ''}" data-size="${size.size}" data-price="${size.price}" data-image="${size.image}">
            ${size.size} · ${size.price}
        </button>
    `).join('');
    
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
                ${[1,2,3,4,5,6,7,8,9,10].map(num => `<option value="${num}">${num}</option>`).join('')}
            </select>
        </div>
        
        <p class="modal-total-price">Total: <strong id="modalTotalPrice">${defaultSize.price}</strong></p>
        
        <a href="#" id="modalWhatsAppBtn" class="btn-whatsapp modal-whatsapp-btn">
            <i class="fab fa-whatsapp"></i> Order via WhatsApp
        </a>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set up size button functionality
    const sizeButtons = document.querySelectorAll('.modal-size-btn');
    const productImage = document.getElementById('modalProductImage');
    const totalPriceDisplay = document.getElementById('modalTotalPrice');
    const quantitySelect = document.getElementById('modalQuantity');
    const whatsappBtn = document.getElementById('modalWhatsAppBtn');
    
    let selectedSize = defaultSize;
    let selectedPrice = defaultPrice;
    
    function updateWhatsAppLink() {
        const quantity = parseInt(quantitySelect.value);
        const total = selectedPrice * quantity;
        totalPriceDisplay.textContent = `R${total}`;
        
        // Updated WhatsApp message with quantity and total
        const message = `Hello Sweet Scent%0A%0AI’d like to place an order.%0A%0AProduct: ${product.name}%0ASize: ${selectedSize.size}%0AQuantity: ${quantity}%0ATotal: R${total}%0AName: %0A%0APlease let me know the total amount and payment details.%0A%0AThank you.`;
        whatsappBtn.href = `https://wa.me/27622102873?text=${message}`;
    }
    
    function updatePriceAndImage() {
        updateWhatsAppLink();
    }
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const size = this.dataset.size;
            const price = this.dataset.price;
            const image = this.dataset.image;
            
            selectedSize = product.sizes.find(s => s.size === size);
            selectedPrice = parseInt(price.replace('R', ''));
            
            // Update image
            productImage.src = image;
            
            // Update price and WhatsApp link
            updatePriceAndImage();
        });
    });
    
    quantitySelect.addEventListener('change', updatePriceAndImage);
    
    // Initial update
    updatePriceAndImage();
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

// ===== VALUE POPUP =====
function setupValuePopup() {
    const popup = document.getElementById('valuePopup');
    const closeBtn = document.getElementById('valuePopupClose');
    const title = document.getElementById('valuePopupTitle');
    const description = document.getElementById('valuePopupDescription');
    
    // Value descriptions
    const valueDescriptions = {
        quality: {
            title: 'Quality',
            description: 'We never compromise on quality. Every fragrance is crafted with precision, using premium ingredients to ensure a long-lasting, experience that you can trust.'
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
            description: 'Sweet Scent is built on community. We support local entrepreneurs and give back to the communities that have supported our growth from day one.'
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
    
    // Click handlers for value tags
    document.querySelectorAll('.value-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const value = this.dataset.value;
            const data = valueDescriptions[value];
            if (data) {
                title.textContent = data.title;
                description.textContent = data.description;
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close popup
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

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    setupValuePopup();
});

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
    setupContactForm();
    setupModalEvents();
    initAOS();

    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
});