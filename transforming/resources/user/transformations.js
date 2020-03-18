import * as commons from "../../transformations";

export const logUserName = (req, res, next) => {
  if (Array.isArray(req.payload)) {
    req.payload.forEach(user => console.log(`>> User name is: ${user.name}`));
  } else {
    console.log(`>> User name is: ${req.payload.name}`);
  }
  next();
};

export default function({ entity }) {
  return {
    ok: commons.ok,
    created: commons.created,
    list: commons.list(entity),
    save: commons.save(entity),
    validate: commons.validate(entity),
    sanitize: commons.sanitize(entity),
    logUserName
  };
}
