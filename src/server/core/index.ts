import MongooseConnect from "./connect";

mp.events.add("packagesLoaded", async () => {
    MongooseConnect(); //* Подключение базы данных
})