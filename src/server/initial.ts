import path from "path";
import { config } from "dotenv";

const dotenvConfig = config({
    path: path.resolve(".env")
});

console.log(dotenvConfig.parsed);
