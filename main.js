// Filtre des projets (Tous / Front-end / Back-end / Full-stack / WordPress).
// L'état du filtre est porté par aria-pressed sur les pills ; le CSS s'appuie dessus.
(function () {
    const pills = document.querySelectorAll('.pill[data-filter]');
    const projects = document.querySelectorAll('.project[data-category]');
    const groups = document.querySelectorAll('.project-group');
    const emptyMessage = document.querySelector('.no-projects');

    function applyFilter(activePill) {
        const filter = activePill.dataset.filter;
        let visibleCount = 0;

        pills.forEach(pill => {
            pill.setAttribute('aria-pressed', String(pill === activePill));
        });

        projects.forEach(project => {
            const matches = filter === 'all' || project.dataset.category === filter;
            project.hidden = !matches;
            if (matches) visibleCount++;
        });

        // Un groupe sans projet visible disparaît avec son titre.
        groups.forEach(group => {
            group.hidden = !group.querySelector('.project:not([hidden])');
        });

        if (emptyMessage) {
            emptyMessage.textContent = visibleCount === 0
                ? 'Aucun projet ' + activePill.textContent.trim() + ' pour le moment.'
                : '';
        }
    }

    pills.forEach(pill => {
        pill.addEventListener('click', () => applyFilter(pill));
    });
})();
