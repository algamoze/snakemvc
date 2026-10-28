(() => {
    'use strict';

    // Mostrar / ocultar contraseña.
    document.querySelectorAll('[data-toggle-password]').forEach(btn => {
        const input = document.querySelector(btn.dataset.togglePassword);
        if (!input) return;

        btn.addEventListener('click', () => {
            const mostrar = input.type === 'password';
            input.type = mostrar ? 'text' : 'password';
            btn.textContent = mostrar ? 'Ocultar' : 'Mostrar';
        });
    });

    // Indicador de seguridad (solo existe en el registro).
    const pass = document.getElementById('Password');
    const medidor = document.getElementById('strength');
    if (!pass || !medidor) return;

    const etiqueta = document.getElementById('strength-label');
    const pista = etiqueta.textContent;
    const textos = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];

    pass.addEventListener('input', () => {
        const v = pass.value;

        if (!v) {
            medidor.dataset.nivel = '0';
            etiqueta.textContent = pista;
            return;
        }

        let puntos = 0;
        if (v.length >= 8) puntos++;
        if (/[a-z]/.test(v) && /[A-Z]/.test(v)) puntos++;
        if (/\d/.test(v)) puntos++;
        if (/[^A-Za-z0-9]/.test(v)) puntos++;

        const nivel = v.length < 8 ? 1 : Math.max(1, puntos);
        medidor.dataset.nivel = String(nivel);
        etiqueta.textContent = v.length < 8 ? 'Débil: faltan caracteres' : textos[nivel];
    });
})();