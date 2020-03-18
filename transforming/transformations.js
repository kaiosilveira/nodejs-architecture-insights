export const validate = entity => (req, res, next) => {
  const validated = entity.validate(req.body);
  if (validated.error) {
    return res.status(400).json({ error: true, reason: validated.reason });
  } else {
    req.payload = validated.value;
    next();
  }
};

export const list = entity => async (req, res, next) => {
  try {
    req.payload = await entity.listAsync();
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: true, reason: "Unexpected error" });
  }
};

export const save = entity => async (req, res, next) => {
  try {
    req.payload = await entity.createAsync(req.payload);
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: true, reason: "Unexpected error" });
  }
};

export const sanitize = entity => (req, _, next) => {
  if (Array.isArray(req.payload)) {
    req.payload = req.payload.map(entity.sanitize);
  } else {
    req.payload = entity.sanitize(req.payload);
  }

  next();
};

export const ok = (req, res) => {
  return res.status(200).json(req.payload);
};

export const created = (req, res) => {
  return res.status(201).json(req.payload);
};
