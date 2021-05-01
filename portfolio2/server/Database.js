import MongoClient from "mongodb";
const url =
  "mongodb+srv://ChristopherJones:FeOJ8Xuur4wdNxBW@cluster0.yuzwq.mongodb.net";

export default class Database {
  connection;
  readDB = "sample_mflix";
  readCollection = "movies";
  writeDB = "portfolio2";
  writeCollection = "ChristopherJones";

  async connect() {
    this.connection = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    }).catch((err) => {
      console.log(err);
    });

    return this.connection;
  }

  async close() {
    await this.connection.close();
    this.connection = undefined;
  }

  async createOne(record) {
    const newRecord = await this.connection
      .db(this.writeDB)
      .collection(this.writeCollection)
      .insertOne(record);

    return newRecord;
  }

  async readOne(id) {
    const result = await this.connection
      .db(this.readDB)
      .collection(this.readCollection)
      .findOne({ "imdb.id": parseInt(id) });

    return result;
  }

  async readMany(query) {
    if (query === "all") {
      const fetchedResults = await this.connection
        .db(this.readDB)
        .collection(this.readCollection)
        .find({ type: "movie" })
        .limit(100);

      const results = [];

      await fetchedResults.forEach((result) => {
        results.push(result);
      });

      return { movies: results };
    } else if (query === "favorites") {
      const fetchedResults = await this.connection
        .db(this.writeDB)
        .collection(this.writeCollection)
        .find(query);

      const results = [];

      await fetchedResults.forEach((result) => {
        results.push(result);
      });

      return { movies: results };
    }
  }

  async updateOne(id, record) {
    delete record._id;

    await this.connection
      .db(this.writeDB)
      .collection(this.writeCollection)
      .updateOne({ "imdb.id": parseInt(id) }, { $set: record });

    return record;
  }

  async deleteOne(id) {
    const deletedRecord = await this.connection
      .db(this.writeDB)
      .collection(this.writeCollection)
      .deleteOne({ "imdb.id": parseInt(id) });

    return { movies: deletedRecord.deletedCount };
  }

  async deleteMany() {
    const deleteRecord = await this.connection
      .db(this.writeDB)
      .collection(this.writeCollection)
      .deleteMany();

    console.log(deleteRecord);
    return { movies: deleteRecord };
  }
}
