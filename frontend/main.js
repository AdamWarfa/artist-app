"use strict";
import { getArtists, createArtist, updateArtist, deleteArtist } from "./rest-services.js";

window.addEventListener("load", initApp);

let artists;
let chosenArtist;
let favoriteList = [];

async function initApp() {
  artists = await getArtists("../backend/data.json");
  console.log(artists);

  showArtists(artists);

  document.querySelector("#btn-create").addEventListener("click", createClicked);
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
            <button class="btn-favorite">🖤</button>
        </article>
    `
    );
    document.querySelector("article:last-child .btn-update").addEventListener("click", () => updateClicked(artist));
    document.querySelector("article:last-child .btn-delete").addEventListener("click", () => deleteClicked(artist.id));
    document.querySelector("article:last-child .btn-favorite").addEventListener("click", () => favoriteArtist(artist));
  }
}

async function updateGrid() {
  showArtists(artists);
}

function favoriteArtist(artist) {
  if (favoriteList.includes(artist)) {
    alert("Artist already favorited");
  } else {
    favoriteList.push(artist);
    console.log(favoriteList);
  }
}

function createClicked() {
  document.querySelector("#create-dialog").showModal();
  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

function updateClicked(artist) {
  document.querySelector("#update-dialog").showModal();

  chosenArtist = artist;

  document.querySelector("#updateName").value = artist.name;
  document.querySelector("#updateActive").value = artist.activeSince;
  document.querySelector("#updateGenres").value = artist.genres;
  document.querySelector("#updateLabels").value = artist.labels;
  document.querySelector("#updateBirthdate").value = artist.birthdate;
  document.querySelector("#updateDesc").value = artist.shortDescription;
  document.querySelector("#updateWebsite").value = artist.website;
  document.querySelector("#updateImage").value = artist.image;

  console.log(chosenArtist.id);

  document.querySelector("#update-form").addEventListener("submit", updateArtist);
}

function deleteClicked(id) {
  const delDialog = document.querySelector("#delete-dialog");
  delDialog.showModal();
  document.querySelector("#btn-delete-confirm").addEventListener("click", () => deleteArtist(id));
  document.querySelector("#btn-delete-cancel").addEventListener("click", () => closeDialog(delDialog));
}

function closeDialog(dialog) {
  dialog.close();
}

export { updateGrid, chosenArtist };
