(() => {
    'use strict';

    // Galería: cambia la foto principal al hacer clic en una miniatura.
    const principal = document.getElementById('foto-principal');
    const miniaturas = document.querySelectorAll('.miniatura');
    miniaturas.forEach((btn, i) => {
        if (i === 0) btn.classList.add('activa');
        btn.addEventListener('click', () => {
            principal.src = btn.dataset.src;
            miniaturas.forEach(m => m.classList.remove('activa'));
            btn.classList.add('activa');
        });
    });

    // Resumen en vivo.
    const resumen = document.getElementById('resumen');
    if (!resumen) return;

    const inicio = document.getElementById('FechaInicio');
    const fin = document.getElementById('FechaFin');
    const extras = Array.from(document.querySelectorAll('.extra-check'));
    const precio = parseFloat(resumen.dataset.precio);

    const diasEl = document.getElementById('r-dias');
    const subtotalEl = document.getElementById('r-subtotal');
    const extrasEl = document.getElementById('r-extras');
    const totalEl = document.getElementById('r-total');

    const dinero = n => '$' + n.toLocaleString('es-MX') + ' MXN';

    function calcular() {
        const dias = Math.round((new Date(fin.value) - new Date(inicio.value)) / 86400000);

        if (isNaN(dias) || dias <= 0) {
            diasEl.textContent = subtotalEl.textContent = extrasEl.textContent = totalEl.textContent = '—';
            return;
        }

        const extrasPorDia = extras.reduce((suma, c) => suma + (c.checked ? parseFloat(c.dataset.precio) : 0), 0);
        const subtotal = dias * precio;
        const totalExtras = dias * extrasPorDia;

        diasEl.textContent = dias;
        subtotalEl.textContent = dinero(subtotal);
        extrasEl.textContent = dinero(totalExtras);
        totalEl.textContent = dinero(subtotal + totalExtras);
    }

    // Si la devolución queda antes de la recogida, la ajusta al día siguiente.
    inicio.addEventListener('change', () => {
        if (inicio.value && (!fin.value || new Date(fin.value) <= new Date(inicio.value))) {
            const d = new Date(inicio.value);
            d.setUTCDate(d.getUTCDate() + 1);
            fin.value = d.toISOString().slice(0, 10);
        }
        calcular();
    });

    fin.addEventListener('change', calcular);
    extras.forEach(c => c.addEventListener('change', calcular));
    calcular();
})();