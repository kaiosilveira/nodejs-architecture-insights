export const validate = entity => (req, res, next) => {
  const validated = entity.validate(req.body);
  if (validated.error) {
    return res.status(400).json({ error: true, reason: validated.reason });
  } else {
    req.validated = validated.value;
    next();
  }
};

export const list = entity => async (_, res) => {
  try {
    const result = await entity.listAsync();
    res.status(200).json(result);
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: true, reason: "Unexpected error" });
  }
};

export const save = entity => async (req, res, next) => {
  try {
    req.created = await entity.createAsync(req.validated);
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: true, reason: "Unexpected error" });
  }
};

export const sanitize = entity => (req, res) => {
  return res.status(201).json(entity.sanitize(req.created));
};

export default class PipelineFactory {
  static for(entity) {
    return {
      validate: validate(entity),
      save: save(entity),
      list: list(entity),
      sanitize: sanitize(entity)
    };
  }
}
