import mongoose from "mongoose";
import { MONGODB_URI, CLOUD_MONGODB_URI, NODE_ENV } from "#/utils/variables";

let DSN = MONGODB_URI;

if (NODE_ENV === "production") {
  DSN = CLOUD_MONGODB_URI;
}

mongoose
  .connect(DSN)
  .then(() => {
    console.log("db is connected, current env is: ", NODE_ENV);
  })
  .catch((err) => {
    console.log("db connection failed: ", err);
  });
