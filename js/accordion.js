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
        this.classList.toggle("inactive");
  
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