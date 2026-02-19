"use client";

import { Todo } from "@/lib/types";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.length > 0 && (
        <p className="text-center ">
          You have {todos.length} todo{todos.length > 1 && "s"}
        </p>
      )}
      {todos && todos.length > 0 ? (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-3 text-center">
          Todos not found.
        </p>
      )}
    </div>
  );
}
