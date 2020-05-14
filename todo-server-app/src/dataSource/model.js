const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }