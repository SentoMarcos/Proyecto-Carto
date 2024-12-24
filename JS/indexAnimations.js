AOS.init();

const overlay = document.getElementById('project-overlay');
const overlayImage = overlay.querySelector('img');
const closeBtn = overlay.querySelector('.close-btn');

document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', () => {
        overlayImage.src = img.src;
        overlay.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

