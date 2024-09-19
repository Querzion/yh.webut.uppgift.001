

/* W3schools and then ChatGPT in order to get it implemented */
// Dark mode toggle function

// Get the checkbox element for dark mode toggle
const darkModeSwitch = document.getElementById('darkmode-switch');

// Add event listener to the checkbox to trigger the darkMode function
darkModeSwitch.addEventListener('change', darkMode);

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Change the Silicon logo image in the navigation bar
    var logo = document.getElementById('logo-text');
    logo.src = element.classList.contains('dark-mode') 
        ? "/images/dark/logo/silicon-text-dark.svg" 
        : "/images/light/logo/silicon-text-light.svg";

    // Change the AppStore and PlayStore logos in the buttons
    var appstore_logotype = document.getElementById('appstore');
    appstore_logotype.src = element.classList.contains('dark-mode') 
        ? "/images/dark/market/appstore-dark.svg" 
        : "/images/light/market/appstore-light.svg";

    var playstore_logotype = document.getElementById('playstore');
    playstore_logotype.src = element.classList.contains('dark-mode') 
        ? "/images/dark/market/googleplay-dark.svg" 
        : "/images/light/market/googleplay-light.svg";
}

// Change the background color of the navigation bar on scroll
document.addEventListener('scroll', function () {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) {
        console.log('Scrolled more than 50px');
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion */
/* var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
    }
});
} */
/* I put this accordion script through ChatGPT, and I hope it was a good change. */
document.addEventListener("DOMContentLoaded", function() {
    const acc = document.querySelectorAll(".faq-accordion");
  
    acc.forEach(button => {
      button.addEventListener("click", function() {
        // Toggle active class on accordion
        this.classList.toggle("active");
  
        // Toggle the panel
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  });
  /* Yup, much smoother! */






/* Carousel Loading Logic */
/* document.addEventListener("DOMContentLoaded", function() {
    let currentScript = null;

    function loadScript(url) {
        if (currentScript) {
            currentScript.remove(); // Remove the previous script if exists
        }

        var script = document.createElement("script");
        script.src = url;
        script.defer = true;
        document.head.appendChild(script);

        currentScript = script; // Store the current script reference
    }

    function getScriptForViewport() {
        const width = window.innerWidth;
        if (width <= 767) {
            return "/js/carousel-mobile.js";
        } else if (width <= 1399) {
            return "/js/carousel-tablet.js";
        } else {
            return "/js/carousel-desktop.js";
        }
    }

    // Load the script for the current viewport
    loadScript(getScriptForViewport());

    // Reload the script on resize with a debounce function to prevent rapid reloading
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            loadScript(getScriptForViewport());
        }, 200); // Adjust the timeout as needed
    });
}); */





/* DARK MODE JAVA SCRIPT */
/* W3schools and then ChatGPT in order to get it implemented */
// Dark mode toggle function

// Get the checkbox element for dark mode toggle
/* const darkModeSwitch = document.getElementById('darkmode-switch'); */

// Add event listener to the checkbox to trigger the darkMode function
/* darkModeSwitch.addEventListener('change', darkMode);

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Change the Silicon logo image in the navigation bar
    var logo = document.getElementById('logo-text');
    logo.src = element.classList.contains('dark-mode') 
        ? "/images/dark/logo/silicon-text-dark.svg" 
        : "/images/light/logo/silicon-text-light.svg"; */

    // Change the hamburger menu icon
    /* var navigation = document.getElementById('burger-menu');
    navigation.src = element.classList.contains('dark-mode') 
        ? "/images/dark/icons/button-toggle-navigation-dark.svg" 
        : "/images/light/icons/button-toggle-navigation-light.svg"; */

    // Change the AppStore and PlayStore logos in the buttons
/*     var appstore_logotype = document.getElementById('appstore');
    appstore_logotype.src = element.classList.contains('dark-mode') 
        ? "/images/dark/market/appstore-dark.svg" 
        : "/images/light/market/appstore-light.svg";

    var playstore_logotype = document.getElementById('playstore');
    playstore_logotype.src = element.classList.contains('dark-mode') 
        ? "/images/dark/market/googleplay-dark.svg" 
        : "/images/light/market/googleplay-light.svg";
} */

/* Carousel  */
/* document.addEventListener("DOMContentLoaded", function() {
    function loadScript(url) {
      var script = document.createElement("script");
      script.src = url;
      script.defer = true;
      document.head.appendChild(script);
    }
  
    function getScriptForViewport() {
      const width = window.innerWidth;
      if (width <= 767) {
        return "/js/carousel-mobile.js";
      } else if (width <= 1399) {
        return "/js/carousel-tablet.js";
      } else {
        return "/js/carousel-desktop.js";
      }
    }
  
    // Load the script for the current viewport
    loadScript(getScriptForViewport());
  
    // Optionally, reload script on resize
    window.addEventListener('resize', function() {
      // Remove existing script if needed
      document.querySelectorAll('script[src^="carousel-"]').forEach(script => script.remove());
      loadScript(getScriptForViewport());
    });
  }); */

// Change the background color of the navigation bar on scroll
/* document.addEventListener('scroll', function () {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) { // Adjust this value based on when you want the change to happen
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}); */

