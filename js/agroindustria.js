document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuToggle && mobileMenu) {


        menuToggle.addEventListener("click", function () {

            mobileMenu.classList.toggle("active");


            const icon =
                menuToggle.querySelector("i");


            if (mobileMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });


        /* Cerrar menú al seleccionar */

        document
            .querySelectorAll(".mobile-menu a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    mobileMenu.classList.remove("active");


                    const icon =
                        menuToggle.querySelector("i");


                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                });

            });

    }



    /* =====================================================
       ANIMACIÓN DE LA LÍNEA DEL TIEMPO
    ===================================================== */

    const elementos =
        document.querySelectorAll(".timeline-item");


    const observador =
        new IntersectionObserver(

            function (entradas) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("mostrar");

                        observador.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    elementos.forEach(function (elemento, indice) {

        elemento.style.transitionDelay =
            `${indice * 0.10}s`;

        observador.observe(elemento);

    });


});