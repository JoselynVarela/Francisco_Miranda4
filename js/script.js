/* MENÃš MÃ“VIL */

const decodeMojibake = value => {
    const replacements = {
        "\u00c3\u00a1": "\u00e1",
        "\u00c3\u00a9": "\u00e9",
        "\u00c3\u00ad": "\u00ed",
        "\u00c3\u00b3": "\u00f3",
        "\u00c3\u00ba": "\u00fa",
        "\u00c3\u00b1": "\u00f1",
        "\u00c3\u0091": "\u00d1",
        "\u00c3\u0093": "\u00d3",
        "\u00c2\u00bf": "\u00bf",
        "\u00c2\u00a1": "\u00a1",
        "\u00c2\u00ba": "\u00ba",
        "\u00c3\u00bc": "\u00fc"
    };

    return Object.entries(replacements).reduce(
        (text, [broken, fixed]) => text.replaceAll(broken, fixed),
        value
    );
};

document.title = decodeMojibake(document.title);
document.querySelectorAll("body *").forEach(element => {
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = decodeMojibake(node.nodeValue);
    });

    ["alt", "aria-label", "title"].forEach(attribute => {
        if (element.hasAttribute(attribute)) {
            element.setAttribute(attribute, decodeMojibake(element.getAttribute(attribute)));
        }
    });
});

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


/* CONTADORES */

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


/* ACTIVAR CONTADORES AL APARECER */

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


/* ANIMACIONES AL HACER SCROLL */

const animatedElements = document.querySelectorAll(
    ".career-card, .service-card, .identity-card, .staff-card, .stat-card"
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
        slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));

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
        clearInterval(autoplay);
        autoplay = setInterval(() => showSlide(currentSlide + 1), 4500);
    };

    slider.addEventListener("mouseenter", () => clearInterval(autoplay));
    slider.addEventListener("mouseleave", startAutoplay);
    startAutoplay();
});

const bandModal = document.getElementById("bandModal");
const bandTrigger = document.querySelector(".band-trigger");
const bandClose = document.querySelector(".band-modal-close");

if (bandModal && bandTrigger) {
    const toggleModal = () => {
        bandModal.classList.toggle("active");
        bandModal.setAttribute("aria-hidden", String(!bandModal.classList.contains("active")));
    };

    bandTrigger.addEventListener("click", toggleModal);
    bandClose?.addEventListener("click", toggleModal);
    bandModal.addEventListener("click", event => {
        if (event.target === bandModal) toggleModal();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && bandModal.classList.contains("active")) toggleModal();
    });
}


/* GALERÍA DE EVENTOS DE BANDA LATINA*/

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
        lightboxImage.style.transform = "none";
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
        lightboxImage.style.transform = "rotate(90deg)";
        lightboxImage.style.imageOrientation = "none";
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

const sportsModal = document.getElementById("sportsModal");
const sportsTrigger = document.querySelector(".service-sports .service-trigger");
const sportsClose = document.querySelector(".sports-modal-close");

if (sportsModal && sportsTrigger) {
    const setSportsModal = isOpen => {
        sportsModal.classList.toggle("active", isOpen);
        sportsModal.setAttribute("aria-hidden", String(!isOpen));
        sportsTrigger.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
        if (isOpen) sportsClose?.focus();
    };

    sportsTrigger.addEventListener("click", () => setSportsModal(true));
    sportsClose?.addEventListener("click", () => setSportsModal(false));
    sportsModal.addEventListener("click", event => {
        if (event.target === sportsModal) setSportsModal(false);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && sportsModal.classList.contains("active")) setSportsModal(false);
    });
}
