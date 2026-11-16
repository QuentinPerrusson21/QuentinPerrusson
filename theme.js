// Bascule clair / sombre.
// Clair par défaut ; le sombre est activé par <html data-theme="dark">.
// Le thème initial est posé par le script inline du <head> de chaque page
// (choix mémorisé, sinon préférence système), ce qui évite le flash au chargement.
(function () {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    function currentTheme() {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function updateButton() {
        if (!btn) return;
        const dark = currentTheme() === 'dark';
        const icon = btn.querySelector('i');
        if (icon) icon.className = dark ? 'bx bx-sun' : 'bx bx-moon';
        btn.setAttribute('aria-label', dark ? 'Passer au thème clair' : 'Passer au thème sombre');
    }

    function apply(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        try { localStorage.setItem('theme', theme); } catch (e) {}
        updateButton();
    }

    updateButton();

    if (btn) {
        btn.addEventListener('click', function () {
            apply(currentTheme() === 'dark' ? 'light' : 'dark');
        });
    }
})();
