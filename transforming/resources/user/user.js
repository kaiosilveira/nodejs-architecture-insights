export default class User {
  constructor({ repo }) {
    this.repo = repo;

    this.validate = this.validate.bind(this);
    this.sanitize = this.sanitize.bind(this);
    this.createAsync = this.createAsync.bind(this);
    this.listAsync = this.listAsync.bind(this);
  }

  validate(obj) {
    if (!obj.name) {
      return { error: true, reason: "Invalid user name" };
    }

    return { ok: true, value: { name: obj.name } };
  }

  sanitize(obj) {
    const { _id, name } = obj;
    return { _id, name };
  }

  async createAsync(obj) {
    return await this.repo.create(obj);
  }

  async listAsync() {
    return await this.repo.find();
  }
}
