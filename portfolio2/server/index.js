import express from "express";
import cors from "cors";
import Database from "./Database.js";

const port = 45030;

const app = express();
app.use(cors());
app.use(express.json());

app.put("/favorites", async (req, res, next) => {
  if (!req.body.imdb.id) {
    return res.sendStatus(400);
  }

  const database = new Database();
  await database.connect();

  delete req.body._id;

  const result = await database.createOne(req.body);

  await database.close();

  return res.json(result);
});

app.get("/movies", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const { movies } = await database.readMany("all");

  await database.close();

  return res.json(movies ? movies : { movies: "not found" });
});

app.get("/favorites", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const { movies } = await database.readMany("favorites");

  await database.close();

  return res.json(movies ? movies : { movies: "not found" });
});

app.get("/movies/:id", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.readOne(req.params.id);

  await database.close();

  return res.json(result ? result : { movie: "not found" });
});

app.post("/books/search", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.readMany(req.query);
  await database.close();

  return res.json(result);
});

app.patch("/favorites/:id", async (req, res, next) => {
  if (!req.body.completed) {
    return res.sendStatus(400);
  }

  const database = new Database();
  await database.connect();

  const result = await database.updateOne(req.params.id, req.body);

  await database.close();

  return res.json(result);
});

app.delete("/favorites/:id", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.deleteOne(req.params.id);
  await database.close();

  return res.json(result);
});

app.delete("/favorites", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.deleteMany();
  await database.close();

  return res.json(result);
});

app.listen(port, () => {
  console.log(
    `🎊  My super-duper ultra-cool web server is listening at http://localhost:${port}... 🎊`
  );
});
