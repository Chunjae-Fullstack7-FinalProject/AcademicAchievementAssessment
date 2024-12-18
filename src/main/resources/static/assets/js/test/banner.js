const images = document.querySelectorAll('.main-banner img');
const dotsContainer = document.getElementById('bannerDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Generate indicator dots
images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.banner-dots span');
updateDots();

// Slide navigation function
function showSlide(index) {
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = (index + images.length) % images.length;
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Auto slide
function autoSlide() {
    showSlide(currentIndex + 1);
}

let slideInterval = setInterval(autoSlide, 3000);

// Prev/Next button event listeners
if (prevBtn != null) {
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentIndex - 1);
        slideInterval = setInterval(autoSlide, 3000);
    });
}
if (nextBtn != null) {
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentIndex + 1);
        slideInterval = setInterval(autoSlide, 3000);
    });
}