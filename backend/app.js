import express, { request, response } from "express";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { log } from "console";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const data = await fs.readFile("data.json");
const artists = JSON.parse(data);

app.get("/", (req, res) => {
  res.render("../frontend/index.html");
});

app.get("/artists", async (req, res) => {
  // const data = await fs.readFile("data.json");
  // const artists = JSON.parse(data);
  console.log(artists);
  res.json(artists);
});

app.post("/artists", async (req, res) => {
  console.log(req.body);

  // const data = await fs.readFile("data.json");
  // const artists = JSON.parse(data);

  const newArtist = req.body;
  newArtist.id = uuidv4();

  artists.push(newArtist);

  fs.writeFile("data.json", JSON.stringify(artists));
  res.json(artists);
});

app.put("/artists/:id", async (req, res) => {
  const updatedArtist = req.body;
  console.log(updatedArtist);

  const id = req.params.id;

  let oldArtist = artists.find((artist) => artist.id == id);

  console.log(oldArtist);

  // if (!oldArtist) {
  //   res.status(404).send(`404! Page not found`);
  //   return;
  // }

  let position = artists.indexOf(oldArtist);

  console.log(position);

  updatedArtist.id = id;

  artists.splice(position, 1, updatedArtist);

  fs.writeFile("data.json", JSON.stringify(artists));
  res.json(artists);
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
