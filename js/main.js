/* DARK MODE JAVA SCRIPT */
/* W3schools and then ChatGPT in order to get it implemented */

// Dark mode toggle function
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // This part changes the picture for the Silicon logo in the navigation bar.
    var logo = document.getElementById('logo-text');
    if (element.classList.contains('dark-mode')) {
        logo.src = "/images/dark/logo/silicon-text-dark.svg";
    } else {
        logo.src = "/images/light/logo/silicon-text-light.svg";
    }

    // This part changes the hamburger-menu image in the navigation bar.
    var navigation = document.getElementById('burger-menu');
    if (element.classList.contains('dark-mode')) {
        navigation.src = "/images/dark/icons/button-toggle-navigation-dark.svg";
    } else {
        navigation.src = "/images/light/icons/button-toggle-navigation-light.svg";
    }

    // This part changes the AppStore picture in the Appstore button.
    var appstore_logotype = document.getElementById('appstore-logotype');
    if (element.classList.contains('dark-mode')) {
        appstore_logotype.src = "/images/dark/market/appstore-dark.svg";
    } else {
        appstore_logotype.src = "/images/light/market/appstore-light.svg";
    }

    // This part changes the PlayStore picture in the PlayStore button.
    var playstore_logotype = document.getElementById('playstore-logotype');
    if (element.classList.contains('dark-mode')) {
        playstore_logotype.src = "/images/dark/market/googleplay-dark.svg";
    } else {
        playstore_logotype.src = "/images/light/market/googleplay-light.svg";
    }
    
    // This part changes the AppStore picture in the Appstore button.
    var appstore = document.getElementById('appstore');
    if (element.classList.contains('dark-mode')) {
        appstore.src = "/images/dark/market/appstore-dark.svg";
    } else {
        appstore.src = "/images/light/market/appstore-light.svg";
    }

    // This part changes the PlayStore picture in the PlayStore button.
    var playstore = document.getElementById('playstore');
    if (element.classList.contains('dark-mode')) {
        playstore.src = "/images/dark/market/googleplay-dark.svg";
    } else {
        playstore.src = "/images/light/market/googleplay-light.svg";
    }
}

// Get the checkbox element
const darkModeSwitch = document.getElementById('darkmode-switch');

// Add event listener to the checkbox to trigger the dark mode function
darkModeSwitch.addEventListener('change', function() {
    darkMode();  // Call the darkMode function whenever the checkbox is toggled
});

// Change the colour of the navigation bar from transparent to a solid colour
window.addEventListener('scroll', function() {
    const header = document.getElementById('sticky-header');
    if (window.scrollY > 50) { // Adjust the value to determine when the background should change
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

