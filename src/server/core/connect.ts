import mongoose from "mongoose";

export default function MongooseConnect() {
    mongoose.connect("mongodb://localhost:27017/gtav", { keepAlive: true })
    .then(() => console.log("[Mongoose] База данных подключена."))
    .catch((err) => console.error(err))
}