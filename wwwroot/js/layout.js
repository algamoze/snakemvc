(() => {
    'use strict';

    const header = document.getElementById('siteHeader');
    const toTop = document.getElementById('backToTop');

    const onScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (header) header.classList.toggle('scrolled', y > 10);
        if (toTop) toTop.classList.toggle('visible', y > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Cualquier botón con data-print abre el diálogo de impresión / guardar PDF.
    document.querySelectorAll('[data-print]').forEach(btn => {
        btn.addEventListener('click', () => window.print());
    });
})();