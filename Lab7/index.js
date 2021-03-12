import Express from "express";

const App = Express();
const port = 45030;

const names = [
  "Cortney",
  "Dewayne",
  "Trenton",
  "Pamala",
  "Ettie",
  "Errol",
  "Lorrie",
  "Hang",
  "Lauryn",
  "Caterina",
  "Isa",
  "Marcela"
];

App.get("/people/:person", (req, res) => {
  let result = { name: "Not found!" };
  names.forEach((value) => {
    if (req.params.person == value) {
      result = { name: value };
    }
  });

  res.json(result)
});

App.get("/search/:name", (req, res) => {
  let result = { search: ["Not found!"] };
  let nameResult = [];

  names.forEach((value) => {
    if (value.includes(req.params.name)) {
      nameResult.push(value);
    }
  });

  if (nameResult.length > 0) {
    result = { name: nameResult };
  }
  res.json(result);
});

App.listen(port, () => {
  console.log("Server running!");
});
