// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// ==================== HERO SLIDER - FIXED ====================
let currentSlide = 0;
let slideInterval;

const heroSlider = document.getElementById('heroSlider');
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('sliderDots');

dotsContainer.innerHTML = '';
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateSlider() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Initialize Slider + Touch Support
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
    startAutoSlide();

    let touchStartX = 0;
    heroSlider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    heroSlider.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    });
});

// Stories Carousel
function scrollStories(direction) {
    const track = document.getElementById('storiesTrack');
    const scrollAmount = 380;
    if (direction === 'left') track.scrollLeft -= scrollAmount;
    else track.scrollLeft += scrollAmount;
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('mobileMenu').classList.remove('active');
        });
    });
});

// Emergency Modal Functions
function openEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function submitEmergency(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit-emergency');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        alert('Emergency reported successfully! Help is on the way.');
        closeEmergencyModal();
        btn.innerHTML = originalText;
        btn.disabled = false;
        e.target.reset();
    }, 1500);
}

document.getElementById('emergencyModal').addEventListener('click', function(e) {
    if (e.target === this) closeEmergencyModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEmergencyModal();
});