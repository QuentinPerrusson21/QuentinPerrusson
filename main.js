var typed = new Typed(".texte", {
    strings: ["Développeur Full-Stack"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
const filterButtons = document.querySelectorAll('.filter-btn');
const projectRows = document.querySelectorAll('.row');
const noProjectsMessage = document.querySelector('.no-projects');
const filterNameSpan = document.querySelector('.filter-name');

const filterNames = {
    'all': 'tous les projets',
    'frontend': 'Front-end',
    'backend': 'Back-end',
    'fullstack': 'Full-stack'
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        let visibleCount = 0;
        projectRows.forEach(row => {
            const category = row.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                row.classList.remove('hide');
                row.classList.add('show');
                visibleCount++;
            } else {
                row.classList.add('hide');
                row.classList.remove('show');
            }
        });
        if (visibleCount === 0) {
            filterNameSpan.textContent = filterNames[filterValue] || filterValue;
            noProjectsMessage.style.display = 'block';
        } else {
            noProjectsMessage.style.display = 'none';
        }
    });
});
// Menu hamburger pour mobile
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMenu() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    navbar.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Fermer le menu en cliquant en dehors
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.header');
    
    if (!header.contains(event.target)) {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});