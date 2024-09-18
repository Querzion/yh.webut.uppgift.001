let boomerangTime = true; // Initially set to true

// Function to toggle the boomerang time
function toggleBoomerangTime() {
    if (boomerangTime) {
        boomerangTime = false; // Change to false
        return 5000;           // Return 5000 when true
    } else {
        boomerangTime = true;  // Change to true
        return 0;              // Return 0 when false
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1; 
    const maxIndex = 1;
    let currentIndex = 1; // The middle image (index 1) is the default active image

    function getImageDistance() {
        const viewWidth = window.innerWidth; // Get the current width of the window

        if (viewWidth <= 1399) {
            // Tablet Image - Distance/Gap
            return [285, 285]; // Return both distances as an array
        } else {
            // Desktop Image - Distance/Gap
            return [425, 425]; // Return both distances as an array
        }
    }
    
    function getViewportContent() {
        const width = window.innerWidth; // Get the width of the viewport

        if (width <= 767) {
            return null; // For mobile view, content is handled separately
        } else if (width <= 1399) {
            // Tablet content
            return [
                { heading: "Tablet Heading for Left Image", text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
                { heading: "Step 3. Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices." },
                { heading: "Tablet Heading for Right Image", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." }
            ];
        } else {
            // Desktop content
            return [
                { heading: "Desktop Heading 1", text: "Desktop Text 1" },
                { heading: "Desktop Heading 2", text: "Desktop Text 2" },
                { heading: "Desktop Heading 3", text: "Desktop Text 3" }
            ];
        }
    }

    function updateCarousel(carouselWrapper, moveImages1 = false, moveImages2 = false) {
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        const headingElement = carouselWrapper.querySelector('.carousel-heading');
        const textElement = carouselWrapper.querySelector('.carousel-text');

        const currentContent = getViewportContent();
        if (!currentContent) return;

        if (currentContent[currentIndex]) {
            headingElement.textContent = currentContent[currentIndex].heading;
            textElement.textContent = currentContent[currentIndex].text;
        }

        const images = slideLayer.querySelectorAll('img');
        const [left2rightDistance, right2leftDistance] = getImageDistance(); // Get distances dynamically

        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.style.order = 1; // Middle image
            } else if ((idx - currentIndex + 3) % 3 === 1) {
                img.style.order = 0; // Left image
            } else {
                img.style.order = 2; // Right image
            }
        });

        // Move images to the right (left to right)
        if (moveImages1) {
            const delay = toggleBoomerangTime(); // Use the boolean to get the delay (5000ms or 0ms)
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease';
                if (idx === 0) {
                    img.style.transform = `translateX(${left2rightDistance}px)`; // Move image 1 to the right
                }
                if (idx === 1) {
                    img.style.transform = `translateX(-${left2rightDistance}px)`; // Move image 2 to the left
                }
            });

            setTimeout(() => {
                images.forEach(img => img.style.transform = 'translateX(0)');
                currentIndex = 0; // Set image 1 as the middle
                updateCarousel(carouselWrapper);
            }, delay); // Use delay from toggleBoomerangTime
        }

        // Move images to the left (right to left)
        if (moveImages2) {
            const delay = toggleBoomerangTime(); // Use the boolean to get the delay (5000ms or 0ms)
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease';
                if (idx === 2) {
                    img.style.transform = `translateX(-${right2leftDistance}px)`; // Move image 3 to the left
                }
                if (idx === 1) {
                    img.style.transform = `translateX(${right2leftDistance}px)`; // Move image 2 to the right
                }
            });

            setTimeout(() => {
                images.forEach(img => img.style.transform = 'translateX(0)');
                currentIndex = 2; // Set image 3 as the middle
                updateCarousel(carouselWrapper);
            }, delay); // Use delay from toggleBoomerangTime
        }
    }

    function initializeCarousel(carouselWrapper) {
        const images = carouselWrapper.querySelectorAll('#c-slide-layer img');
        let isDragging = false;
        let startX;
        let scrollLeft;

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                if (index === 0) {
                    updateCarousel(carouselWrapper, true); // Move images left to right
                } else if (index === 2) {
                    updateCarousel(carouselWrapper, false, true); // Move images right to left
                } else if (index === 1) {
                    currentIndex = 1; // Set image 2 as the middle
                    updateCarousel(carouselWrapper);
                }
            });
        });

        carouselWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        carouselWrapper.addEventListener('mouseup', () => {
            isDragging = false;
        });

        carouselWrapper.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carouselWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });

        carouselWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
        });

        carouselWrapper.addEventListener('touchend', () => {
            isDragging = false;
        });

        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });

        updateCarousel(carouselWrapper); // Initial update of the carousel
    }

    const tabletCarousels = document.querySelectorAll('.tablet-carousel .carousel-wrapper');
    const desktopCarousels = document.querySelectorAll('.desktop-carousel .carousel-wrapper');

    tabletCarousels.forEach(initializeCarousel);
    desktopCarousels.forEach(initializeCarousel);

    window.addEventListener('resize', function () {
        tabletCarousels.forEach(carousel => updateCarousel(carousel));
        desktopCarousels.forEach(carousel => updateCarousel(carousel));
    });
});





































