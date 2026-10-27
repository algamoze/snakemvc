(() => {
    'use strict';

    const money = value => new Intl.NumberFormat('es-MX', {
        style: 'currency', currency: 'MXN', maximumFractionDigits: 0
    }).format(value);

    // Catálogo y cálculo del estimado de renta.
    const rentalList = document.getElementById('lista-rentas');
    if (rentalList) {
        const selectedCars = new Map();
        const daysInput = document.getElementById('dias');
        const totalElement = document.getElementById('total');
        const subtotalElement = document.getElementById('subtotal-dia');
        const quantityElement = document.getElementById('cantidad-autos');
        const messageElement = document.getElementById('mensaje-renta');
        const clientForm = document.getElementById('form-cliente');
        const resultElement = document.getElementById('resultado');

        const calculate = () => {
            const days = Math.min(90, Math.max(1, Number.parseInt(daysInput.value, 10) || 1));
            daysInput.value = days;
            const dailyTotal = [...selectedCars.values()].reduce((sum, car) => sum + car.price, 0);
            quantityElement.textContent = String(selectedCars.size);
            subtotalElement.textContent = money(dailyTotal);
            totalElement.textContent = money(dailyTotal * days);

            if (selectedCars.size === 0) {
                rentalList.innerHTML = '<p class="empty-state">Todavía no has seleccionado ningún vehículo.</p>';
                return;
            }

            rentalList.replaceChildren();
            selectedCars.forEach((car, name) => {
                const row = document.createElement('div');
                row.className = 'rental-item';
                const info = document.createElement('div');
                const title = document.createElement('strong');
                title.textContent = name;
                const price = document.createElement('span');
                price.textContent = `${money(car.price)} por día`;
                info.append(title, price);
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'btn-remove-car';
                remove.textContent = 'Quitar';
                remove.setAttribute('aria-label', `Quitar ${name}`);
                remove.addEventListener('click', () => {
                    selectedCars.delete(name);
                    calculate();
                });
                row.append(info, remove);
                rentalList.append(row);
            });
        };

        document.querySelectorAll('.btn-select-car').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.dataset.nombre;
                const price = Number(button.dataset.precio);
                if (!name || !Number.isFinite(price) || price <= 0) return;
                if (selectedCars.has(name)) {
                    messageElement.textContent = `${name} ya está en tu selección.`;
                } else {
                    selectedCars.set(name, { price });
                    messageElement.textContent = `${name} se agregó a tu selección.`;
                    calculate();
                }
                document.getElementById('renta').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        daysInput.addEventListener('input', calculate);
        document.getElementById('btn-confirmar-renta').addEventListener('click', () => {
            if (selectedCars.size === 0) {
                messageElement.textContent = 'Selecciona al menos un vehículo antes de continuar.';
                return;
            }
            clientForm.hidden = false;
            clientForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            messageElement.textContent = '';
        });

        clientForm.addEventListener('submit', event => {
            event.preventDefault();
            if (!clientForm.reportValidity() || selectedCars.size === 0) return;
            const data = new FormData(clientForm);
            const name = String(data.get('nombre') || '').trim();
            const email = String(data.get('correo') || '').trim();
            const phone = String(data.get('telefono') || '').trim();
            const license = String(data.get('licencia') || '').trim();
            if (!name || !email || !phone || !license) {
                resultElement.textContent = 'Completa todos los campos para preparar el resumen.';
                return;
            }
            const carNames = [...selectedCars.keys()].join(', ');
            resultElement.textContent = `Resumen preparado para ${name}. Vehículo(s): ${carNames}. Duración: ${daysInput.value} día(s). Total estimado: ${totalElement.textContent}. Esta demostración no envía ni guarda tus datos.`;
        });

        calculate();
    }

    // Comentarios: se usan textContent para mostrar texto del usuario de forma segura.
    const commentsForm = document.getElementById('form-comentario');
    if (commentsForm) {
        const commentsList = document.getElementById('listaComentarios');
        const counter = document.getElementById('contador-comentarios');
        let commentCount = 0;

        commentsForm.addEventListener('submit', event => {
            event.preventDefault();
            const nameInput = document.getElementById('nombre');
            const commentInput = document.getElementById('comentario');
            const name = nameInput.value.trim();
            const comment = commentInput.value.trim();
            if (!name || !comment) {
                commentsForm.reportValidity();
                return;
            }

            if (commentCount === 0) commentsList.replaceChildren();
            const card = document.createElement('article');
            card.className = 'comment-card';
            const avatar = document.createElement('span');
            avatar.className = 'comment-avatar';
            avatar.textContent = name.charAt(0).toLocaleUpperCase('es-MX');
            const body = document.createElement('div');
            body.className = 'comment-body';
            const author = document.createElement('h3');
            author.textContent = name;
            const text = document.createElement('p');
            text.textContent = comment;
            const date = document.createElement('span');
            date.className = 'comment-date';
            date.textContent = 'Publicado ahora';
            body.append(author, text, date);
            card.append(avatar, body);
            commentsList.prepend(card);
            commentCount += 1;
            counter.textContent = `${commentCount} ${commentCount === 1 ? 'comentario' : 'comentarios'}`;
            commentsForm.reset();
        });
    }
})();
