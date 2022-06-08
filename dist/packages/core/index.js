'use strict';

var path = require('path');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var mongoose__default = /*#__PURE__*/_interopDefaultLegacy(mongoose);

const dotenvConfig = dotenv.config({
    path: path__default["default"].resolve(".env")
});
console.log(dotenvConfig.parsed);

function MongooseConnect() {
    mongoose__default["default"].connect("mongodb://localhost:27017/gtav", { keepAlive: true })
        .then(() => console.log("[Mongoose] База данных подключена."))
        .catch((err) => console.error(err));
}

mp.events.add("packagesLoaded", async () => {
    MongooseConnect(); //* Подключение базы данных
});

class WorldTime {
    date;
    constructor() {
        this.changeWorldTime();
    }
    changeWorldTime() {
        this.date = new Date();
        this.date.setHours(this.date.getUTCHours() + 3);
        const hour = this.date.getHours(), minute = this.date.getMinutes(), seconds = this.date.getSeconds();
        setInterval(() => {
            mp.world.time.set(hour, minute, seconds);
        }, 1000);
    }
}
new WorldTime();
