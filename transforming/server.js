import dotEnv from "dotenv-safe";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import configureDb from "./db";
import userResource from "./resources/user";

const tags = { user: "user" };

dotEnv.config();

const artifacts = { express };

const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;
const BASE_URL = process.env.BASE_URL;

run();

async function run() {
  const repositories = await configureDb({
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    url: process.env.DB_URL
  });

  const { router } = userResource({ tags, repositories, artifacts });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(`/${BASE_URL}/${API_VERSION}`, router);

  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server running at ${PORT}`);
  });
}
