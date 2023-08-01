"use strict";

// Adds event on multiple elements.
const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};

//  Toggle search box in mobile screens.
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
});

// Stores the movieId of the movie that was clicked in local storage for later use.
const getMovieDetail = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
};
