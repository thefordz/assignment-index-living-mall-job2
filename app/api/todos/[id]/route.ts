import { apiResponse, internalServerError } from "@/lib/api-response";
import { deleteTodo, getTodoById, updateTodo } from "@/lib/todo-store";
import { UpdateTodoValues } from "@/lib/types";
import { parseNumberId } from "@/lib/utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const numberId = parseNumberId(id);

    if (numberId === null) {
      return apiResponse({ message: "Invalid ID", status: 400 });
    }

    const todo = getTodoById(numberId);

    if (!todo) {
      return apiResponse({ message: "Todo not found", status: 404 });
    }

    return apiResponse({ data: todo, status: 200 });
  } catch (error) {
    console.error("[GET /todos/[id] error]:", error);
    return internalServerError();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const numberId = parseNumberId(id);

    if (numberId === null) {
      return apiResponse({ message: "Invalid ID", status: 400 });
    }

    const body = (await request.json()) as UpdateTodoValues;

    const updated = updateTodo(numberId, body);

    if (!updated) {
      return apiResponse({ message: "Todo not found", status: 404 });
    }

    return apiResponse({
      data: updated,
      message: `Updated ${updated.title} successfully`,
      status: 200,
    });
  } catch (error) {
    console.error("[PUT /todos/[id] error]:", error);
    return internalServerError();
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const numberId = parseNumberId(id);

    if (numberId === null) {
      return apiResponse({ message: "Invalid ID", status: 400 });
    }

    const deleted = deleteTodo(numberId);

    if (!deleted) {
      return apiResponse({ message: "Todo not found", status: 404 });
    }

    return apiResponse({ message: `Deleted ${deleted.title} successfully` });
  } catch (error) {
    console.error("[DELETE /todos/[id] error]:", error);
    return internalServerError();
  }
}
