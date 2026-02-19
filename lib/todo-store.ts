import { CreateTodoValues, TodoStore, UpdateTodoValues } from "@/lib/types";

const globalStore = globalThis as unknown as {
  todoStore: TodoStore;
};

if (!globalStore.todoStore) {
  globalStore.todoStore = {
    todos: [],
    idCounter: 1,
  };
}

const store = globalStore.todoStore;

export function getTodos() {
  return store.todos;
}

export function getTodoById(id: number) {
  return store.todos.find((todo) => todo.id === id);
}

export function createTodo(values: CreateTodoValues) {
  const newTodo = {
    id: store.idCounter++,
    title: values.title,
    completed: false,
  };

  store.todos.unshift(newTodo);
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
  const index = store.todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return false;
  }

  const deleted = store.todos[index];
  store.todos.splice(index, 1);
  return deleted;
}
