import User from "./user";

export default function userResource({ tags, repositories, artifacts }) {
  const user = new User({ repo: repositories[tags.user] });
  const router = artifacts.express.Router();

  router.route(`/users`).post(async (req, res, next) => {
    const created = user => res.status(201).json(user)
    req.body
      |> user.validate
      |> user.createAsync
      |> await #
      |> user.sanitize
      |> created;
  });

  return { router };
}
