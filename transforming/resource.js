import Pipeline from "./pipeline";
import express from "express";

export default class Resource {
  static for({ entity, tag }) {
    const pipeline = Pipeline.for(entity);
    const router = express.Router();
    router
      .route(`/${tag}s`)
      .post(pipeline.validate, pipeline.save, pipeline.sanitize)
      .get(pipeline.list);

    return { router };
  }
}
