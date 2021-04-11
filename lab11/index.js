import express from "express";
import cors from "cors";
import Database from "./Database.js";
const app = express();
const port = 45030;

app.use(cors());
app.use(express.json());

app.put("/books/:ISBN", async (req, res, next) => {
  if (!req.body.title || !req.body.author || !req.body.description) {
    return res.sendStatus(400);
  }

  const database = new Database();
  await database.connect();

  const result = await database.createOne({
    ISBN: req.params.ISBN,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  await database.close();

  return res.json(result);
});

app.get("/books/:ISBN", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.readOne(req.params.ISBN);

  await database.close();

  return res.json(result ? result : { book: "not found" });
});

app.post("/books/search", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.readMany(req.query);
  await database.close();

  return res.json(result);
});

app.patch("/books/:ISBN", async (req, res, next) => {
  if (!req.body.title && !req.body.author && !req.body.description) {
    return res.sendStatus(400);
  }

  const database = new Database();
  await database.connect();

  const result = await database.updateOne(req.params.ISBN, req.body);

  await database.close();

  return res.json(result);
});

app.delete("/books/:ISBN", async (req, res, next) => {
  const database = new Database();
  await database.connect();

  const result = await database.deleteOne(req.params.ISBN);
  await database.close();

  return res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
