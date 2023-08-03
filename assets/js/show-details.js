"use strict";

// Imports
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createShowCard } from "./show-card.js";

// Retrieves the saved showID of the movie selected from local storage.
const showId = window.localStorage.getItem("showId");
// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Returns the show's genres separated by a ','.
const getGenres = function (genreList) {
    const newGenreList = [];

    // Pushes the names of the movie's genres into newGenreList.
    for (const { name } of genreList) newGenreList.push(name);

    return newGenreList.join(", ");
};

// Returns the show's cast list separated by a ','.
// Ten cast members is the max length of the list.
const getCasts = function (castList) {
    const newCastList = [];

    // Pushes cast names into newCastList.
    // A maximum of 10 names can be pushed.
    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }

    return newCastList.join(", ");
};

// Returns the movie's directors separated by a ','.
const getCreators = function (creators) {
    const creatorList = [];

    // Pushes creator names into creatorList.
    // A maximum of 10 names can be pushed.
    for (let i = 0, len = creators.length; i < len && i < 10; i++) {
        const { name } = creators[i];
        creatorList.push(name);
    }

    return creatorList.join(", ");
};

// Filter videos
const filterVideos = function (videoList) {
    // Returns all of the teasers and trailers from videoList that are hosted on YouTube as an array.
    return videoList.filter(
        ({ type, site }) =>
            (type === "Trailer" || type === "Teaser") && site === "YouTube"
    );
};

// Retrieves show details using the provided showId.
fetchDataFromServer(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${api_key}&append_to_response=credits,videos,images,releases`,
    function (show) {
        // Stores data for current show into show.
        const {
            backdrop_path,
            poster_path,
            name,
            number_of_episodes,
            number_of_seasons,
            first_air_date,
            vote_average,
            genres,
            overview,
            credits: { cast },
            created_by,
            videos: { results: videos },
        } = show;

        // Sets document title to movie title.
        document.title = `${name} - TVFlix`;

        // Creates movie-detail <div>.
        const movieDetail = document.createElement("div");
        movieDetail.classList.add("movie-detail");

        // Sets movie-detail <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        movieDetail.innerHTML = `
            <div class="backdrop-image" style="background-image: url('${imageBaseURL}${
            "w1280" || "original"
        }${backdrop_path || poster_path}');"></div>

            <figure class="poster-box movie-poster">
                <img src="${imageBaseURL}w342${poster_path}" alt="${name}" class="img-cover">
            </figure>

            <div class="detail-box">

                <div class="detail-content">

                    <h1 class="heading">
                        ${name}
                    </h1>

                    <div class="meta-list">

                        <div class="meta-item">
                            <img src="./assets/images/star.png" width="20" height="20" alt="rating">
                        </div>

                        <span class="span">
                            ${vote_average.toFixed(1)}
                        </span>

                        <div class="separator"></div>

                        <div class="meta-item card-badge">
                            ${number_of_seasons} Season(s)
                        </div>

                        <div class="separator"></div>

                        <div class="meta-item">
                            ${number_of_episodes} Episodes
                        </div>

                        <div class="separator"></div>

                        <div class="meta-item">
                            ${first_air_date.split("-")[0]}
                        </div>

                    </div>

                    <p class="genre">
                        ${getGenres(genres)}
                    </p>

                    <p class="overview">
                        ${overview}
                    </p>

                    <ul class="detail-list">

                        <div class="list-item">
                            <p class="list-name">
                                Starring
                            </p>

                            <p>
                                ${getCasts(cast)}
                            </p>
                        </div>

                        <div class="list-item">
                            <p class="list-name">
                                Created By:
                            </p>

                            <p>
                                 ${getCreators(created_by)}
                            </p>
                        </div>

                    </ul>

                </div>

                <div class="title-wrapper">
                    <h3 class="title-large">
                        Trailers and Clips
                    </h3>
                </div>

                <div class="slider-list">
                    <div class="slider-inner"></div>
                </div>

            </div>
        `;

        // Creates videos section of the details page.
        for (const { key, name } of filterVideos(videos)) {
            // Creates video-card <div>.
            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");

            // Sets video-card <div> HTML.
            // Uses template literals to inject video data retrieved from API into the HTML.
            videoCard.innerHTML = `
                <iframe width="500"  height="294" 
                src="https://www.youtube.com/embed/${key}?theme=dark&color=white&rel=0" 
                frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" 
                loading="lazy"></iframe>
            `;

            // Adds the completed video card into slider-inner.
            movieDetail.querySelector(".slider-inner").appendChild(videoCard);
        }

        // Pushes the completed details section into the page.
        pageContent.appendChild(movieDetail);

        fetchDataFromServer(
            `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${api_key}&page=1`,
            addSuggestedShows
        );
    }
);

// Creates scrollable show lists.
const addSuggestedShows = function ({ results: showList }, title) {
    // Creates movie-list <section>
    const showListElem = document.createElement("section");
    showListElem.classList.add("movie-list");
    showListElem.ariaLabel = "You May Also Like";

    // Sets movie-list <section> HTML.
    // Uses template literals to inject movie data retrieved from API into the HTML.
    showListElem.innerHTML = `
        <div class="title-wrapper">

            <h3 class="title-large">
                You May Also Like
            </h3>

        </div>

        <div class="slider-list">

            <div class="slider-inner"></div>

        </div>
    `;

    // Creates a show-card for each movie in showList.
    for (const show of showList) {
        // Imported from movie_card.js.
        const showCard = createShowCard(show);

        // Adds the newly created movie-card into the list.
        showListElem.querySelector(".slider-inner").appendChild(showCard);
    }

    // Adds the movie-lists to the page.
    pageContent.appendChild(showListElem);
};
