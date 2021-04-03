import express from "express";
import Database from "./Database.js";

const app = express();
app.use(express.json());

const POST = 45030;

app.get("/people/:person", async (req, res) => {
  console.log({ req });

  const database = new Database();

  await database.connect();

  const result = await database.readOne(req.params.person);

  await database.close();

  if (result) {
    res.json(result);
  } else {
    res.json({ person: "Not found." });
  }
});

app.put("/people/create", async (req, res) => {
  const { body } = req;

  console.log({ body });

  const { firstName, lastName, favoriteColor } = body;

  const database = new Database();

  await database.connect();

  const createdPerson = await database.createOne(
    firstName,
    lastName,
    favoriteColor
  );

  await database.close();

  res.json(createdPerson);
});

app.listen(POST, () => {
  console.log(`Example app listening at http://localhost:${POST}`);
});
