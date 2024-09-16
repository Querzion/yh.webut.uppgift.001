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


/* OLD 'WORKING' SCRIPT */

/* document.addEventListener("DOMContentLoaded", function() {
    const slideLayer = document.querySelector('#c-slide-layer');
    const headingElement = document.querySelector('.carousel-heading');
    const textElement = document.querySelector('.carousel-text');

    const minIndex = -1; // Index for the left image (image-1)
    const maxIndex = 1;  // Index for the right image (image-3)
    let currentIndex = 0; // Start at the middle image (index 0)

    // Content for each image based on viewport size
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
        { heading: "Desktop Heading for Left Image", text: "Desktop Text for Left Image" },
        { heading: "Desktop Heading for Middle Image", text: "Desktop Text for Middle Image" },
        { heading: "Desktop Heading for Right Image", text: "Desktop Text for Right Image" }
    ];

    // Function to detect the current viewport size
    function getCurrentContentSet() {
        const width = window.innerWidth;
        console.log("Viewport width:", width); // Debugging
        if (width <= 768) {
            return mobileContent; // Mobile view
        } else if (width <= 1400) {
            return tabletContent; // Tablet view
        } else {
            return desktopContent; // Desktop view
        }
    }

    // Function to update the carousel and text based on the current image
    function updateCarousel() {
        const offset = currentIndex * -100; // Shift the slide by 100% per image
        slideLayer.style.transform = `translateX(${offset}%)`;

        // Get the correct content set based on screen size and update heading and text
        const currentContentSet = getCurrentContentSet();
        headingElement.textContent = currentContentSet[currentIndex + 1].heading; // Adjust index for array
        textElement.textContent = currentContentSet[currentIndex + 1].text;
    }

    // Automatic image switch every 3 seconds
    let autoSwitchInterval;
    function startAutoSwitch() {
        autoSwitchInterval = setInterval(function() {
            // Update the index with circular logic
            currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            updateCarousel();
        }, 3000); // Adjust the interval as needed
    }

    // Function to stop automatic switching when user interacts
    function stopAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
        }
    }

    // Initialize the carousel and start automatic switching
    updateCarousel();
    startAutoSwitch();

    // Track touch movement for swipe functionality
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    // Swipe event listeners for touch devices
    slideLayer.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY; // Track vertical start position
        stopAutoSwitch(); // Stop auto-switch when user starts swiping
    });

    slideLayer.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY; // Track vertical move position

        // Calculate horizontal and vertical differences
        const diffX = Math.abs(startX - endX);
        const diffY = Math.abs(startY - endY);

        // Only prevent default behavior (which blocks vertical scrolling) if horizontal movement is larger
        if (diffX > diffY) {
            event.preventDefault(); // Prevent vertical scrolling during horizontal swipe
        }
    });

    slideLayer.addEventListener('touchend', function() {
        const diffX = startX - endX;
        const diffY = startY - endY;

        // If the horizontal movement was larger than vertical movement, consider it a swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Swipe left (move to the next image)
            if (diffX > 50) {
                currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
            }
            // Swipe right (move to the previous image)
            else if (diffX < -50) {
                currentIndex = (currentIndex - 1) < minIndex ? maxIndex : currentIndex - 1;
            }

            updateCarousel(); // Update the carousel to the new image position
            startAutoSwitch(); // Restart auto-switch after user interaction
        }
    });

    // Update text on window resize (in case the screen size changes)
    window.addEventListener('resize', updateCarousel);
}); */