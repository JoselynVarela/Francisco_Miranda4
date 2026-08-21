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
    hero.style.setProperty("--hero-image", "url('../img/Portada/Foto de portada.jpg')");
}

document.querySelectorAll(".gallery-slider").forEach(slider => {
    const slides = Array.from(slider.querySelectorAll(".gallery-slide"));
    const nextBtn = slider.querySelector(".gallery-btn.next");
    const prevBtn = slider.querySelector(".gallery-btn.prev");
    const indicators = slider.querySelector(".gallery-indicators");
    const caption = slider.querySelector(".gallery-caption");
    let currentSlide = 0;
    let autoplay;

    if (!slides.length) return;

    const showSlide = index => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === currentSlide);
        });

        if (indicators) {
            indicators.querySelectorAll(".gallery-indicator").forEach((indicator, indicatorIndex) => {
                indicator.classList.toggle("active", indicatorIndex === currentSlide);
                indicator.setAttribute("aria-current", indicatorIndex === currentSlide ? "true" : "false");
            });
        }

        if (caption) {
            const image = slides[currentSlide].querySelector("img");
            caption.textContent = image ? image.alt : "Galería institucional";
        }
    };

    if (indicators) {
        slides.forEach((slide, index) => {
            const indicator = document.createElement("button");
            indicator.type = "button";
            indicator.className = "gallery-indicator";
            indicator.setAttribute("aria-label", `Ver imagen ${index + 1}`);
            indicator.addEventListener("click", () => showSlide(index));
            indicators.appendChild(indicator);
        });
    }

    showSlide(0);

    nextBtn?.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn?.addEventListener("click", () => showSlide(currentSlide - 1));

    let touchStartX = 0;
    slider.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", event => {
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 45) showSlide(currentSlide + (distance < 0 ? 1 : -1));
    }, { passive: true });

    const startAutoplay = () => {
        autoplay = setInterval(() => showSlide(currentSlide + 1), 4500);
    };

    slider.addEventListener("mouseenter", () => clearInterval(autoplay));
    slider.addEventListener("mouseleave", startAutoplay);
    startAutoplay();
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
