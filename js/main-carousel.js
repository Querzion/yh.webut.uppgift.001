/* MOBILE */

document.addEventListener("DOMContentLoaded", function() {
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
});




/* TABLET & DESKTOP  */


/* Switch position of the text box depending on the picture clicked. */
/* document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 1; // Middle image is the default active one (index 1)

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

    function updateCarousel(carouselWrapper) {
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
    }

    function initializeCarousel(carouselWrapper) {
        const images = carouselWrapper.querySelectorAll('#c-slide-layer img');
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        let isDragging = false;
        let startX;
        let scrollLeft;

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
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
}); */




/* 1 > 2 < 3 */
/* document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 1; // Middle image is the default active one (index 1)

    const left2rightDistance = 100; // Adjustable movement distance for image 1 (in pixels)
    const right2leftDistance = 100; // Adjustable movement distance for image 3 (in pixels)

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
                img.style.transition = 'transform 0.5s ease';
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
            }, 500); // Duration of the animation
        }

        if (moveImages2) {
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease';
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
}); */


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




/* borked Set to position 0*/
/* document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 1; // Middle image is the default active one (index 1)

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

    function updateCarousel(carouselWrapper) {
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        const headingElement = carouselWrapper.querySelector('.carousel-heading');
        const textElement = carouselWrapper.querySelector('.carousel-text');
        const images = slideLayer.querySelectorAll('img');

        const currentContent = getViewportContent();
        if (!currentContent) return;

        // Update the text content based on the current index
        if (currentContent[currentIndex]) {
            headingElement.textContent = currentContent[currentIndex].heading;
            textElement.textContent = currentContent[currentIndex].text;
        }

        // Update the position of the images
        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.style.order = 1; // Middle
                img.style.transform = 'translateX(0)';
            } else if ((idx - currentIndex + 3) % 3 === 1) {
                img.style.order = 0; // Left
                img.style.transform = 'translateX(-0%)'; // Move left
            } else {
                img.style.order = 2; // Right
                img.style.transform = 'translateX(0%)'; // Move right
            }
        });
    }

    function initializeCarousel(carouselWrapper) {
        const images = carouselWrapper.querySelectorAll('#c-slide-layer img');
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        let isDragging = false;
        let startX;
        let scrollLeft;

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
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
}); */





/* document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 1; // Middle image is the default active one (index 1)
    const translatePercentage = 130; // Adjust the percentage for movement

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

    function updateCarousel(carouselWrapper) {
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');
        const headingElement = carouselWrapper.querySelector('.carousel-heading');
        const textElement = carouselWrapper.querySelector('.carousel-text');
        const images = slideLayer.querySelectorAll('img');

        const currentContent = getViewportContent();
        if (!currentContent) return;

        // Update the text content based on the current index
        if (currentContent[currentIndex]) {
            headingElement.textContent = currentContent[currentIndex].heading;
            textElement.textContent = currentContent[currentIndex].text;
        }

        // Update the position of the images
        updateImagePositions(images);
    }

    function updateImagePositions(images) {
        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.style.order = 1; // Middle
                img.style.transform = 'translateX(0)';
            } else if ((idx - currentIndex + 3) % 3 === 1) {
                img.style.order = 0; // Left
                img.style.transform = `translateX(-${translatePercentage}%)`; // Move left
            } else {
                img.style.order = 2; // Right
                img.style.transform = `translateX(${translatePercentage}%)`; // Move right
            }
        });
    }

    function initializeCarousel(carouselWrapper) {
        const images = carouselWrapper.querySelectorAll('#c-slide-layer img');
        const slideLayer = carouselWrapper.querySelector('#c-slide-layer');

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                if (index === 0 && currentIndex !== 0) {
                    currentIndex = 0;
                } else if (index === 2 && currentIndex !== 2) {
                    currentIndex = 2;
                } else {
                    currentIndex = 1; // Reset to middle
                }
                updateCarousel(carouselWrapper);
            });
        });

        updateCarousel(carouselWrapper); // Initialize positions
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
}); */

/* Autoscroll on (looks awful.) */
/* document.addEventListener("DOMContentLoaded", function () {
    const minIndex = -1;
    const maxIndex = 1;
    let currentIndex = 0;

    // Define content for mobile, tablet, and desktop
    const mobileContent = [
        { heading: "Mobile Heading 1", text: "Mobile Text 1" },
        { heading: "Mobile Heading 2", text: "Mobile Text 2" },
        { heading: "Mobile Heading 3", text: "Mobile Text 3" }
    ];

    const tabletContent = [
        { heading: "Tablet Heading for Left Image", text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora ipsam nam quas! Reiciendis, cum aliquid!" },
        { heading: "Step 3. Transfers to people from your contact list", text: "Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus." },
        { heading: "Tablet Heading for Right Image", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas praesentium consequatur aspernatur ipsam, eveniet veniam." }
    ];

    const desktopContent = [
        { heading: "Desktop Heading 1", text: "Desktop Text 1" },
        { heading: "Desktop Heading 2", text: "Desktop Text 2" },
        { heading: "Desktop Heading 3", text: "Desktop Text 3" }
    ];

    // Function to detect the viewport size and return content
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
    function updateCarousel(carouselWrapper) {
        const carouselGrid = carouselWrapper.querySelector('.carousel-grid');
        const slideLayer = carouselGrid.querySelector('#c-slide-layer');
        const headingElement = carouselWrapper.querySelector('.carousel-heading');
        const textElement = carouselWrapper.querySelector('.carousel-text');

        if (!slideLayer || !headingElement || !textElement) {
            console.error("Carousel elements are missing.");
            return;
        }

        const offset = currentIndex * -100; // Slide offset
        slideLayer.style.transform = `translateX(${offset}%)`;

        // Get the correct content for the current viewport
        const currentContent = getViewportContent();

        if (currentContent && currentContent[currentIndex + 1]) {
            headingElement.textContent = currentContent[currentIndex + 1].heading; // Adjust index
            textElement.textContent = currentContent[currentIndex + 1].text;
        } else {
            console.error("Content not found for the current index and viewport.");
        }
    }

    // Function to initialize carousels
    function initializeCarousel(carouselWrapper) {
        const carouselGrid = carouselWrapper.querySelector('.carousel-grid');
        const slideLayer = carouselGrid.querySelector('#c-slide-layer');
        const layers = carouselGrid.querySelectorAll('.c-layers');
        let isDragging = false;
        let startX;
        let scrollLeft;

        // Click functionality
        layers.forEach((layer, index) => {
            layer.addEventListener('click', () => {
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

        // Auto-switch functionality
        function startAutoSwitch() {
            setInterval(function () {
                currentIndex = (currentIndex + 1) > maxIndex ? minIndex : currentIndex + 1;
                updateCarousel(carouselWrapper);
            }, 5000);
        }

        startAutoSwitch();
    }

    // Initialize carousels for tablet and desktop views
    const tabletCarousels = document.querySelectorAll('.tablet-carousel .carousel-wrapper');
    const desktopCarousels = document.querySelectorAll('.desktop-carousel .carousel-wrapper');

    tabletCarousels.forEach(initializeCarousel);
    desktopCarousels.forEach(initializeCarousel);

    // Ensure carousel adjusts on window resize
    window.addEventListener('resize', function () {
        currentIndex = 0;  // Reset to first image on resize
        tabletCarousels.forEach(carousel => updateCarousel(carousel));
        desktopCarousels.forEach(carousel => updateCarousel(carousel));
    });
}); */