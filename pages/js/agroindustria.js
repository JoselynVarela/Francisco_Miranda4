/* =========================================
ANIMACIÓN DE LA LÍNEA DEL TIEMPO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

const elementos = document.querySelectorAll(".timeline-item");

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("mostrar");

                observador.unobserve(entrada.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementos.forEach((elemento, indice) => {

    elemento.style.transitionDelay = `${indice * 0.08}s`;

    observador.observe(elemento);

});

});