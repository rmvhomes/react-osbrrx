const db = require('../dataSource/db')

const Query = {
  listTodos: () => db.list(),
}

const Mutation = {
  createTodo: (_, args) => db.create(args.input),
  deleteTodo: (_, args) => db.remove(args.input),
  updateTodo: (_, args) => db.update(args.input),
  toggleCompletion: (_, args) => db.toggle(args.input),
}

module.exports = { Query, Mutation }