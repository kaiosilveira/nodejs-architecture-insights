import Pipeline from "./pipeline";
import express from "express";

export default class Resource {
  static for({ tag, supports }) {
    const router = express.Router();

    Object.entries(supports).forEach(([key, stages]) => {
      router.route(`/${tag}s`)[key](...stages);
    });

    return { router };
  }
}
