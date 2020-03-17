const validateUser = (user, { successFn, errorFn }) => {
  if (!user.name) {
    return errorFn();
  }

  return successFn(user);
};

export const validate = (req, res, next) => {
  validateUser(req.body, {
    successFn: user => {
      req.user = user;
      next();
    },
    errorFn: () =>
      res.status(400).json({ error: true, reason: "Invalid user name" })
  });
};

export const save = User => async (req, res, next) => {
  try {
    const created = await User.create(req.user);
    req.created = created;
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: true, reason: "Unexpected error" });
  }
};

export const sanitize = (req, res) => {
  const { _id, name } = req.created;
  return res.status(201).json({ _id, name });
};
