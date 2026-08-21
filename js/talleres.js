const carousel = document.getElementById("workshopsCarousel");

if (carousel) {
    const slides = Array.from(carousel.querySelectorAll(".workshops-slide"));
    const dotsContainer = carousel.querySelector(".workshops-carousel-dots");
    const previousButton = carousel.querySelector(".workshops-carousel-prev");
    const nextButton = carousel.querySelector(".workshops-carousel-next");
    let currentSlide = 0;
    let autoplay;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === currentSlide);
        });

        dotsContainer.querySelectorAll("button").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentSlide);
            dot.setAttribute("aria-selected", String(dotIndex === currentSlide));
        });
    };

    const restartAutoplay = () => {
        window.clearInterval(autoplay);
        autoplay = window.setInterval(() => showSlide(currentSlide + 1), 5500);
    };

    slides.forEach((slide, slideIndex) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Mostrar imagen ${slideIndex + 1}`);
        dot.addEventListener("click", () => {
            showSlide(slideIndex);
            restartAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        restartAutoplay();
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        restartAutoplay();
    });

    carousel.addEventListener("mouseenter", () => window.clearInterval(autoplay));
    carousel.addEventListener("mouseleave", restartAutoplay);

    showSlide(0);
    restartAutoplay();
}
