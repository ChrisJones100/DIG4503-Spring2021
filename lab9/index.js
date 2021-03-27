import MongoClient from "mongodb";

const URL =
  "mongodb+srv://ChristopherJones:FeOJ8Xuur4wdNxBW@cluster0.yuzwq.mongodb.net";

MongoClient.connect(URL, { useUnifiedTopology: true })
  .then(connection => {
    let database = connection.db("sample_airbnb");
    let collection = database.collection("listingsAndReviews");

    let cursor = collection.find({
      "review_scores.review_scores_rating": { $gte: 99 },
      beds: { $gte: 5 },
      price: { $lte: 200 }
    });

    cursor.forEach(
      document => {
        console.log(document);
      },
      () => {
        connection.close();
      }
    );
  })

  .catch(error => {
    console.log("Error " + error);
  });
