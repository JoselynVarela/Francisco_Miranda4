/* =========================================
   MENÚ MÓVIL
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
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


    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================
   CONTADORES
========================================= */

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 40));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {
                counter.textContent = target;
                return;
            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

    });

};


/* =========================================
   ACTIVAR CONTADORES AL APARECER
========================================= */

const statsSection = document.querySelector(".stats-section");

if (statsSection) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    observer.observe(statsSection);
}


/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const animatedElements = document.querySelectorAll(
    ".career-card, .service-card, .staff-card, .stat-card"
);

const animationObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                animationObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    element.classList.add("scroll-hidden");

    animationObserver.observe(element);

});