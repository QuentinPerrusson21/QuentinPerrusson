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

document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.header');

    if (!header.contains(event.target)) {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
function updateAge() {
    const birthDate = new Date('2003-05-20');
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageElement = document.querySelector('.info-card:nth-child(2) .info-value');
    if (ageElement) {
        ageElement.textContent = age + ' ans';
    }
}

updateAge();

setInterval(updateAge, 24 * 60 * 60 * 1000);

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

(function initParticles() {
    const canvas = document.querySelector('.particles-canvas');
    const hero = document.querySelector('.accueil');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    const ACCENT = '133, 82, 242';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0, height = 0, dpr = 1;
    let particles = [];
    let linkDist = 130, mouseRadius = 180;
    const mouse = { x: null, y: null, active: false };
    let rafId = null, running = false;

    function isMobile() { return width < 600; }

    function resize() {
        const rect = hero.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        linkDist = isMobile() ? 100 : 130;
        mouseRadius = isMobile() ? 120 : 180;

        const divisor = isMobile() ? 24000 : 15000;
        const count = Math.max(24, Math.min(90, Math.round((width * height) / divisor)));
        buildParticles(count);
        if (reduceMotion) draw();
    }

    function buildParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.4 + 1.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (running) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }

            if (mouse.active && mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < mouseRadius) {
                    const a = (1 - dist / mouseRadius) * 0.55;
                    ctx.strokeStyle = 'rgba(' + ACCENT + ',' + a + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.hypot(dx, dy);
                if (dist < linkDist) {
                    const a = (1 - dist / linkDist) * 0.22;
                    ctx.strokeStyle = 'rgba(' + ACCENT + ',' + a + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = 'rgba(' + ACCENT + ',0.85)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function loop() {
        draw();
        rafId = requestAnimationFrame(loop);
    }

    function start() {
        if (running || reduceMotion) return;
        running = true;
        rafId = requestAnimationFrame(loop);
    }
    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    function setMouse(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
        mouse.active = true;
        if (reduceMotion) draw();
    }

    hero.addEventListener('mousemove', (e) => setMouse(e.clientX, e.clientY));
    hero.addEventListener('mouseleave', () => { mouse.active = false; });
    hero.addEventListener('touchmove', (e) => {
        if (e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    hero.addEventListener('touchend', () => { mouse.active = false; });

    window.addEventListener('resize', resize);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) start(); else stop(); });
    }, { threshold: 0 });
    io.observe(hero);

    resize();
    if (reduceMotion) {
        draw();
    } else {
        start();
    }
})();
