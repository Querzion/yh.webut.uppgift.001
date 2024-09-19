/* GOT IT! FUDGE YEAH!!! */

// Get elements for the carousel images and text
const tabletImages = document.querySelectorAll('.tablet-carousel #t-1, .tablet-carousel #t-2, .tablet-carousel #t-3');
const desktopImages = document.querySelectorAll('.desktop-carousel #d-1, .desktop-carousel #d-2, .desktop-carousel #d-3');


const tabletHeadlines = [
    'Tablet Headline 1', 
    'Tablet Headline 2', 
    'Tablet Headline 3'
];
const tabletTexts = [
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero sint fugiat sequi cupiditate. Adipisci soluta eaque qui excepturi maxime iste non dolor? Consectetur!', 
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, blanditiis tenetur! Incidunt inventore corrupti ad! Deleniti sapiente ut aspernatur commodi?', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eveniet excepturi eum amet ad?'
];

const desktopHeadlines = [
    'Desktop Headline 1', 
    'Desktop Headline 2', 
    'Desktop Headline 3'
];
const desktopTexts = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dolore explicabo ipsum labore rerum quis voluptate numquam corporis impedit ea officia perspiciatis earum. Optio corporis officiis consequuntur sunt libero similique voluptatum.', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit architecto deleniti dolore rem facere eos!', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum dolores voluptas velit ut consectetur consequuntur in, a alias?'
];


const tabletHeadingElement = document.querySelector('.tablet-carousel .carousel-heading');
const tabletTextElement = document.querySelector('.tablet-carousel .carousel-text');
const desktopHeadingElement = document.querySelector('.desktop-carousel .carousel-heading');
const desktopTextElement = document.querySelector('.desktop-carousel .carousel-text');

// Function to get image travel distance (tablet or desktop)
function getImageTravelDistance() {
    const viewWidth = window.innerWidth;
    return viewWidth <= 1399 ? 205 : 300;
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

// Define order for images (left: 0 (IMAGE 1 (#t-1 / #d-1)), middle: 1 (IMAGE 2 (#t-2 / #d-2)), right: 2 (IMAGE 3 (#t-3 / #d-3))
const leftOrder = 0, middleOrder = 1, rightOrder = 2;

// Helper function to reset all images to position 0 (no movement)
function resetImages(images) {
    images.forEach((image) => {
        image.style.transform = 'translateX(0)';
    });
}

// Function to handle leftOrder movement
function handleLeftOrder(images, moveDistance) {
    images.forEach((image, index) => {
        if (index === leftOrder) {
            // Left image moves to the middle
            image.style.transform = `translateX(${moveDistance}px)`;
        } else if (index === middleOrder) {
            // Middle image moves to the left
            image.style.transform = `translateX(-${moveDistance}px)`;
        } else {
            // Right image stays in place
            image.style.transform = `translateX(0)`;
        }
    });
}

// Function to handle rightOrder movement
function handleRightOrder(images, moveDistance) {
    images.forEach((image, index) => {
        if (index === rightOrder) {
            // Right image moves to the middle
            image.style.transform = `translateX(-${moveDistance}px)`;
        } else if (index === middleOrder) {
            // Middle image moves to the right
            image.style.transform = `translateX(${moveDistance}px)`;
        } else {
            // Left image stays in place
            image.style.transform = `translateX(0)`;
        }
    });
}

// Function to switch positions between images based on click
function switchPositions(view, images, currentIndex) {
    const moveDistance = getImageTravelDistance(); // Get the appropriate travel distance for tablet or desktop

    // Reset images initially to avoid stacking or gaps
    resetImages(images);

    // Handle movement based on the current index (position of clicked image)
    if (currentIndex === leftOrder) {
        handleLeftOrder(images, moveDistance);
    } else if (currentIndex === middleOrder) {
        // If middle image clicked, no movement
        resetImages(images);
    } else if (currentIndex === rightOrder) {
        handleRightOrder(images, moveDistance);
    }

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

// Initialize carousel positions with the middle image in the center
switchPositions('tablet', tabletImages, middleOrder); // Start with middle image in the center for tablet
switchPositions('desktop', desktopImages, middleOrder); // Start with middle image in the center for desktop

/* Created by: Slisk Lindqvist sep'24 in conjunction with ChatGPT.com */