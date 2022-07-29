import { consoleColor } from "@/../shared/contansts";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const port = 1337;

app.get("/test", (req: any, res: any) => {
  res.send("Test");
});

app.listen(port, () =>
  console.log(
    `${consoleColor.Yellow}[Express]${consoleColor.Reset} Сервер запустился на http://localhost:${consoleColor.Green}${port}${consoleColor.Reset} url.`
  )
);
