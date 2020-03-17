# NodeJS Architecture Insights

This is a research project which aims to experiment some architectural patterns in a NodeJS API and to understand how we can create simple, easy to maintain API's using NodeJS and the most common patterns in the architecture world.

**The problem**

There are two problems we are particularly interested to solve:

- Error handling across the boundaries of the system (Presentation level, Application level and so on)
- Schema validation across the boundaries of the system

**The scope**

To keep things simple and straightfoward, the scope of this project is a To-do CRUD. The to-do schema is the following:

```javascript
{
  title: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  ownerId: ID,
  completed: Boolean
}
```

We will be using MongoDB as our database and Mongoose as our ORM to manipulate data in and out.

**Domain rules**

In order to make us able to perform different levels of validation, we choose to add some simple domain rules, seen below:

- A client cannot update any field of the to-do after it was marked as completed, but he can toggle the "completed" flag
- It's not possible to update someone elses to-do
- The required fields are: Title and ownerId

**Patterns to try**

- Object-oriented programming with a DDD approach
- Transforming programming with a functional approach
- Finit state machine (probably used together with some of the above?)

**Avaliable scripts**

- `start-transforming`: start the app which implements the transforming programming model
