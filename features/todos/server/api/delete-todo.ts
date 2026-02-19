"use server";
import { Todo } from "@/lib/types";
import { BASE_TODOS_API_URL } from "./base-api";
import { ApiSuccess } from "@/lib/api-response";
import { API_KEY } from "@/lib/constants";

export async function deleteTodo(todoId: number): Promise<ApiSuccess<Todo>> {
  const res = await fetch(`${BASE_TODOS_API_URL}/${todoId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data: ApiSuccess<Todo> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete todo");
  }

  return data;
}
