import Resource from "../../resource";
import User from "./user";
import transformations from "./transformations";

export default function userResource({ tags, repositories, artifacts }) {
  const entity = new User({ repo: repositories[tags.user] });
  const {
    ok,
    created,
    list,
    validate,
    save,
    sanitize,
    logUserName
  } = transformations({
    entity
  });

  return Resource.for({
    router: artifacts.express.Router(),
    tag: tags.user,
    supports: {
      get: [list, sanitize, logUserName, ok],
      post: [validate, save, logUserName, sanitize, created]
    }
  });
}
