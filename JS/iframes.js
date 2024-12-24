AOS.init();

const modal = document.getElementById('iframe-modal');
const iframe = modal.querySelector('iframe');
const closeModal = modal.querySelector('.close-btn');

document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        iframe.src = url;
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    iframe.src = '';
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});