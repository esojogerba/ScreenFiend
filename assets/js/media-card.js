"use strict";

// Imports
import { imageBaseURL } from "./api.js";

// Creates a movie card using a movie's data from the API.
export function createMediaCard(movie) {
    // Stores data for current movie into movie.
    const { poster_path, title, vote_average, release_date, id } = movie;

    // Creates movie-card <div>.
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Sets movie-card <div> HTML.
    // Uses template literals to inject movie data retrieved from API into the HTML.
    card.innerHTML = `
            <figure class="poster-box card-banner">
                <img src="${imageBaseURL}w342${poster_path}" alt="${title}"
                    class="img-cover" loading="lazy">
            </figure>

            <h4 class="title">${title}</h4>

            <div class="meta-list">
                <div class="meta-item">
                    <img src="./assets/images/star.png" width="20" height="20" alt="rating" loading="lazy">

                    <span class="span">${vote_average.toFixed(1)}</span>
                </div>

                <div class="card-badge">
                    ${release_date.split("-")[0]}
                </div>
            </div>

            <a href="./detail.html" class="card-btn" title="${title}" onClick="getMovieDetail(${id})"></a>
    `;

    return card;
}
