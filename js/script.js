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

/* =========================================
   PORTADA Y GALERÍA
========================================= */

const hero = document.querySelector(".hero");

if (hero) {
    hero.style.backgroundImage = "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 42%, rgba(255,255,255,0.15) 100%), url('img/Portada/Foto de portada.jpg')";
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
}

document.querySelectorAll(".gallery-slider").forEach(gallerySlider => {
    const gallerySlides = Array.from(gallerySlider.querySelectorAll(".gallery-slide"));
    const nextBtn = gallerySlider.querySelector(".gallery-btn.next");
    const prevBtn = gallerySlider.querySelector(".gallery-btn.prev");
    let currentSlide = 0;

    function showSlide(index) {
        if (!gallerySlides.length) return;

        currentSlide = (index + gallerySlides.length) % gallerySlides.length;

        gallerySlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });
    }

    showSlide(0);

    if (nextBtn) {
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    }

    if (gallerySlides.length) {
        setInterval(() => showSlide(currentSlide + 1), 4500);
    }
});

/* =========================================
   MODAL BANDA LATINA
========================================= */

const bandModal = document.getElementById("bandModal");
const bandTrigger = document.querySelector(".band-trigger");
const bandClose = document.querySelector(".band-modal-close");

if (bandModal && bandTrigger) {
    const toggleModal = () => {
        bandModal.classList.toggle("active");
        bandModal.setAttribute("aria-hidden", String(!bandModal.classList.contains("active")));
    };

    bandTrigger.addEventListener("click", toggleModal);

    if (bandClose) {
        bandClose.addEventListener("click", toggleModal);
    }

    bandModal.addEventListener("click", (event) => {
        if (event.target === bandModal) {
            toggleModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && bandModal.classList.contains("active")) {
            toggleModal();
        }
    });
}
