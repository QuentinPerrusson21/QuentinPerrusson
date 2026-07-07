(function () {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    function currentTheme() {
        return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function updateIcon() {
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (!icon) return;
        icon.className = currentTheme() === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    }

    function apply(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        try { localStorage.setItem('theme', theme); } catch (e) {}
        updateIcon();
    }

    updateIcon();

    if (btn) {
        btn.addEventListener('click', function () {
            apply(currentTheme() === 'light' ? 'dark' : 'light');
        });
    }
})();
