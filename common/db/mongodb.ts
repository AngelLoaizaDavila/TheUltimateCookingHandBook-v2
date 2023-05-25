import mongoose, { connect, disconnect as mongooseDisconnect } from "mongoose";

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
      return;
    }

    mongoose.set("strictQuery", true);

    const host = params?.MONGODB_HOST || process.env.MONGODB_HOST || "";

    await connect(host, {
      user: params?.MONGODB_USER || process.env.MONGODB_USER,
      pass: params?.MONGODB_PASS || process.env.MONGODB_PASS,
      dbName: params?.MONGODB_NAME || process.env.MONGODB_NAME,
      ssl: true,
      sslCA: params?.sslCA || "rds-combined-ca-bundle.pem",
      replicaSet: "rs0",
      readPreference: "secondaryPreferred",
      retryWrites: false,
      appName: params?.appName || process.env.AWS_LAMBDA_FUNCTION_NAME || "v2",
      driverInfo: {
        name: params?.appName || process.env.AWS_LAMBDA_FUNCTION_NAME || "v2",
      },
    });

    MongoDB.mongoAlreadyInit = true;
  }

  static async destroy() {
    if (MongoDB.mongoAlreadyInit) {
      await mongooseDisconnect();
    }

    MongoDB.mongoAlreadyInit = false;
  }
}