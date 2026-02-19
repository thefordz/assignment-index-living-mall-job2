import { Todo, UpdateTodoValues } from "@/lib/types";
import { BASE_TODOS_API_URL } from "./base-api";
import { ApiSuccess } from "@/lib/api-response";

export async function updateTodo(
  todoId: number,
  values: UpdateTodoValues,
): Promise<ApiSuccess<Todo>> {
  const res = await fetch(`${BASE_TODOS_API_URL}/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data: ApiSuccess<Todo> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update todo");
  }

  return data;
}
