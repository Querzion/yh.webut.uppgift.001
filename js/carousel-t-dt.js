/* KIND OF WORKING - THERE ARE SOME KINKS IN IT THAT MAKES IT A DISASTER. */

/* let boomerangTime = true; // Initially set to true

// Function to toggle the boomerang time
function toggleBoomerangTime() {
    if (boomerangTime) {
        boomerangTime = false; // Change to false
        return 5000;           // Return 10000 when true
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
            return 285; // Return distance for tablet
        } else {
            // Desktop Image - Distance/Gap
            return 425; // Return distance for desktop
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

    function updateCarousel(carouselWrapper, moveImages1 = false, moveImages2 = false, moveMiddle = false) {
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
        const imageDistance = getImageDistance(); // Get distance dynamically

        images.forEach((img, idx) => {
            if (idx === currentIndex) {
                img.style.order = 1; // Middle image
            } else if ((idx - currentIndex + 3) % 3 === 1) {
                img.style.order = 0; // Left image
            } else {
                img.style.order = 2; // Right image
            }
        });

        // Handle movement for the middle image (if it's clicked but not in the middle)
        if (moveMiddle) {
            const delay = toggleBoomerangTime(); // Use the boolean to get the delay (5000ms or 0ms)

            if (currentIndex === 0) {
                images[0].style.transition = 'transform 0.5s ease';
                images[0].style.transform = `translateX(${imageDistance}px)`; // Move from left to middle
            } else if (currentIndex === 2) {
                images[2].style.transition = 'transform 0.5s ease';
                images[2].style.transform = `translateX(-${imageDistance}px)`; // Move from right to middle
            }

            setTimeout(() => {
                images.forEach(img => img.style.transform = 'translateX(0)');
                currentIndex = 1; // Set image 2 (middle) as the middle
                updateCarousel(carouselWrapper);
            }, delay);
        }

        // Move images to the right (left to right)
        if (moveImages1) {
            const delay = toggleBoomerangTime(); // Use the boolean to get the delay (5000ms or 0ms)
            images.forEach((img, idx) => {
                img.style.transition = 'transform 0.5s ease';
                if (idx === 0) {
                    img.style.transform = `translateX(${imageDistance}px)`; // Move image 1 to the right
                }
                if (idx === 1) {
                    img.style.transform = `translateX(-${imageDistance}px)`; // Move image 2 to the left
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
                    img.style.transform = `translateX(-${imageDistance}px)`; // Move image 3 to the left
                }
                if (idx === 1) {
                    img.style.transform = `translateX(${imageDistance}px)`; // Move image 2 to the right
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
                    updateCarousel(carouselWrapper, false, false, true); // Move middle image using boomerang
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
}); */


















/* // Get elements for the carousel images and text
const tabletImages = document.querySelectorAll('.tablet-carousel .inner-layers');
const desktopImages = document.querySelectorAll('.desktop-carousel .inner-layers');
const tabletHeadlines = ['Tablet Headline 1', 'Tablet Headline 2', 'Tablet Headline 3'];
const tabletTexts = ['Tablet Text 1', 'Tablet Text 2', 'Tablet Text 3'];
const desktopHeadlines = ['Desktop Headline 1', 'Desktop Headline 2', 'Desktop Headline 3'];
const desktopTexts = ['Desktop Text 1', 'Desktop Text 2', 'Desktop Text 3'];
const tabletHeadingElement = document.querySelector('.tablet-carousel .carousel-heading');
const tabletTextElement = document.querySelector('.tablet-carousel .carousel-text');
const desktopHeadingElement = document.querySelector('.desktop-carousel .carousel-heading');
const desktopTextElement = document.querySelector('.desktop-carousel .carousel-text');

// Define order for images (left: 0, middle: 1, right: 2)
const leftOrder = 0, middleOrder = 1, rightOrder = 2;

// Function to get image distance (tablet or desktop)
function getImageTravelDistance() {
    const viewWidth = window.innerWidth;
    return viewWidth <= 1399 ? 285 : 425; // 285 for tablet, 425 for desktop
}

// Function to update the text content based on the center image (position 2)
function updateTextContent(view, currentIndex) {
    if (view === 'tablet') {
        tabletHeadingElement.textContent = tabletHeadlines[currentIndex];
        tabletTextElement.textContent = tabletTexts[currentIndex];
    } else if (view === 'desktop') {
        desktopHeadingElement.textContent = desktopHeadlines[currentIndex];
        desktopTextElement.textContent = desktopTexts[currentIndex];
    }
}

// Function to switch positions between images based on click
function switchPositions(view, images, currentIndex) {
    const distance = getImageTravelDistance();
    
    // Define movement behavior based on the image clicked
    images.forEach((image, index) => {
        // Reset all positions initially
        image.style.transform = '';

        if (index === currentIndex) {
            // Middle image stays in center
            image.style.transform = `translateX(0px)`;
            image.style.zIndex = '2'; // Keep middle image on top
        } else if (index < currentIndex) {
            // Move left images
            image.style.transform = `translateX(-${distance}px)`;
            image.style.zIndex = '1'; // Move behind middle
        } else {
            // Move right images
            image.style.transform = `translateX(${distance}px)`;
            image.style.zIndex = '1'; // Move behind middle
        }
    });

    // Update the text content to reflect the new center image
    updateTextContent(view, currentIndex);
}

// Click event for tablet images
tabletImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        switchPositions('tablet', tabletImages, index);
    });
});

// Click event for desktop images
desktopImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        switchPositions('desktop', desktopImages, index);
    });
});

// Initialize carousel positions
switchPositions('tablet', tabletImages, middleOrder); // Start with middle image in the center for tablet
switchPositions('desktop', desktopImages, middleOrder); // Start with middle image in the center for desktop */





// Get elements for the carousel images and text
const tabletImages = document.querySelectorAll('.tablet-carousel .image-1, .tablet-carousel .image-2, .tablet-carousel .image-3');
const desktopImages = document.querySelectorAll('.desktop-carousel .image-1, .desktop-carousel .image-2, .desktop-carousel .image-3');
const tabletHeadlines = ['Tablet Headline 1', 'Tablet Headline 2', 'Tablet Headline 3'];
const tabletTexts = ['Tablet Text 1', 'Tablet Text 2', 'Tablet Text 3'];
const desktopHeadlines = ['Desktop Headline 1', 'Desktop Headline 2', 'Desktop Headline 3'];
const desktopTexts = ['Desktop Text 1', 'Desktop Text 2', 'Desktop Text 3'];
const tabletHeadingElement = document.querySelector('.tablet-carousel .carousel-heading');
const tabletTextElement = document.querySelector('.tablet-carousel .carousel-text');
const desktopHeadingElement = document.querySelector('.desktop-carousel .carousel-heading');
const desktopTextElement = document.querySelector('.desktop-carousel .carousel-text');


// Function to get image distance (tablet or desktop)
function getImageTravelDistance() {
    const viewWidth = window.innerWidth;
    return viewWidth <= 1399 ? 285 : 50; // 285 for tablet, 425 for desktop
}

// Function to update the text content based on the center image (position 2)
function updateTextContent(view, currentIndex) {
    if (view === 'tablet') {
        tabletHeadingElement.textContent = tabletHeadlines[currentIndex];
        tabletTextElement.textContent = tabletTexts[currentIndex];
    } else if (view === 'desktop') {
        desktopHeadingElement.textContent = desktopHeadlines[currentIndex];
        desktopTextElement.textContent = desktopTexts[currentIndex];
    }
}

// Define order for images (left: 0, middle: 1, right: 2)
const leftOrder = 0, middleOrder = 10, rightOrder = 2;

// Function to switch positions between images based on click
function switchPositions(view, images, currentIndex) {
    const distance = getImageTravelDistance();
    
    // Define movement behavior based on the image clicked
    images.forEach((image, index) => {
        // Reset all positions initially
        image.style.transform = '';

        if (index === currentIndex) {
            // Middle image stays in center
            image.style.transform = `translateX(0px)`;
        } else if (index < currentIndex) {
            // Move left images
            image.style.transform = `translateX(-${distance}px)`;
        } else {
            // Move right images
            image.style.transform = `translateX(${distance}px)`;
        }
    });

    // Update the text content to reflect the new center image
    updateTextContent(view, currentIndex);
}

// Click event for tablet images
tabletImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        switchPositions('tablet', tabletImages, index);
    });
});

// Click event for desktop images
desktopImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        switchPositions('desktop', desktopImages, index);
    });
});

// Initialize carousel positions
switchPositions('tablet', tabletImages, middleOrder); // Start with middle image in the center for tablet
switchPositions('desktop', desktopImages, middleOrder); // Start with middle image in the center for desktop













