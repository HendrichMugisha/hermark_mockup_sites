// Interactive Logic for Veritas International Academy Mockup

// --- Pathfinder Quiz Logic ---
let currentPfStep = 1;
const totalPfSteps = 3;

function selectPathfinderOption(step) {
    const nextBtn = document.getElementById('btn-pf-next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextPathfinderStep() {
    if (currentPfStep < totalPfSteps) {
        document.getElementById(`pathfinder-step-${currentPfStep}`).classList.add('hidden');
        currentPfStep++;
        document.getElementById(`pathfinder-step-${currentPfStep}`).classList.remove('hidden');
        
        document.getElementById('pathfinder-step-text').innerText = `Phase ${currentPfStep} of ${totalPfSteps}`;
        document.getElementById('btn-pf-prev').disabled = false;
        document.getElementById('btn-pf-next').disabled = true; // wait for selection
        
        const percent = (currentPfStep / totalPfSteps) * 100;
        document.getElementById('pathfinder-progress').style.width = `${percent}%`;
    } else if (currentPfStep === totalPfSteps) {
        document.getElementById(`pathfinder-step-${currentPfStep}`).classList.add('hidden');
        document.getElementById('pathfinder-results').classList.remove('hidden');
        document.getElementById('pathfinder-navigation').classList.add('hidden');
        document.getElementById('pathfinder-progress').style.width = `100%`;
    }
}

function prevPathfinderStep() {
    if (currentPfStep > 1) {
        document.getElementById(`pathfinder-step-${currentPfStep}`).classList.add('hidden');
        currentPfStep--;
        document.getElementById(`pathfinder-step-${currentPfStep}`).classList.remove('hidden');
        
        document.getElementById('pathfinder-step-text').innerText = `Phase ${currentPfStep} of ${totalPfSteps}`;
        document.getElementById('btn-pf-next').disabled = false;
        if (currentPfStep === 1) {
            document.getElementById('btn-pf-prev').disabled = true;
        }
        const percent = (currentPfStep / totalPfSteps) * 100;
        document.getElementById('pathfinder-progress').style.width = `${percent}%`;
    }
}

// --- Admissions Checker Modal Logic ---
let currentAdmStep = 1;
const totalAdmSteps = 3;

function openAdmissionsChecker() {
    const modal = document.getElementById('admissions-modal');
    modal.classList.remove('pointer-events-none', 'opacity-0');
}

function closeAdmissionsChecker() {
    const modal = document.getElementById('admissions-modal');
    modal.classList.add('pointer-events-none', 'opacity-0');
    
    // reset steps
    const steps = document.querySelectorAll('.adm-step');
    steps.forEach(s => s.classList.add('hidden'));
    document.getElementById('adm-step-1').classList.remove('hidden');
    document.getElementById('adm-navigation').classList.remove('hidden');
    document.getElementById('btn-adm-prev').disabled = true;
    document.getElementById('btn-adm-next').disabled = true;
    document.getElementById('adm-step-text').innerText = `Phase 1 of 3`;
    document.getElementById('admissions-progress').style.width = `33.3%`;
    currentAdmStep = 1;
}

function enableAdmNext(step) {
    const nextBtn = document.getElementById('btn-adm-next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextAdmStep() {
    if (currentAdmStep < totalAdmSteps) {
        document.getElementById(`adm-step-${currentAdmStep}`).classList.add('hidden');
        currentAdmStep++;
        document.getElementById(`adm-step-${currentAdmStep}`).classList.remove('hidden');
        
        document.getElementById('adm-step-text').innerText = `Phase ${currentAdmStep} of ${totalAdmSteps}`;
        document.getElementById('btn-adm-prev').disabled = false;
        document.getElementById('btn-adm-next').disabled = true; // wait for selection
        
        const percent = (currentAdmStep / totalAdmSteps) * 100;
        document.getElementById('admissions-progress').style.width = `${percent}%`;
    } else if (currentAdmStep === totalAdmSteps) {
        document.getElementById(`adm-step-${currentAdmStep}`).classList.add('hidden');
        document.getElementById('adm-results').classList.remove('hidden');
        document.getElementById('adm-navigation').classList.add('hidden');
        document.getElementById('admissions-progress').style.width = `100%`;
    }
}

function prevAdmStep() {
    if (currentAdmStep > 1) {
        document.getElementById(`adm-step-${currentAdmStep}`).classList.add('hidden');
        currentAdmStep--;
        document.getElementById(`adm-step-${currentAdmStep}`).classList.remove('hidden');
        
        document.getElementById('adm-step-text').innerText = `Phase ${currentAdmStep} of ${totalAdmSteps}`;
        document.getElementById('btn-adm-next').disabled = false;
        if (currentAdmStep === 1) {
            document.getElementById('btn-adm-prev').disabled = true;
        }
        const percent = (currentAdmStep / totalAdmSteps) * 100;
        document.getElementById('admissions-progress').style.width = `${percent}%`;
    }
}
