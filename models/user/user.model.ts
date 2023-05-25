import { model, Schema, SchemaTypes } from "mongoose";

const USER_TABLE_NAME = "user";

const UserSchema = new Schema(
  {
    _id: SchemaTypes.ObjectId,
    email: SchemaTypes.String,
    password: SchemaTypes.String,
    name: SchemaTypes.String
  },
  {
    bufferTimeoutMS: 5000,
    strict: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      versionKey: false
    }
  }
);

export const UserModel = model(USER_TABLE_NAME, UserSchema);
