import { CreateTodoValues, Todo, UpdateTodoValues } from "@/lib/types";

const todos: Todo[] = [];
let idCounter = 1;

export function getTodos() {
  return todos;
}

export function getTodoById(id: number) {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(values: CreateTodoValues) {
  const newTodo = {
    id: idCounter++,
    title: values.title,
    completed: false,
  };

  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, values: UpdateTodoValues) {
  const todo = getTodoById(id);

  if (!todo) {
    return null;
  }

  if (values.title !== undefined) {
    todo.title = values.title;
  }
  if (values.completed !== undefined) {
    todo.completed = values.completed;
  }

  return todo;
}

export function deleteTodo(id: number) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
