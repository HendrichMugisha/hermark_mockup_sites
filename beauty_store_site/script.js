// Interactive Logic for Luminary Luxe Mockup

// --- Before/After Interactive Slider Logic ---
const sliderInput = document.getElementById('slider-input');
const sliderBefore = document.getElementById('slider-before');
const sliderHandle = document.getElementById('slider-handle');
const sliderContainer = document.getElementById('slider-container') || (sliderInput ? sliderInput.parentElement : null);

if (sliderContainer && sliderBefore && sliderHandle) {
    let isDragging = false;

    sliderContainer.addEventListener('pointerdown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointermove', (e) => {
        if (isDragging) updateSlider(e.clientX);
    });
    sliderContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) updateSlider(e.touches[0].clientX);
    }, { passive: true });
    sliderContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    function updateSlider(clientX) {
        const rect = sliderContainer.getBoundingClientRect();
        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        sliderBefore.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
        sliderHandle.style.left = `${percent}%`;
        if (sliderInput) sliderInput.value = percent;
    }
}

// --- AI Skincare Routine Quiz Logic ---
let currentQuizStep = 1;
const totalSteps = 3;

function openQuiz() {
    const quizSection = document.getElementById('skincare-quiz');
    if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function selectQuizOption(step) {
    const nextBtn = document.getElementById('btn-quiz-next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextQuizStep() {
    if (currentQuizStep < totalSteps) {
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.add('hidden');
        currentQuizStep++;
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.remove('hidden');
        
        document.getElementById('quiz-step-text').innerText = `Step ${currentQuizStep} of ${totalSteps}`;
        document.getElementById('btn-quiz-prev').disabled = false;
        document.getElementById('btn-quiz-next').disabled = true; // wait for selection
        
        // update progress
        const percent = (currentQuizStep / totalSteps) * 100;
        document.getElementById('quiz-progress').style.width = `${percent}%`;
    } else if (currentQuizStep === totalSteps) {
        // Show Results
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');
        document.getElementById('quiz-navigation').classList.add('hidden');
        document.getElementById('quiz-progress').style.width = `100%`;
    }
}

function prevQuizStep() {
    if (currentQuizStep > 1) {
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.add('hidden');
        currentQuizStep--;
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.remove('hidden');
        
        document.getElementById('quiz-step-text').innerText = `Step ${currentQuizStep} of ${totalSteps}`;
        document.getElementById('btn-quiz-next').disabled = false;
        if (currentQuizStep === 1) {
            document.getElementById('btn-quiz-prev').disabled = true;
        }
        const percent = (currentQuizStep / totalSteps) * 100;
        document.getElementById('quiz-progress').style.width = `${percent}%`;
    }
}

// --- Accordion Logic ---
function toggleAccordion(id) {
    const content = document.getElementById(`acc-content-${id}`);
    const icon = document.getElementById(`acc-icon-${id}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// --- Quick View Drawer Logic ---
const productsData = {
    1: { title: "Phyto-Glow Bio Serum", price: 88, img: "images/bio_serum.png", desc: "Bio-fermented nutrient elixir delivering intense deep cellular hydration. Engineered with clinical-grade phytos to optimize your daily luminosity and smooth micro-crevices." },
    2: { title: "Resveratrol Cell Balm", price: 112, img: "images/cell_balm.avif", desc: "Ultra-rich cushioning balm packed with potent antioxidant resveratrol. Restores the nighttime lipid matrix and repairs environmental micro-damage while you sleep." },
    3: { title: "Botanical Clarifying Tonic", price: 74, img: "images/clarifying_tonic.avif", desc: "Gentle daily BHA tonic infused with active rose quartz electrolytes. Gently dissolves dead cellular buildup while bathing the fresh epidermal layer in rich hydration." },
    4: { title: "Tri-Hyaluronic Eye Cloud", price: 95, img: "images/eye_cloud.avif", desc: "Weightless eye cloud instantly lifting and de-puffing the orbital matrix. Incorporates multi-tier hyaluronic compounds to lock in deep hydration for 48 hours." }
};

let currentQvItem = null;

function openQuickView(id) {
    const data = productsData[id];
    if (data) {
        currentQvItem = data;
        document.getElementById('qv-title').innerText = data.title;
        document.getElementById('qv-price').innerText = `$${data.price}.00`;
        document.getElementById('qv-desc').innerText = data.desc;
        document.getElementById('qv-img').src = data.img;
        
        const drawer = document.getElementById('quickview-drawer');
        const panel = document.getElementById('quickview-panel');
        drawer.classList.remove('pointer-events-none', 'opacity-0');
        panel.classList.remove('translate-x-full');
    }
}

function closeQuickView() {
    const drawer = document.getElementById('quickview-drawer');
    const panel = document.getElementById('quickview-panel');
    panel.classList.add('translate-x-full');
    drawer.classList.add('pointer-events-none', 'opacity-0');
}

function addQvToCart() {
    if (currentQvItem) {
        addToCart(currentQvItem.title, currentQvItem.price, currentQvItem.img);
        closeQuickView();
    }
}

// --- Shopping Bag Logic ---
let cart = [];

function addToCart(title, price, img) {
    cart.push({ title, price, img });
    updateCartUI();
    openCartDrawer();
}

function addBundleToCart() {
    cart.push(
        { title: "Phyto-Glow Bio Serum", price: 88, img: "images/bio_serum.png" },
        { title: "Resveratrol Cell Balm", price: 112, img: "images/cell_balm.avif" },
        { title: "Botanical Clarifying Tonic", price: 74, img: "images/clarifying_tonic.avif" }
    );
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
    
    // update count
    if (cart.length > 0) {
        countBadge.innerText = cart.length;
        countBadge.classList.remove('hidden');
    } else {
        countBadge.classList.add('hidden');
    }
    
    // update items
    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center flex-grow text-center text-brand-muted space-y-3 my-auto">
                <span class="material-symbols-outlined text-5xl text-slate-300">work_history</span>
                <p class="text-sm font-medium">Your bespoke beauty bag is currently empty.</p>
            </div>
        `;
        subtotalEl.innerText = "$0.00";
    } else {
        let html = '';
        let total = 0;
        cart.forEach((item, idx) => {
            total += item.price;
            html += `
                <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-4">
                    <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-xs text-brand-dark">${item.title}</h4>
                        <p class="text-xs font-serif font-bold text-brand-rosegold mt-1">$${item.price}.00</p>
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
