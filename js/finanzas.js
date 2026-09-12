/* =====================================================
   MENÚ MÓVIL
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {

        mobileMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (mobileMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const enlacesMenu =
        mobileMenu.querySelectorAll("a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

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

const elementosTimeline =
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


elementosTimeline.forEach(function (elemento) {

    observador.observe(elemento);

});


/* =====================================================
   IMÁGENES
===================================================== */

const imagenes =
    document.querySelectorAll(
        ".foto-timeline img, .galeria-item img"
    );


imagenes.forEach(function (imagen) {

    imagen.addEventListener("error", function () {

        imagen.style.display = "none";

    });

});