const mongoose = require('mongoose')

const { Todo } = require('./model')

const list = async () => {
  try {
    const todos = await Todo.find()
    if (!todos) return []
    return todos
  } catch (err) {
    console.log(`Error in list todos: ${err}`)
  }
}

const create = async input => {
  const newTodo = new Todo({
    id: input.id,
    text: input.text,
    completed: input.completed,
  })
  try {
    await newTodo.save()
    return newTodo
  } catch (err) {
    console.log(`Error in create todo with text ${input.text}: ${err}`)
  }
}

const remove = async input => {
  try {
    if (!input.id) return
    const removedTodo = await Todo.findOneAndDelete({ id: input.id })
    return removedTodo
  } catch (err) {
    console.log(`Error in remove todo with id ${input.id}: ${err}`)
  }
}

const update = async input => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: input.id },
      { text: input.text, completed: input.completed },
      { new: true }
    )
    return updatedTodo
  } catch (err) {
    console.log(
      `Error in update todo with id ${input.id} and text ${input.text}: ${err}`
    )
  }
}

const toggle = async input => {
  try {
    // 1. Find todo that needs to be toggled in database
    const toggleTodo = await Todo.findOne({ id: input.id })
    // 2. Update the completed flag of that todo in the database
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: toggleTodo.id },
      { text: toggleTodo.text, completed: !toggleTodo.completed },
      { new: true }
    )
    return updatedTodo
  } catch (err) {
    console.log(`Error in toggle with id ${input.id}: ${err}`)
  }
}

module.exports = { list, create, remove, update, toggle }
