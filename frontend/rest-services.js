"use strict";

import { updateGrid, chosenArtist } from "./main.js";

const endpoint = "http://localhost:3000";

async function getArtists(json) {
  const res = await fetch(json);
  const data = res.json();
  return data;
}

async function createArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.newName.value;
  const activeSince = form.newActive.value;
  const genres = form.newGenres.value;
  const labels = form.newLabels.value;
  const birthdate = form.newBirthdate.value;
  const shortDescription = form.newDesc.value;
  const website = form.newWebsite.value;
  const image = form.newImage.value;

  const newArtist = { name, activeSince, genres, labels, birthdate, shortDescription, website, image };
  const artistJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("artist added");
    updateGrid();
    alert("New Artist Created!");
  }
}

async function updateArtist(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.updateName.value;
  const activeSince = form.updateActive.value;
  const genres = form.updateGenres.value;
  const labels = form.updateLabels.value;
  const birthdate = form.updateBirthdate.value;
  const shortDescription = form.updateDesc.value;
  const website = form.updateWebsite.value;
  const image = form.updateImage.value;
  console.log(chosenArtist.id);

  const updatedArtist = { name, activeSince, genres, labels, birthdate, shortDescription, website, image };
  const artistJson = JSON.stringify(updatedArtist);
  const response = await fetch(`${endpoint}/artists/${chosenArtist.id}`, {
    method: "PUT",
    body: artistJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("artist updated");
    updateGrid();
    alert("Artist Updated!");
  }
}

async function deleteArtist(id) {
  console.log(id);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateGrid();
  }
}

export { getArtists, createArtist, updateArtist, deleteArtist, endpoint };
