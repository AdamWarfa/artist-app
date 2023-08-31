import express, { request, response } from "express";
import cors from "cors";
import fs from "fs/promises";
import { log } from "console";

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

app.post("/artists", async (req, res) => {
  console.log(req.body);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const newArtist = req.body;
  artists.push(newArtist);

  fs.writeFile("data.json", JSON.stringify(artists));
  res.json(artists);
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
