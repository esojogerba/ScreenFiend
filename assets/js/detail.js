'use strict';

// Imports
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMediaCard } from "./media-card.js";


// Retrieves the saved movieId of the movie selected from local storage.
const movieId = window.localStorage.getItem("movieId");
// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");


// Returns the movie's genres separated by a ','.
const getGenres = function (genreList) {

    const newGenreList = [];

    // Pushes the names of the movie's genres into newGenreList.
    for (const { name } of genreList) newGenreList.push(name);

    return newGenreList.join(", ");

}

// Returns the movie's cast list separated by a ','.
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

}

// Returns the movie's directors separated by a ','.
const getDirectors = function (crewList) {

    //  Gets the directors from the crewList
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorList = [];

    // Pushes all the names of the directors into directorList.
    for (const { name } of directors) directorList.push(name);

    return directorList.join(", ");

}

// Filter videos
const filterVideos = function (videoList) {
    // Returns all of the teasers and trailers from videoList that are hosted on YouTube as an array.
    return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
}


// Retrieves movie details using the provided movieId.
fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases`,
    function (movie) {

        // Stores data for current movie into movie.
        const {
            backdrop_path,
            poster_path,
            title,
            release_date,
            runtime,
            vote_average,
            releases: { countries: [{ certification }] },
            genres,
            overview,
            casts: { cast, crew },
            videos: { results: videos }
        } = movie;

        // Sets document title to movie title.
        document.title = `${title} - TVFlix`;

        // Creates movie-detail <div>.
        const movieDetail = document.createElement("div");
        movieDetail.classList.add("movie-detail");

        // Sets movie-detail <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        movieDetail.innerHTML = `
            <div class="backdrop-image" style="background-image: url('${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}');"></div>

            <figure class="poster-box movie-poster">
                <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover">
            </figure>

            <div class="detail-box">

                <div class="detail-content">

                    <h1 class="heading">
                        ${title}
                    </h1>

                    <div class="meta-list">

                        <div class="meta-item">
                            <img src="./assets/images/star.png" width="20" height="20" alt="rating">
                        </div>

                        <span class="span">
                            ${vote_average.toFixed(1)}
                        </span>

                        <div class="separator"></div>

                        <div class="meta-item">
                            ${runtime}m
                        </div>

                        <div class="separator"></div>

                        <div class="meta-item">
                            ${release_date.split("-")[0]}
                        </div>

                        <div class="meta-item card-badge">
                            ${certification}
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
                                Directed By
                            </p>

                            <p>
                                ${getDirectors(crew)}
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
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`, addSuggestedMovies);

    });

// Creates scrollable movie lists.
const addSuggestedMovies = function ({ results: movieList }, title) {

    // Creates movie-list <section>
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "You May Also Like";

    // Sets movie-list <section> HTML.
    // Uses template literals to inject movie data retrieved from API into the HTML.
    movieListElem.innerHTML = `
        <div class="title-wrapper">

            <h3 class="title-large">
                You May Also Like
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