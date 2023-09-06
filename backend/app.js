import express, { request, response } from "express";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render("../frontend/index.html");
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);
  console.log(artists);
  res.json(artists);
});

app.get("/artists/:id", async (req, res) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const id = req.params.id;

  let artist = artists.find((artist) => artist.id == id);

  if (!artist) {
    res.status(404).json({ error: "404! Page not found" });
  } else {
    console.log(artist);
    res.json(artist);
  }
});

app.post("/artists", async (req, res) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  console.log(req.body);

  const newArtist = req.body;
  newArtist.id = uuidv4();

  artists.push(newArtist);

  fs.writeFile("data.json", JSON.stringify(artists));
  res.json(artists);
});

app.put("/artists/:id", async (req, res) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const updatedArtist = req.body;
  console.log(updatedArtist);

  const id = req.params.id;

  let oldArtist = artists.find((artist) => artist.id == id);

  console.log(oldArtist);

  if (!oldArtist) {
    res.status(404).json({ error: "404! Page not found" });
  } else {
    let position = artists.indexOf(oldArtist);

    console.log(position);

    updatedArtist.id = id;

    artists.splice(position, 1, updatedArtist);

    fs.writeFile("data.json", JSON.stringify(artists));
    res.json(artists);
  }
});

app.delete("/artists/:id", async (request, response) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const id = request.params.id;
  console.log(id);

  let artistToDelete = artists.find((artist) => artist.id == id);
  if (!artistToDelete) {
    response.status(404).json({ error: "404! Page not found" });
  } else {
    console.log(artistToDelete);

    let position = artists.indexOf(artistToDelete);

    console.log(position);

    artists.splice(position, 1);

    fs.writeFile("data.json", JSON.stringify(artists));
    console.log();
    response.json(artists);
  }
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
