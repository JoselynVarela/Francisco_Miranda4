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

const gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const nextBtn = document.querySelector(".gallery-btn.next");
const prevBtn = document.querySelector(".gallery-btn.prev");
let currentSlide = 0;

function showSlide(index) {
    if (!gallerySlides.length) return;

    currentSlide = (index + gallerySlides.length) % gallerySlides.length;

    gallerySlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });
}

if (gallerySlides.length) {
    showSlide(0);

    if (nextBtn) {
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    }

    setInterval(() => showSlide(currentSlide + 1), 4500);
}

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

/* =========================================
   GALERÍA DE EVENTOS DE BANDA LATINA
========================================= */

function initBandEventsGallery() {
    const gallery = document.getElementById("band-events-gallery");
    if (!gallery) return;

    const tabs = Array.from(gallery.querySelectorAll(".band-gallery-tab"));
    const eventSections = Array.from(gallery.querySelectorAll(".band-gallery-event"));
    const galleryItems = Array.from(gallery.querySelectorAll(".band-gallery-item"));
    const lightbox = gallery.querySelector("#band-lightbox");
    const lightboxImage = gallery.querySelector("#band-lightbox-image");
    const lightboxCaption = gallery.querySelector("#band-lightbox-caption");
    const closeButton = gallery.querySelector(".band-lightbox-close");

    gallery.querySelectorAll("[data-carousel]").forEach((carousel) => {
        carousel.querySelectorAll(".band-carousel-slide").forEach((slide) => slide.classList.remove("hidden"));
    });

    const setFilter = (filter) => {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.filter === filter;
            tab.setAttribute("aria-selected", String(isActive));
            tab.classList.toggle("bg-[#8f1735]", isActive);
            tab.classList.toggle("text-white", isActive);
            tab.classList.toggle("bg-white", !isActive);
            tab.classList.toggle("text-[#641027]", !isActive);
        });

        eventSections.forEach((section) => {
            section.hidden = filter !== "todos" && section.dataset.event !== filter;
        });
    };

    const closeLightbox = () => {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");
    };

    tabs.forEach((tab) => tab.addEventListener("click", () => setFilter(tab.dataset.filter)));

    galleryItems.forEach((item) => item.addEventListener("click", () => {
        const image = item.querySelector("img");
        lightboxImage.src = item.dataset.image || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = item.dataset.caption || image.alt;
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");
        closeButton.focus();
    }));

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
    });

    setFilter("todos");
}

initBandEventsGallery();
