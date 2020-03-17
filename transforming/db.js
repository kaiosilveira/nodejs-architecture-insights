import mongoose from "mongoose";

async function configureDb({ url, port, name }) {
  const connection = await mongoose.connect(`${url}:${port}/${name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const user = connection.model("user", {
    name: String
  });

  const todo = connection.model(
    "todo",
    new mongoose.Schema({
      title: { type: String, required: true },
      description: String,
      ownerId: { type: mongoose.Types.ObjectId },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      completed: { type: Boolean, default: false }
    })
  );

  return { user, todo };
}

export default configureDb;
