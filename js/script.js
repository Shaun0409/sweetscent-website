// ============================================
// SWEET SCENT - MAIN SCRIPT
// ============================================

let products = [];

// ===== PRODUCTS DATA =====
const productData = [
    // Male Fragrances (30ml - R150 | 100ml - R450)
    {
        id: 1,
        name: 'Most Wanted',
        category: 'male',
        description: 'Bold and charismatic. A fragrance for those who command attention.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-crown',
        badge: 'Bestseller',
        image: 'images/products/most-wanted.jpeg',
        order: 1
    },
    {
        id: 2,
        name: 'Dunhill Desire',
        category: 'male',
        description: 'Sophisticated and timeless. An enduring classic.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-gem',
        badge: '',
        image: 'images/products/dunhill-desire.jpg',
        order: 2
    },
    {
        id: 3,
        name: 'Scandal',
        category: 'male',
        description: 'Daring and unforgettable. Make a statement.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-bolt',
        badge: '',
        image: 'images/products/scandal.jpg',
        order: 3
    },
    {
        id: 4,
        name: 'Invictus',
        category: 'male',
        description: 'Victorious and powerful. Unleash your inner champion.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-trophy',
        badge: '',
        image: 'images/products/invictus.jpg',
        order: 4
    },
    {
        id: 5,
        name: 'Bad',
        category: 'male',
        description: 'Edgy and rebellious. For those who dare to be different.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-skull',
        badge: '',
        image: 'images/products/bad.jpg',
        order: 5
    },
    {
        id: 6,
        name: 'Aventus',
        category: 'male',
        description: 'Legendary and distinguished. The pinnacle of fragrance.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-fire',
        badge: 'Premium',
        image: 'images/products/aventus.jpg',
        order: 6
    },

    // Female Fragrances (30ml - R150 | 100ml - R450)
    {
        id: 7,
        name: "J'adore",
        category: 'female',
        description: 'Elegant and floral. A timeless masterpiece.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-flower',
        badge: 'Bestseller',
        image: 'images/products/jadore.jpg',
        order: 1
    },
    {
        id: 8,
        name: 'Contre Moi',
        category: 'female',
        description: 'Warm and sensual. An intimate embrace in a bottle.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-heart',
        badge: '',
        image: 'images/products/contre-moi.jpeg',
        order: 2
    },
    {
        id: 9,
        name: 'Coconut',
        category: 'female',
        description: 'Fresh and tropical. A vacation in every spritz.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-umbrella-beach',
        badge: '',
        image: 'images/products/coconut.jpg',
        order: 3
    },
    {
        id: 10,
        name: 'Delirious',
        category: 'female',
        description: 'Intoxicating and bold. Lose yourself in the scent.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-star',
        badge: '',
        image: 'images/products/delirious.jpg',
        order: 4
    },
    {
        id: 11,
        name: 'Mad Love',
        category: 'female',
        description: 'Passionate and romantic. A love story in every drop.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-heartbeat',
        badge: '',
        image: 'images/products/mad-love.jpg',
        order: 5
    },
    {
        id: 12,
        name: 'Marshmallow',
        category: 'female',
        description: 'Sweet and comforting. A hug in a bottle.',
        sizes: '30ml | 100ml',
        price: 'R150 | R450',
        icon: 'fa-candy-cane',
        badge: '',
        image: 'images/products/marshmallow.jpg',
        order: 6
    },

    // Premium Unisex Collection (30ml - R150)
    {
        id: 13,
        name: 'Hibiscus Garden',
        category: 'unisex',
        description: 'Inspired by Hibiscus Mahaljad. Floral and exotic.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-leaf',
        badge: 'Premium',
        image: 'images/products/hibiscus-garden.jpeg',
        order: 1
    },
    {
        id: 14,
        name: 'Oud Ispahan',
        category: 'unisex',
        description: 'Rich and mysterious. An oriental masterpiece.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-tree',
        badge: 'Premium',
        image: 'images/products/oud-ispahan.jpg',
        order: 2
    },
    {
        id: 15,
        name: 'After Dark',
        category: 'unisex',
        description: 'Inspired by Montaje Intense Café. Deep and captivating.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-moon',
        badge: 'Premium',
        image: 'images/products/after-dark.jpg',
        order: 3
    },
    {
        id: 16,
        name: 'Phantom Nights',
        category: 'unisex',
        description: 'Inspired by Black Phantom. Mysterious and alluring.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-ghost',
        badge: 'Premium',
        image: 'images/products/phantom-nights.jpeg',
        order: 4
    },
    {
        id: 17,
        name: 'Fresh Neroli',
        category: 'unisex',
        description: 'Inspired by Neroli Portofino. Fresh and invigorating.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-sun',
        badge: 'Premium',
        image: 'images/products/fresh-neroli.jpeg',
        order: 5
    },
    {
        id: 18,
        name: 'Vanilla Nude',
        category: 'unisex',
        description: 'Warm and intimate. A cozy embrace. Layer fragrance.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-ice-cream',
        badge: 'Layer',
        image: 'images/products/vanilla-nude.jpeg',
        order: 6
    },
    {
        id: 19,
        name: 'Vanilla Sex',
        category: 'unisex',
        description: 'Bold and seductive. Not for the faint-hearted.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-pepper-hot',
        badge: 'Premium',
        image: 'images/products/vanilla-sex.jpg',
        order: 7
    },
    {
        id: 20,
        name: 'Crystal Rouge',
        category: 'unisex',
        description: 'Crystal clear elegance. Pure sophistication.',
        sizes: '30ml',
        price: 'R150',
        icon: 'fa-gem',
        badge: 'Premium',
        image: 'images/products/crystal-rouge.jpg',
        order: 8
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

    grid.innerHTML = filtered.sort((a, b) => (a.order || 0) - (b.order || 0)).map(product => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                ${product.image ?
                    `<img src="${product.image}" alt="${product.name}">` :
                    `<i class="fas ${product.icon || 'fa-flask'}"></i>`
                }
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description || 'Luxury fragrance'}</p>
            <div class="product-details">
                <span class="product-sizes"><i class="fas fa-flask"></i> ${product.sizes || '30ml | 100ml'}</span>
                <span class="product-price">${product.price || 'R150 | R450'}</span>
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
    initAOS();

    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
});
