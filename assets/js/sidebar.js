"use strict";

// Import form api.js
import { api_key, fetchDataFromServer } from "./api.js";

// Export sidebar().
export function sidebar(mediaType) {
    // Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
    // Then change genre format to {123: "Action"} and store in a map.

    // Used to store all genres.
    const genreList = {};

    // Retrieve all genres from API.
    fetchDataFromServer(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${api_key}`,

        // Callback function to store genres in genreList map.
        function ({ genres }) {
            // Iterates through each genre in the JSON file.
            for (const { id, name } of genres) {
                // Make a key value pair and store in the genreList map.
                genreList[id] = name;
            }

            // Creates a link <a> for each genre in the genreList map.
            genreLink();
        }
    );

    // Create sidebar inner div to hold all of the sidebar's HTML.
    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");

    // Languages are hard coded, genres will be loaded using the API.
    sidebarInner.innerHTML = `

            <div class="sidebar-list">

                <p class="title">
                    Genre
                </p>

            </div>

            <div class="sidebar-list">

                <p class="title">
                    Language
                </p>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en","English")'>English</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=es","Spanish")'>Spanish</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=fr","French")'>French</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=de", "German")'>German</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=it", "Italian")'>Italian</a>

                <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ja", "Japanese")'>Japanese</a>

            </div>

            <div class="sidebar-footer">

                <p class="copyright">

                    Copyright 2023

                </p>

                
                <img src="./assets/images/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
            </div>
            
    `;

    // Creates a link <a> for each genre in the genreList map.
    const genreLink = function () {
        // Iterates through each entry in genreList.
        for (const [genreId, genreName] of Object.entries(genreList)) {
            // Creates the <a> link, and sets its classes.
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movie-list.html");
            link.setAttribute("menu-close", "");
            // OnClick attribute used to create movie list when a genre link is clicked.
            link.setAttribute(
                "onclick",
                `getMovieList
            ("with_genres=${genreId}", "${genreName}")`
            );

            // Gives <a> link the title of the current genre in genreList.
            link.textContent = genreName;

            // Adds the new genre <a> link to the first .sidebar-list inside .sidebar-inner (Genres).
            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }

        // Once all genre <a> links are added to the first .sidebar-list (Genres), adds .sidebar-inner to sidebar <nav>.
        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    };

    // Toggles sidebar in mobile screens.
    const toggleSidebar = function (sidebar) {
        // Retrieve all sidebar toggling components from doc.
        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        // Toggle the ".active" class in each element.
        addEventOnElements(sidebarTogglers, "click", function () {
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        // When closing sidebar, remove ".active" class from each element.
        addEventOnElements(sidebarClose, "click", function () {
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    };
}
