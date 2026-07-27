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
    // ... (keep your existing productData)
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
    
    function updateWhatsAppLink() {
        var quantity = parseInt(quantitySelect.value);
        var total = selectedPrice * quantity;
        totalPriceDisplay.textContent = 'R' + total;
        
        var message = 'Hello Sweet Scent%0A%0AI\'d like to place an order.%0A%0A--- ORDER SUMMARY ---%0A';
        message += '%0AProduct: ' + product.name;
        message += '%0ASize: ' + selectedSize.size;
        message += '%0AQuantity: ' + quantity;
        message += '%0ATotal: R' + total;
        message += '%0A%0APlease confirm my order and send me your payment details.%0A%0AThank you.';
        
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
// PROMO CODE FUNCTIONS - FIXED
// ============================================

// Toggle promo input visibility
function togglePromoInput() {
    const area = document.getElementById('promoInputArea');
    const btn = document.getElementById('promoToggleBtn');
    if (area.style.display === 'none') {
        area.style.display = 'block';
        btn.classList.add('active');
    } else {
        area.style.display = 'none';
        btn.classList.remove('active');
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

// Apply promo code with automatic discount
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
        const discountedTotal = total - discountAmount;
        
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
        
        // ✅ REMOVED: Usage recording moved to sendCartOrder()
        // Only show notification, don't record yet
        showCartNotification(`✅ Promo code "${code}" applied! ${discountPercent}% off!`);
        
    } else {
        status.innerHTML = `❌ ${result.message}`;
        status.className = 'promo-status error';
        appliedPromoCode = null;
        discountApplied = 0;
        promoCodeId = null;
    }
}

// Record promo code usage - NOW CALLED FROM sendCartOrder()
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

// Clear promo code - FIXED to work properly
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
                    // Re-apply the promo to show the discount
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