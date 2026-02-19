import { CreateTodoValues, Todo } from "@/lib/types";
import { BASE_TODOS_API_URL } from "./base-api";
import { ApiSuccess } from "@/lib/api-response";

export async function createTodo(
  values: CreateTodoValues,
): Promise<ApiSuccess<Todo>> {
  const res = await fetch(`${BASE_TODOS_API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data: ApiSuccess<Todo> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create todo");
  }

  return data;
}
