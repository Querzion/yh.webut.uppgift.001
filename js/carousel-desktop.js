document.addEventListener("DOMContentLoaded", function() {
    const slideLayer = document.querySelector('#c-slide-layer');
    const headingElement = document.querySelector('.carousel-heading');
    const textElement = document.querySelector('.carousel-text');

    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 0;

    const desktopContent = [
        { heading: "Desktop Heading for Left Image", text: "Desktop Text for Left Image" },
        { heading: "Desktop Heading for Middle Image", text: "Desktop Text for Middle Image" },
        { heading: "Desktop Heading for Right Image", text: "Desktop Text for Right Image" }
    ];

    function updateCarousel() {
        const offset = currentIndex * -100;
        slideLayer.style.transform = `translateX(${offset}%)`;

        headingElement.textContent = desktopContent[currentIndex + 1].heading;
        textElement.textContent = desktopContent[currentIndex + 1].text;
    }

    let autoSwitchInterval;
    function startAutoSwitch() {
        autoSwitchInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            updateCarousel();
        }, 3000);
    }

    function stopAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
        }
    }

    updateCarousel();
    startAutoSwitch();

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    slideLayer.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        stopAutoSwitch();
    });

    slideLayer.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
        const diffX = Math.abs(startX - endX);
        const diffY = Math.abs(startY - endY);
        if (diffX > diffY) {
            event.preventDefault();
        }
    });

    slideLayer.addEventListener('touchend', function() {
        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            } else if (diffX < -50) {
                currentIndex = (currentIndex - 1) < minIndex ? maxIndex : currentIndex - 1;
            }

            updateCarousel();
            startAutoSwitch();
        }
    });

    window.addEventListener('resize', updateCarousel);
});
