const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener('click', () => {
    primaryNav.hasAttribute('data-visible')
        ? navToggle.setAttribute("aria-expanded", false)
        : navToggle.setAttribute("aria-expanded", true);
    primaryNav.toggleAttribute("data-visible");
    primaryHeader.toggleAttribute("data-overlay");
});

var activeFeaturesButton = document.querySelector(".features__icon-active");
const moviesButton = document.getElementById("features__icon-movies");
const showsButton = document.getElementById("features__icon-shows");
const foldersButton = document.getElementById("features__icon-folders");
const storeButton = document.getElementById("features__icon-store");
const watchButton = document.getElementById("features__icon-watch");



moviesButton.addEventListener('click', () => {
    // If clicked button is not currently active:
    if (!moviesButton.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");
        // Retrieve the SVGs we will edit.
        const moviesSVG = document.getElementById("movies-svg")
        const activeSVG = document.querySelector(".features__icon-svg-active");
        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        moviesButton.classList.remove("features__icon");
        moviesButton.classList.add("features__icon-active");
        moviesSVG.classList.remove("features__icon-svg");
        moviesSVG.classList.add("features__icon-svg-active");
    }
})

showsButton.addEventListener('click', () => {
    // If clicked button is not currently active:
    if (!showsButton.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");
        // Retrieve the SVGs we will edit.
        const showsSVG = document.getElementById("shows-svg")
        const activeSVG = document.querySelector(".features__icon-svg-active");
        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        showsButton.classList.remove("features__icon");
        showsButton.classList.add("features__icon-active");
        showsSVG.classList.remove("features__icon-svg");
        showsSVG.classList.add("features__icon-svg-active");
    }
})

foldersButton.addEventListener('click', () => {
    // If clicked button is not currently active:
    if (!foldersButton.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");
        // Retrieve the SVGs we will edit.
        const foldersSVG = document.getElementById("folders-svg")
        const activeSVG = document.querySelector(".features__icon-svg-active");
        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        foldersButton.classList.remove("features__icon");
        foldersButton.classList.add("features__icon-active");
        foldersSVG.classList.remove("features__icon-svg");
        foldersSVG.classList.add("features__icon-svg-active");
    }
})

storeButton.addEventListener('click', () => {
    // If clicked button is not currently active:
    if (!storeButton.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");
        // Retrieve the SVGs we will edit.
        const storeSVG = document.getElementById("store-svg")
        const activeSVG = document.querySelector(".features__icon-svg-active");
        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        storeButton.classList.remove("features__icon");
        storeButton.classList.add("features__icon-active");
        storeSVG.classList.remove("features__icon-svg");
        storeSVG.classList.add("features__icon-svg-active");
    }
})

watchButton.addEventListener('click', () => {
    // If clicked button is not currently active:
    if (!watchButton.classList.contains("features__icon-active")) {
        // Get currently active button.
        activeFeaturesButton = document.querySelector(".features__icon-active");
        // Retrieve the SVGs we will edit.
        const watchSVG = document.getElementById("watch-svg")
        const activeSVG = document.querySelector(".features__icon-svg-active");
        // Change the currently active button to regular class.
        activeFeaturesButton.classList.remove("features__icon-active");
        activeFeaturesButton.classList.add("features__icon");
        activeSVG.classList.remove("features__icon-svg-active");
        activeSVG.classList.add("features__icon-svg");

        // Add the active class to the clicked button.
        watchButton.classList.remove("features__icon");
        watchButton.classList.add("features__icon-active");
        watchSVG.classList.remove("features__icon-svg");
        watchSVG.classList.add("features__icon-svg-active");
    }
})