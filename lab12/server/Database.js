import MongoClient from "mongodb";
const url =
  "mongodb+srv://ChristopherJones:FeOJ8Xuur4wdNxBW@cluster0.yuzwq.mongodb.net";

export default class Database {
  connection;
  db = "lab11";
  collection = "books";

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
      .db(this.db)
      .collection(this.collection)
      .insertOne(record);

    return newRecord;
  }

  async readOne(isbn) {
    const result = await this.connection
      .db(this.db)
      .collection(this.collection)
      .findOne({ ISBN: isbn });

    return result;
  }

  async readMany(query) {
    const fetchedResults = await this.connection
      .db(this.db)
      .collection(this.collection)
      .find(query);

    const results = [];

    await fetchedResults.forEach((result) => {
      results.push(result);
    });

    return { books: results };
  }

  async updateOne(isbn, record) {
    await this.connection
      .db(this.db)
      .collection(this.collection)
      .updateOne({ ISBN: isbn }, { $set: record });

    return record;
  }

  async deleteOne(isbn) {
    const deletedRecord = await this.connection
      .db(this.db)
      .collection(this.collection)
      .deleteOne({ ISBN: isbn });

    return { books: deletedRecord.deletedCount };
  }
}
