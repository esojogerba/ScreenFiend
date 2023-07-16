'use strict';

// Imports
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMediaCard } from "./media-card.js";


// Retrieves page-content <article> from index page.
const pageContent = document.querySelector("[page-content]");


// Home page movie list sections (Top Rated, Upcoming, Trending Movies).
const homePageSections = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },
    {
        title: "Trending This Week",
        path: "/trending/movie/week"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    }
]


// Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
// Then change genre format to {123: "Action"}
const genreList = {

    // Assign correct genre string to each genre_id provided. Example: [23 , 43] = "Action, Romance".
    asString(genreIdList) {
        // Will hold list of genre strings.
        let newGenreList = [];

        for (const genreId of genreIdList) {
            // If current genreId exists in genreList, push it to newGenreList.
            // this == genreList
            this[genreId] && newGenreList.push(this[genreId]);
        }
        return newGenreList.join(", ");
    }

};


// Retrieves all genres from API.
fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,

    function ({ genres }) {

        for (const { id, name } of genres) {
            genreList[id] = name;
        }

        // Retrieves popular movie data and passes it in JSON format to heroBanner().
        fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
            heroBanner);

    }
);


// Builds the hero banner.
// Uses data retrieved from fetchDataFromServer() as a parameter.
const heroBanner = function ({ results: getMovieList }) {

    // Creates banner <section>.
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Movies";

    // Sets up inner banner HTML boilerplate.
    banner.innerHTML = `
        <div class="banner-slider"></div>

        <div class="slider-control">

            <div class="control-inner"></div>
            
        </div>
    `;

    // Holds index of the current item. 
    let controlItemIndex = 0;

    // Iterates through each entry in getMovieList map.
    for (const [index, movie] of getMovieList.entries()) {

        // Stores data for current movie into movie.
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        // Creates a new slider item <div>.
        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute("slider-item", "");

        // Sets slider-item <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        sliderItem.innerHTML = `
                <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover"
                loading="${index === 0 ? "eager" : "lazy"}">

                <div class="banner-content">

                    <h2 class="heading">
                        ${title}
                    </h2>

                    <div class="meta-list">
                        <div class="meta-item">
                            ${release_date.split("-")[0]}
                        </div>
                        <div class="meta-item card-badge">
                            ${vote_average.toFixed(1)}
                        </div>
                    </div>

                    <p class="genre">
                        ${genreList.asString(genre_ids)}
                    </p>

                    <p class="banner-text">
                        ${overview}
                    </p>

                    <a href="./detail.html" class="btn" onClick="getMovieDetail(${id})">
                        <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true"
                            alt="play circle">
                        <span class="span">Watch Now</span>
                    </a>

                </div>
        `;

        // Adds the new slider-item into .banner-slider.
        banner.querySelector(".banner-slider").appendChild(sliderItem);

        // Creates a new slider control item.
        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "slider-item");
        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        // Increments index for next control item.
        controlItemIndex++;

        // Sets control item's HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        controlItem.innerHTML = `
        <img src="${imageBaseURL}w154${poster_path}" alt="${title}" 
        loading="lazy" draggable="false" class="img-cover">
        `;

        // Appends new slider control item into ".control-inner"
        banner.querySelector(".control-inner").appendChild(controlItem);

    }

    // Adds banner into pageContent.
    pageContent.appendChild(banner);

    addHeroSlide();

    // Fetch data for movie lists.
    for (const { title, path } of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList, title)
    }


}


// Hero slider functionality.
const addHeroSlide = function () {

    // Retrieves all slider items and slider controls.
    const sliderItems = document.querySelectorAll("[slider-item]");
    const sliderControls = document.querySelectorAll("[slider-control]");

    // Sets the variables below as the first slider item and slider control.
    // Will hold the current active slider item / slider control.
    let lastSliderItem = sliderItems[0];
    let lastSliderControl = sliderControls[0];

    // Sets the current slider item and control as active.
    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    // After a slider item is clicked it becomes the active one.
    const sliderStart = function () {

        // Removes the active class from the previously active slider item.
        lastSliderItem.classList.remove("active");
        lastSliderControl.classList.remove("active");

        // Adds the ".active" class to the slider item that was clicked.
        // this == slider-control
        sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");

        // Sets the selected slider item as the variable.
        lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
        lastSliderControl = this;

    }

    // When a slider item is clicked, runs sliderStart().
    addEventOnElements(sliderControls, "click", sliderStart);


}

// Creates scrollable movie lists.
const createMovieList = function ({ results: movieList }, title) {

    // Creates movie-list <section>
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = `${title}`;

    // Sets movie-list <section> HTML.
    // Uses template literals to inject movie data retrieved from API into the HTML.
    movieListElem.innerHTML = `
        <div class="title-wrapper">

            <h3 class="title-large">
                ${title}
            </h3>

        </div>

        <div class="slider-list">

            <div class="slider-inner"></div>

        </div>
    `;

    // Creates a movie-card for each movie in movieList.
    for (const movie of movieList) {
        // Imported from movie_card.js.
        const movieCard = createMediaCard(movie);

        // Adds the newly created movie-card into the list.
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }

    // Adds the movie-lists to the page.
    pageContent.appendChild(movieListElem);

}