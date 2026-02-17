export type TodoStore = {
  todos: Todo[];
  idCounter: number;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type CreateTodoValues = {
  title: string;
};

export type UpdateTodoValues = {
  title?: string;
  completed?: boolean;
};
