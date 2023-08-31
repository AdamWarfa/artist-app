"use strict";
import { getArtists, createArtist, updateArtist, deleteArtist } from "./rest-services.js";

window.addEventListener("load", initApp);

let artists;

async function initApp() {
  artists = await getArtists("../backend/data.json");
  console.log(artists);

  showArtists(artists);

  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

function showArtists(artistList) {
  document.querySelector("#grid-container").innerHTML = "";
  for (const artist of artistList) {
    document.querySelector("#grid-container").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `

    
        <article class="grid-box">
            <h2 class="artist-name">${artist.name}</h2>
            <p class="artist-genres">${artist.genres}</p>
            <img id="artist-image" src=${artist.image} alt="" />
            <p class="artist-desc">${artist.shortDescription}</p>
            <p class="artist-labels">${artist.labels}</p>
            <p class="artist-active">${artist.activeSince}</p>
            <button class="btn-update">UPDATE</button>
            <button class="btn-delete">DELETE</button>
            <button class="btn-favorite">FAVORITE</button>
        </article>
    `
    );
    document.querySelector("article:last-child .btn-update").addEventListener("click", () => updateArtist(artist));
    document.querySelector("article:last-child .btn-delete").addEventListener("click", () => deleteArtist(artist));
    document.querySelector("article:last-child .btn-favorite").addEventListener("click", () => favoriteArtist(artist));
  }
}

async function updateGrid() {
  showArtists(artists);
}

function favoriteArtist(artist) {
  alert(artist);
}

export default updateGrid;
