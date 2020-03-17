import Pipeline from "./pipeline";
import express from "express";

export default class Resource {
  static for({ entity, tag, supports }) {
    const pipeline = Pipeline.for(entity);
    const router = express.Router();

    Object.keys(supports).forEach(key => {
      const transformations = supports[key].map(
        transformation => pipeline[transformation]
      );
      router.route(`/${tag}s`)[key](...transformations);
    });

    // router
    //   .route(`/${tag}s`)
    //   .post(pipeline.validate, pipeline.save, pipeline.sanitize)
    //   .get(pipeline.list);

    return { router };
  }
}
