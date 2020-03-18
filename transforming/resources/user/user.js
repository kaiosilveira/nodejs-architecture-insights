export default class User {
  constructor({ repo }) {
    this.repo = repo;

    this.validate = this.validate.bind(this);
    this.sanitize = this.sanitize.bind(this);
    this.createAsync = this.createAsync.bind(this);
    this.listAsync = this.listAsync.bind(this);
  }

  validate(obj) {
    console.log(">> validate called", obj);

    if (!obj.name) {
      return { error: true, reason: "Invalid user name" };
    }

    return obj;
  }

  sanitize(obj) {
    console.log(">> sanitize called", obj);

    const { _id, name } = obj;
    return { _id, name };
  }

  async createAsync(obj) {
    console.log(">> create called", obj);
    return await this.repo.create(obj);
  }

  async listAsync() {
    return await this.repo.find();
  }
}
