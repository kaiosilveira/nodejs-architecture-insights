import dotEnv from "dotenv-safe";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import configureDb from "./db";
import * as userPipeline from "./user-pipeline";

dotEnv.config();

const app = express();
const PORT = 8080;

run();

async function run() {
  const { User } = await configureDb({
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    url: process.env.DB_URL
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // first transformation
  // - receive the user name
  // - validate it
  // - save to database
  // - sanitize the return
  // - answer to the caller
  app.post(
    "/api/v1.0.0/users",
    userPipeline.validate,
    userPipeline.save(User),
    userPipeline.sanitize
  );

  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server running at ${PORT}`);
  });
}
