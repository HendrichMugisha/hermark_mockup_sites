// Interactive Logic for The Grand Serenade Mockup

// --- Spa Before/After Interactive Slider Logic ---
const spaSliderInput = document.getElementById('spa-slider-input');
const spaSliderBefore = document.getElementById('spa-slider-before');
const spaSliderHandle = document.getElementById('spa-slider-handle');

if (spaSliderInput && spaSliderBefore && spaSliderHandle) {
    spaSliderInput.addEventListener('input', (e) => {
        const value = e.target.value;
        spaSliderBefore.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
        spaSliderHandle.style.left = `${value}%`;
    });
}

// --- Room Features Expand Logic ---
function toggleRoomPanel(id) {
    const panel = document.getElementById(`room-panel-${id}`);
    const icon = document.getElementById(`room-icon-${id}`);
    const text = document.getElementById(`room-btn-text-${id}`);
    
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        text.innerText = "Hide Features";
    } else {
        panel.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        text.innerText = "Inspect Features";
    }
}

// --- Interactive Map Logic ---
const mapData = {
    spa: { icon: "spa", tag: "Sanctuary Spa", title: "Thermal Travertine Lagoons", desc: "Subterranean mineral warm water lagoons fed by ancient thermal vents. Offers complete sensory floatation and custom botanical clay rituals." },
    dining: { icon: "restaurant", tag: "Horizon Dining", title: "The Horizon Pavilion", desc: "Helmed by 3-star Michelin executive chef Laurent Devaux. Suspended directly over the turquoise reef barrier with stunning panoramic sunset coordinates." },
    marina: { icon: "sailing", tag: "Private Marina", title: "Yacht Anchorage & Helipad", desc: "Private authorized enterprise helipad and deep-water marina anchorages capable of docking megayachts up to 140 meters in absolute privacy." }
};

function showMapDetail(pin) {
    const data = mapData[pin];
    if (data) {
        const card = document.getElementById('map-detail-card');
        card.style.transform = 'scale(1.05)';
        setTimeout(() => card.style.transform = 'scale(1)', 300);
        
        document.getElementById('map-detail-icon').innerText = data.icon;
        document.getElementById('map-detail-tag').innerText = data.tag;
        document.getElementById('map-detail-title').innerText = data.title;
        document.getElementById('map-detail-desc').innerText = data.desc;
    }
}

// --- Dining Tab Logic ---
function switchMenuTab(tab) {
    const buttons = document.querySelectorAll('.menu-tab-btn');
    buttons.forEach(b => {
        b.classList.remove('border-brand-forest', 'text-brand-forest');
        b.classList.add('border-transparent', 'text-brand-muted');
    });
    
    const activeBtn = document.getElementById(`btn-tab-${tab}`);
    activeBtn.classList.remove('border-transparent', 'text-brand-muted');
    activeBtn.classList.add('border-brand-forest', 'text-brand-forest');
    
    const contents = document.querySelectorAll('.menu-tab-content');
    contents.forEach(c => c.classList.add('hidden'));
    
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
}

// --- Single Quote Switcher Logic ---
function switchQuote(id) {
    const dots = [1, 2, 3];
    dots.forEach(d => {
        const dot = document.getElementById(`dot-quote-${d}`);
        dot.classList.remove('bg-brand-forest');
        dot.classList.add('bg-brand-travertine');
        document.getElementById(`quote-${d}`).classList.add('hidden');
    });
    
    document.getElementById(`dot-quote-${id}`).classList.remove('bg-brand-travertine');
    document.getElementById(`dot-quote-${id}`).classList.add('bg-brand-forest');
    document.getElementById(`quote-${id}`).classList.remove('hidden');
}

// --- Multi-Step Booking Modal & Price Calculator Logic ---
function openBookingModal() {
    // sync from bar if changed
    const barCheckin = document.getElementById('bar-checkin').value;
    const barCheckout = document.getElementById('bar-checkout').value;
    document.getElementById('modal-checkin').value = barCheckin;
    document.getElementById('modal-checkout').value = barCheckout;
    
    calculatePrice();
    
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('pointer-events-none', 'opacity-0');
}

function openBookingModalWithSuite(suiteName, price) {
    const select = document.getElementById('modal-suite');
    select.value = price;
    openBookingModal();
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('pointer-events-none', 'opacity-0');
    
    // reset step
    document.getElementById('booking-step-1').classList.remove('hidden');
    document.getElementById('booking-step-2').classList.add('hidden');
    document.getElementById('modal-footer-nav').classList.remove('hidden');
    document.getElementById('booking-progress').style.width = "50%";
}

function calculatePrice() {
    const checkin = new Date(document.getElementById('modal-checkin').value);
    const checkout = new Date(document.getElementById('modal-checkout').value);
    const suiteSelect = document.getElementById('modal-suite');
    const pricePerNight = parseInt(suiteSelect.value);
    const suiteText = suiteSelect.options[suiteSelect.selectedIndex].text.split(' (')[0];
    
    let nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights <= 0) nights = 1;
    
    const baseTotal = nights * pricePerNight;
    const tax = Math.round(baseTotal * 0.10);
    const grandTotal = baseTotal + tax;
    
    document.getElementById('calc-suite-name').innerText = `${suiteText} (${nights} Nights)`;
    document.getElementById('calc-base-total').innerText = `$${baseTotal.toLocaleString()}.00`;
    document.getElementById('calc-tax').innerText = `$${tax.toLocaleString()}.00`;
    document.getElementById('calc-grand-total').innerText = `$${grandTotal.toLocaleString()}.00`;
}

function confirmBookingStep() {
    document.getElementById('booking-step-1').classList.add('hidden');
    document.getElementById('booking-step-2').classList.remove('hidden');
    document.getElementById('modal-footer-nav').classList.add('hidden');
    document.getElementById('booking-progress').style.width = "100%";
}
