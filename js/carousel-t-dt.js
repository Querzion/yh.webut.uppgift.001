document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 1; // Middle image is the default active one (index 1)

    const left2rightDistance = 290; // Adjustable movement distance for image 1 (in pixels)
    const right2leftDistance = 290; // Adjustable movement distance for image 3 (in pixels)

    function getViewportContent() {
        const width = window.innerWidth;
        if (width <= 767) {
            return null; // Mobile view is handled separately
        } else if (width <= 1399) {
            return [
                { heading: "Tablet Heading for Left Image", text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora ipsam nam quas! Reiciendis, cum aliquid!" },
                { heading: "Step 3. Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus." },
                { heading: "Tablet Heading for Right Image", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas praesentium consequatur aspernatur ipsam, eveniet veniam." }
            ];
        } else {
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

        // Update the text content based on the current index
        if (currentContent[currentIndex]) {
            headingElement.textContent = currentContent[currentIndex].heading;
            textElement.textContent = currentContent[currentIndex].text;
        }

        // Update the position of the images
        const images = slideLayer.querySelectorAll('img');
        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.style.order = 1; // Middle
            } else if ((idx - currentIndex + 3) % 3 === 1) {
                img.style.order = 0; // Left
            } else {
                img.style.order = 2; // Right
            }
        });

        // Move images when specified
        if (moveImages1) {
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease'; // Smooth transition
                if (idx === 0) {
                    img.style.transform = `translateX(${left2rightDistance}px)`; // Move image 1 to the right
                }
                if (idx === 1) {
                    img.style.transform = `translateX(-${left2rightDistance}px)`; // Move image 2 to the left
                }
            });

            // Reset the transform after the animation
            setTimeout(() => {
                images.forEach(img => {
                    img.style.transform = 'translateX(0)';
                });
                currentIndex = 0; // Update the current index to image 1
                updateCarousel(carouselWrapper); // Update the carousel to reflect the new middle image
            }, 500); // Duration of the animation
        }

        if (moveImages2) {
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease'; // Smooth transition
                if (idx === 2) {
                    img.style.transform = `translateX(-${right2leftDistance}px)`; // Move image 3 to the left
                }
                if (idx === 1) {
                    img.style.transform = `translateX(${right2leftDistance}px)`; // Move image 2 to the right
                }
            });

            // Reset the transform after the animation
            setTimeout(() => {
                images.forEach(img => {
                    img.style.transform = 'translateX(0)';
                });
                currentIndex = 2; // Update the current index to image 3
                updateCarousel(carouselWrapper); // Update the carousel to reflect the new middle image
            }, 500); // Duration of the animation
        }
    }

    function initializeCarousel(carouselWrapper) {
        const images = carouselWrapper.querySelectorAll('#c-slide-layer img');
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        let isDragging = false;
        let startX;
        let scrollLeft;

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                if (index === 0) {
                    updateCarousel(carouselWrapper, true); // Trigger movement for image 1
                } else if (index === 2) {
                    updateCarousel(carouselWrapper, false, true); // Trigger movement for image 3
                }
                currentIndex = index;
                updateCarousel(carouselWrapper);
            });
        });

        // Drag functionality
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
            const walk = (x - startX) * 2; // scroll-fast
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });

        // Touch support for tablets
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
            const walk = (x - startX) * 2; // scroll-fast
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });

        updateCarousel(carouselWrapper);
    }

    // Initialize carousels for tablet and desktop views
    const tabletCarousels = document.querySelectorAll('.tablet-carousel .carousel-wrapper');
    const desktopCarousels = document.querySelectorAll('.desktop-carousel .carousel-wrapper');

    tabletCarousels.forEach(initializeCarousel);
    desktopCarousels.forEach(initializeCarousel);

    // Ensure carousel adjusts on window resize
    window.addEventListener('resize', function () {
        tabletCarousels.forEach(carousel => updateCarousel(carousel));
        desktopCarousels.forEach(carousel => updateCarousel(carousel));
    });
});