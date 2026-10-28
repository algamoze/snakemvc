(() => {
    'use strict';

    const grid = document.querySelector('.catalogo-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.vehicle-card'));
    const search = document.getElementById('buscador');
    const chips = Array.from(document.querySelectorAll('.chip'));
    const sort = document.getElementById('orden');
    const counter = document.getElementById('contador');
    const empty = document.getElementById('sin-resultados');
    let categoria = 'todos';

    // Quita el efecto de carga cuando la imagen ya cargó.
    grid.querySelectorAll('.vehicle-image img').forEach(img => {
        const quitar = () => img.closest('.vehicle-image').classList.remove('img-skeleton');
        if (img.complete) {
            quitar();
        } else {
            img.addEventListener('load', quitar);
            img.addEventListener('error', quitar);
        }
    });

    const normalizar = texto => (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    function filtrar() {
        const q = normalizar(search.value.trim());
        let visibles = 0;

        cards.forEach(card => {
            const coincideNombre = normalizar(card.dataset.nombre).includes(q);
            const coincideCategoria = categoria === 'todos' || card.dataset.categoria === categoria;
            const mostrar = coincideNombre && coincideCategoria;
            card.hidden = !mostrar;
            if (mostrar) visibles++;
        });

        counter.textContent = visibles + (visibles === 1 ? ' vehículo' : ' vehículos');
        empty.hidden = visibles !== 0;
    }

    function ordenar() {
        const criterio = sort.value;
        const lista = [...cards];

        lista.sort((a, b) => {
            switch (criterio) {
                case 'precio-asc': return Number(a.dataset.precio) - Number(b.dataset.precio);
                case 'precio-desc': return Number(b.dataset.precio) - Number(a.dataset.precio);
                case 'nombre': return a.dataset.nombre.localeCompare(b.dataset.nombre, 'es');
                default: return Number(a.dataset.orden) - Number(b.dataset.orden);
            }
        });

        lista.forEach(card => grid.appendChild(card));
    }

    search.addEventListener('input', filtrar);
    sort.addEventListener('change', ordenar);

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            categoria = chip.dataset.categoria;
            filtrar();
        });
    });
})();