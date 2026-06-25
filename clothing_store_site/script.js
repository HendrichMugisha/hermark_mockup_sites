// Interactive Logic for Atelier Noir Mockup

// --- VIP Modal Logic ---
function openVIPModal() {
    const modal = document.getElementById('vip-modal');
    modal.classList.remove('pointer-events-none', 'opacity-0');
}

function closeVIPModal() {
    const modal = document.getElementById('vip-modal');
    modal.classList.add('pointer-events-none', 'opacity-0');
}

// VIP Countdown Timer simulation
let secs = 18;
setInterval(() => {
    secs--;
    if (secs < 0) secs = 59;
    const secsEl = document.getElementById('vip-secs');
    if (secsEl) secsEl.innerText = secs < 10 ? `0${secs}` : secs;
}, 1000);

// --- Filter Overlay Logic ---
function openFilterOverlay() {
    const overlay = document.getElementById('filter-overlay');
    overlay.classList.remove('pointer-events-none', 'opacity-0');
}

function closeFilterOverlay() {
    const overlay = document.getElementById('filter-overlay');
    overlay.classList.add('pointer-events-none', 'opacity-0');
}

function updateFilterCount() {
    const btn = document.getElementById('filter-results-btn');
    const min = 8;
    const max = 24;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    btn.innerText = `Show ${rand} Refined Results`;
}

function resetFilters() {
    const checkboxes = document.querySelectorAll('#filter-overlay input[type=checkbox]');
    checkboxes.forEach(cb => cb.checked = true);
    document.getElementById('filter-results-btn').innerText = "Show 24 Refined Results";
}

// --- PDP Fullscreen Modal Logic ---
const pdpCatalogData = {
    1: { tag: "Outerwear", title: "Oversized Structured Overcoat", price: 680, desc: "Premium raw un-dyed boiled wool with exaggerated raglan shoulders. Incorporates internal harness webbings for hands-free off-shoulder carry during urban transit.", img1: "images/oversized_overstructured.avif", img2: "images/pdp_angle_2.png", img3: "images/pdp_angle_3.png" },
    2: { tag: "Architectural Knit", title: "Tactical Ribbed Turtleneck", price: 310, desc: "Dense 12-gauge merino yarn engineered for absolute wind-stopping insulation. Features articulated elbows and elongated thumbhole cuffs.", img1: "images/tactical_turtleneck.avif", img2: "images/oversized_overstructured.avif", img3: "images/pdp_angle_2.png" },
    3: { tag: "Avant-Garde Tailoring", title: "Asymmetrical Twill Blazer", price: 590, desc: "Off-center lapel structure with concealed internal harness webbings. Constructed from heavyweight Japanese cotton twill with raw edge un-hemmed cuffs.", img1: "images/trill_blazer.avif", img2: "images/pdp_angle_3.png", img3: "images/pdp_angle_2.png" }
};

let currentPdpItem = null;

function openPDP(id) {
    const data = pdpCatalogData[id];
    if (data) {
        currentPdpItem = data;
        document.getElementById('pdp-tag').innerText = data.tag;
        document.getElementById('pdp-title').innerText = data.title;
        document.getElementById('pdp-price').innerText = `$${data.price}`;
        document.getElementById('pdp-desc').innerText = data.desc;
        document.getElementById('pdp-img-1').src = data.img1;
        document.getElementById('pdp-img-2').src = data.img2;
        document.getElementById('pdp-img-3').src = data.img3;
        
        const modal = document.getElementById('pdp-modal');
        modal.classList.remove('pointer-events-none', 'opacity-0');
    }
}

function closePDP() {
    const modal = document.getElementById('pdp-modal');
    modal.classList.add('pointer-events-none', 'opacity-0');
}

function selectSize(btn) {
    const buttons = document.querySelectorAll('.size-btn');
    buttons.forEach(b => {
        b.classList.remove('border-brand-dark', 'bg-brand-dark', 'text-brand-cream');
        b.classList.add('border-brand-dark/20', 'bg-transparent', 'text-brand-dark');
    });
    btn.classList.remove('border-brand-dark/20', 'bg-transparent', 'text-brand-dark');
    btn.classList.add('border-brand-dark', 'bg-brand-dark', 'text-brand-cream');
}

function addPdpToCart() {
    if (currentPdpItem) {
        addToCart(currentPdpItem.title, currentPdpItem.price, currentPdpItem.img1);
        closePDP();
    }
}

// --- Shopping Bag & Free Shipping Progress Logic ---
let cart = [];
const freeShippingThreshold = 500;

function addToCart(title, price, img) {
    cart.push({ title, price, img });
    updateCartUI();
    openCartDrawer();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingMsg = document.getElementById('shipping-msg');
    const shippingProgress = document.getElementById('shipping-progress');
    const shippingIcon = document.getElementById('shipping-icon');
    
    // update count
    if (cart.length > 0) {
        countBadge.innerText = cart.length;
        countBadge.classList.remove('hidden');
    } else {
        countBadge.classList.add('hidden');
    }
    
    // update items & total
    let total = 0;
    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center flex-grow text-center text-brand-muted space-y-3 my-auto">
                <span class="material-symbols-outlined text-5xl text-slate-300">inventory_2</span>
                <p class="text-sm font-medium">Your atelier bag is currently empty.</p>
            </div>
        `;
        subtotalEl.innerText = "$0.00";
    } else {
        let html = '';
        cart.forEach((item, idx) => {
            total += item.price;
            html += `
                <div class="flex items-center justify-between p-4 bg-white border border-brand-dark/10 rounded-2xl gap-4 shadow-sm">
                    <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-brand-dark/10 shrink-0">
                        <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-xs text-brand-dark">${item.title}</h4>
                        <p class="text-xs font-bold text-brand-sepia mt-1">$${item.price}.00</p>
                    </div>
                    <button onclick="removeFromCart(${idx})" class="p-1 text-slate-400 hover:text-brand-dark transition-colors">
                        <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
            `;
        });
        itemsContainer.innerHTML = html;
        subtotalEl.innerText = `$${total}.00`;
    }
    
    // update shipping progress bar
    if (total >= freeShippingThreshold) {
        shippingMsg.innerText = "You have unlocked Free Worldwide Express";
        shippingIcon.classList.remove('text-brand-muted');
        shippingIcon.classList.add('text-brand-olive');
        shippingProgress.style.width = "100%";
    } else {
        const diff = freeShippingThreshold - total;
        shippingMsg.innerText = `Add $${diff} more for Free Worldwide Express`;
        shippingIcon.classList.remove('text-brand-olive');
        shippingIcon.classList.add('text-brand-muted');
        const percent = Math.min(100, (total / freeShippingThreshold) * 100);
        shippingProgress.style.width = `${percent}%`;
    }
}

function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const panel = document.getElementById('cart-panel');
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    panel.classList.remove('translate-x-full');
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const panel = document.getElementById('cart-panel');
    panel.classList.add('translate-x-full');
    drawer.classList.add('pointer-events-none', 'opacity-0');
}
