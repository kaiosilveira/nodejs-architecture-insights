import dotEnv from "dotenv-safe";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import configureDb from "./db";
import User from "./user";
import Resource from "./resource";

const userTag = "user";
const entities = { [userTag]: User };

dotEnv.config();

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

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const { router } = Resource.for({
    tag: userTag,
    entity: new entities[userTag]({ repo: repositories[userTag] }),
    supports: {
      get: ["list"],
      post: ["validate", "save", "sanitize"]
    }
  });

  app.use(`/${BASE_URL}/${API_VERSION}`, router);

  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server running at ${PORT}`);
  });
}
