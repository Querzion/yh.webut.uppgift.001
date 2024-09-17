document.addEventListener("DOMContentLoaded", function() {
    const slideLayer = document.querySelector('#c-slide-layer');
    const headingElement = document.querySelector('.carousel-heading');
    const textElement = document.querySelector('.carousel-text');

    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 0;

    const mobileContent = [
        { heading: "Latest transaction history", text: "Enim, et amet praesent pharetra. Mi non ante hendrerit amet sed. Arcu sociis tristique quisque hac in consectetur condimentum." },
        { heading: "Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus." },
        { heading: "Transfer money to people", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi ipsum cumque illum veritatis. Doloribus!" }
    ];

    function updateCarousel() {
        const offset = currentIndex * -100;
        slideLayer.style.transform = `translateX(${offset}%)`;

        headingElement.textContent = mobileContent[currentIndex + 1].heading;
        textElement.textContent = mobileContent[currentIndex + 1].text;
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

/* document.addEventListener("DOMContentLoaded", function() {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 0;

    // Define content for mobile, tablet, and desktop
    const mobileContent = [
        { heading: "Latest transaction history", text: "Enim, et amet praesent pharetra. Mi non ante hendrerit amet sed. Arcu sociis tristique quisque hac in consectetur condimentum." },
        { heading: "Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus." },
        { heading: "Transfer money to people", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi ipsum cumque illum veritatis. Doloribus!" }
    ];

    const tabletContent = [
        { heading: "Tablet Heading for Left Image", text: "Tablet Text for Left Image" },
        { heading: "Step 3. Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus." },
        { heading: "Tablet Heading for Right Image", text: "Tablet Text for Right Image" }
    ];

    const desktopContent = [
        { heading: "Desktop Heading 1", text: "Desktop Text 1" },
        { heading: "Desktop Heading 2", text: "Desktop Text 2" },
        { heading: "Desktop Heading 3", text: "Desktop Text 3" }
    ];

    // Function to detect the viewport size
    function getViewportContent() {
        const width = window.innerWidth;
        if (width <= 767) {
            return mobileContent;  // Mobile view
        } else if (width <= 1399) {
            return tabletContent;  // Tablet view
        } else {
            return desktopContent; // Desktop view
        }
    }

    // Function to update the carousel
    function updateCarousel() {
        const slideLayer = document.querySelector('#c-slide-layer');
        const headingElement = document.querySelector('.carousel-heading');
        const textElement = document.querySelector('.carousel-text');

        const offset = currentIndex * -100; // Slide offset
        slideLayer.style.transform = `translateX(${offset}%)`;

        // Get the correct content for the current viewport
        const currentContent = getViewportContent();
        headingElement.textContent = currentContent[currentIndex + 1].heading; // Adjust index
        textElement.textContent = currentContent[currentIndex + 1].text;
    }

    // Auto-switch functionality
    function startAutoSwitch() {
        setInterval(function() {
            currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            updateCarousel();
        }, 5000);
    }

    // Initialize the carousel
    updateCarousel();
    startAutoSwitch();

    // Swipe functionality for mobile and tablet
    let startX = 0;
    let endX = 0;

    const slideLayer = document.querySelector('#c-slide-layer');
    slideLayer.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    slideLayer.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX;
    });

    slideLayer.addEventListener('touchend', function() {
        const diffX = startX - endX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) { // Swipe left
                currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            } else { // Swipe right
                currentIndex = (currentIndex - 1) < minIndex ? maxIndex : currentIndex - 1;
            }
            updateCarousel();
        }
    });

    // Ensure carousel adjusts on window resize
    window.addEventListener('resize', updateCarousel);
}); */