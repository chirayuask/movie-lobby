import mongoose from "mongoose";
import { secretKeys } from "../Config/env";

mongoose.Promise = global.Promise;


mongoose.connect(`mongodb://127.0.0.1:27017/${secretKeys.MONGO_DATABASE_NAME}`)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));