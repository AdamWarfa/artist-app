"use strict";

import updateGrid from "./main.js";

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
  const active = form.newActive.value;

  const newArtist = { name, active };
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

async function updateArtist(artist) {
  alert(artist);
}

async function deleteArtist(artist) {
  alert(artist);
}

export { getArtists, createArtist, updateArtist, deleteArtist };
