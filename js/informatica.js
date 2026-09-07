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

    const timelineItems =
        document.querySelectorAll(".timeline-item");


    const timelineObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        timelineObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    timelineItems.forEach(
        function (item, index) {

            item.style.transitionDelay =
                (index * 0.10) + "s";

            timelineObserver.observe(item);

        }
    );


    /* =====================================================
       ANIMACIÓN DE LA GALERÍA
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    const galleryObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "gallery-visible"
                        );

                        galleryObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    galleryItems.forEach(
        function (item, index) {

            item.style.transitionDelay =
                (index * 0.10) + "s";

            galleryObserver.observe(item);

        }
    );


});