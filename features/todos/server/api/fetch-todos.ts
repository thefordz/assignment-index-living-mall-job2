import { ApiSuccess } from "@/lib/api-response";
import { BASE_TODOS_API_URL } from "./base-api";
import { Todo } from "@/lib/types";

export async function fetchTodos(): Promise<ApiSuccess<Todo[]> | null> {
  const res = await fetch(`${BASE_TODOS_API_URL}`, {
    cache: "no-store",
  });
  const data: ApiSuccess<Todo[]> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch todos");
  }

  return data;
}
