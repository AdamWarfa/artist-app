//Importering af valgte dependencies
import express, { request, response } from "express";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { getArtistList, getArtistSingle, postArtist, putArtistSingle, deleteArtistSingle } from "./controllers.js";

//Deklarering af localhostporten og anvendelse af express og cors
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render("../frontend/index.html");
});

//GET for den fulde liste af kunstnere
app.get("/artists", getArtistList);

//GET for en enkelt kunstner valgt med unikt ID
app.get("/artists/:id", getArtistSingle);

//POST til den fulde liste af kunstnere
app.post("/artists", postArtist);

//PUT for en enkelt kunstner valgt med unikt ID
app.put("/artists/:id", putArtistSingle);

//DELETE for en enkelt kunstner valgt med unikt ID
app.delete("/artists/:id", deleteArtistSingle);

//Brug terminalen til at fortælle at serveren kører
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
