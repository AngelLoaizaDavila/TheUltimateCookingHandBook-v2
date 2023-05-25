import mongoose, { connect, disconnect as mongooseDisconnect } from "mongoose";
require("dotenv").config();
export class MongoDB {
  static mongoAlreadyInit = false;

  static async init(params?: {
    MONGODB_HOST?: string;
    MONGODB_USER?: string;
    MONGODB_PASS?: string;
    MONGODB_NAME?: string;
    sslCA?: string;
    appName?: string;
  }) {
    if (MongoDB.mongoAlreadyInit) {
      console.log(MongoDB.mongoAlreadyInit)
      return;
    }

    mongoose.set("strictQuery", true);

    const host = params?.MONGODB_HOST || process.env.MONGODB_HOST || "";
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.udbqgft.mongodb.net/?retryWrites=true&w=majority`;
    await connect(uri);

    MongoDB.mongoAlreadyInit = true;
  }

  static async destroy() {
    if (MongoDB.mongoAlreadyInit) {
      console.log(MongoDB.mongoAlreadyInit)
      await mongooseDisconnect();
    }

    MongoDB.mongoAlreadyInit = false;
  }
}
