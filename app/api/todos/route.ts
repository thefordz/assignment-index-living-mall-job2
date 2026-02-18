import { apiResponse, internalServerError } from "@/lib/api-response";
import { createTodo, getTodos } from "@/lib/todo-store";
import { CreateTodoValues } from "@/lib/types";

export async function GET() {
  try {
    const todos = getTodos();
    return apiResponse({ data: todos, status: 201 });
  } catch (error) {
    console.error("[GET /todos error]:", error);
    return internalServerError();
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateTodoValues;

    if (!body.title.trim()) {
      return apiResponse({ message: "Title is required", status: 400 });
    }

    const todo = createTodo(body);

    return apiResponse({
      data: todo,
      message: `Created ${todo.title} successfully`,
    });
  } catch (error) {
    console.error("[POST /todos error]:", error);
    return internalServerError();
  }
}
