
document.addEventListener("DOMContentLoaded", function () {

    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    items.forEach(function (item, index) {

        item.style.transitionDelay = (index * 0.12) + "s";

        observer.observe(item);

    });

});