import MongoClient from "mongodb";

const collectionName = "people";
const db = "lab10";
const URL =
  "mongodb+srv://ChristopherJones:FeOJ8Xuur4wdNxBW@cluster0.yuzwq.mongodb.net";

export default class Database {
  async connect() {
    this.connection = await MongoClient.connect(URL, {
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

  async createOne(firstName, lastName, favoriteColor) {
    const insertedPerson = { firstName, lastName, favoriteColor };

    const database = this.connection.db(db);
    const collection = database.collection(collectionName);

    await collection.insertOne(insertedPerson);

    return insertedPerson;
  }

  async readOne(firstName) {
    const database = this.connection.db(db);
    const collection = database.collection(collectionName);

    const result = await collection.findOne({ firstName });

    console.log({ result });

    return result;
  }
}
