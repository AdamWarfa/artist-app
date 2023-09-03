"use strict";
import { getArtists, createArtist, updateArtist, deleteArtist, endpoint } from "./rest-services.js";

window.addEventListener("load", initApp);

let artists;
let chosenArtist;
let favoriteList;
let savedFavorites = JSON.parse(localStorage.getItem("favorites"));
let view = "home";

async function initApp() {
  artists = await getArtists(`${endpoint}/artists`);
  console.log(artists);

  if (savedFavorites) {
    favoriteList = savedFavorites;
    console.log(favoriteList);
  } else {
    favoriteList = [];
  }

  showArtists(artists);

  document.querySelector("#btn-create").addEventListener("click", createClicked);
  document.querySelector("#home-link").addEventListener("click", goHome);
  document.querySelector("#favorite-link").addEventListener("click", goToFavorites);
  document.querySelector("#sort-select").addEventListener("change", chooseSort);
  document.querySelector("#input-search").addEventListener("keyup", (event) => showArtists(artists.filter((artist) => artist.name.toLowerCase().includes(event.target.value.toLowerCase()))));
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
            <p class="artist-labels">Labels: ${artist.labels}</p>
            <p class="artist-active">Active since ${artist.activeSince}</p>
            <button class="btn-update">UPDATE</button>
            <button class="btn-delete">DELETE</button>
            <button class="btn-favorite"><i class="fa-regular fa-heart fa-xl" style="color: #0f0f0f;"></i></button>
        </article>
    `
    );
    document.querySelector("article:last-child .btn-update").addEventListener("click", () => updateClicked(artist));
    document.querySelector("article:last-child .btn-delete").addEventListener("click", () => deleteClicked(artist.id, artist));

    const favBtn = document.querySelector("article:last-child .btn-favorite");
    let favoritesString = JSON.stringify(favoriteList);

    if (favoritesString.includes(artist.id)) {
      console.log(true);
      favBtn.style.backgroundColor = "rgb(255, 68, 165)";
      favBtn.innerHTML = `<i class="fa-solid fa-heart fa-xl" style="color: #0f0f0f;"></i>`;
    } else {
      console.log(false);
    }
    favBtn.addEventListener("click", () => favoriteArtist(artist, favBtn));
  }
}

async function updateGrid() {
  artists = await getArtists(`${endpoint}/artists`);
  switch (view) {
    case "home":
      showArtists(artists);
      break;
    case "fave":
      showArtists(favoriteList);
      break;
  }
}

function favoriteArtist(artist, favBtn) {
  let favoritesString = JSON.stringify(favoriteList);
  console.log(favoritesString);

  if (favoritesString.includes(artist.id)) {
    const position = favoriteList.indexOf(artist);
    favoriteList.splice(position, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
    console.log(favoriteList);
    favBtn.innerHTML = `<i class="fa-regular fa-heart fa-xl" style="color: #0f0f0f;"></i>`;
    favBtn.style.backgroundColor = "rgb(252, 176, 69)";
  } else {
    favoriteList.push(artist);
    console.log(favoriteList);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
    favBtn.innerHTML = `<i class="fa-solid fa-heart fa-xl" style="color: #0f0f0f;"></i>`;
    favBtn.style.backgroundColor = "rgb(255, 68, 165)";
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

function deleteClicked(id, artist) {
  const delDialog = document.querySelector("#delete-dialog");
  delDialog.showModal();
  document.querySelector("#btn-delete-confirm").addEventListener("click", () => deleteArtist(id, artist));
  document.querySelector("#btn-delete-cancel").addEventListener("click", () => closeDialog(delDialog));
}

function closeDialog(dialog) {
  dialog.close();
}

function goHome() {
  document.querySelector("#grid-container").innerHTML = "";
  view = "home";
  updateGrid();
}

function goToFavorites() {
  document.querySelector("#grid-container").innerHTML = "";
  view = "fave";
  updateGrid();
}

function chooseSort() {
  let sortValue = document.querySelector("#sort-select").value;
  switch (sortValue) {
    case "name":
      artists.sort(sortByName);
      favoriteList.sort(sortByName);
      updateGrid();
      break;
    case "active":
      artists.sort(sortByActive);
      favoriteList.sort(sortByActive);
      updateGrid();
      break;
  }
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function sortByActive(a, b) {
  return a.activeSince - b.activeSince;
}

// async function search(searchValue) {
//   showArtists(artists.filter((artist) => artist.name.toLowerCase().includes(searchValue.toLowerCase())));
// }

export { updateGrid, chosenArtist, artists, favoriteList };
