// NAv menu toggle variables.
const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

// Create account button.
const newAccountBtn = document.getElementById("new-account-btn");

// Features menu text.
const features = new Map();
features.set(
    "movies",
    "Thousands of movies waiting to be stored in your collections for future viewing."
);
features.set(
    "shows",
    "Add every show you can think of, and more to your backlog."
);
features.set(
    "folders",
    "Create folders to keep your ever growing backlog organized."
);
features.set(
    "store",
    "We store your information so that you can access your backlog from anywhere."
);
features.set(
    "watch",
    "Power through your backlog and watch all the media you have been planning to see."
);

// Features menu variables
var activeFeaturesButton = document.querySelector(".features__icon-active");
const moviesButton = document.getElementById("features__icon-movies");
const showsButton = document.getElementById("features__icon-shows");
const foldersButton = document.getElementById("features__icon-folders");
const storeButton = document.getElementById("features__icon-store");
const watchButton = document.getElementById("features__icon-watch");
const featuresHeading = document.querySelector(".features__info-heading");
const featuresP = document.querySelector(".features__info-p");

// Toggle navigation
navToggle.addEventListener("click", () => {
    primaryNav.hasAttribute("data-visible")
        ? navToggle.setAttribute("aria-expanded", false)
        : navToggle.setAttribute("aria-expanded", true);
    primaryNav.toggleAttribute("data-visible");
    primaryHeader.toggleAttribute("data-overlay");
});

// Redirect to sign up when newAccountBtn is clicked.
newAccountBtn.addEventListener("click", () => {
    location.href = "/signup.html";
});

// Switch active feature button in features menu.
moviesButton.addEventListener("click", () => {
    featureClicked(moviesButton, "movies");
});
showsButton.addEventListener("click", () => {
    featureClicked(showsButton, "shows");
});
foldersButton.addEventListener("click", () => {
    featureClicked(foldersButton, "folders");
});
storeButton.addEventListener("click", () => {
    featureClicked(storeButton, "store");
});
watchButton.addEventListener("click", () => {
    featureClicked(watchButton, "watch");
});

function featureClicked(element, btnName) {
    // If clicked button is not currently active:
    if (!element.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");

        // Retrieve the SVGs we will edit.
        const currentSVG = document.getElementById(btnName + "-svg");
        const activeSVG = document.querySelector(".features__icon-svg-active");

        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        element.classList.remove("features__icon");
        element.classList.add("features__icon-active");
        currentSVG.classList.remove("features__icon-svg");
        currentSVG.classList.add("features__icon-svg-active");

        // Change the contents of the card
        featuresHeading.innerHTML = btnName.toUpperCase();
        featuresP.innerHTML = features.get(btnName);
    }
}
