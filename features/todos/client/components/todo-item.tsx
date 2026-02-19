import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/types";
import { useState } from "react";
import TodoForm from "./todo-form";
import { Pencil, PencilOff, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteTodo } from "../../server/api/delete-todo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateTodo } from "../../server/api/update-todo";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  function toggleEdit() {
    setIsEdit((prev) => !prev);
  }

  async function handleDelete(id: number) {
    try {
      const res = await deleteTodo(id);

      toast.success(res.message);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function handleToggleComplete() {
    try {
      const res = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      toast.success(res.message);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div
      className={cn(
        " p-2 border bg-background  rounded-xl flex justify-between items-center transition-all",
        isEdit && "shadow-2xl scale-105",
      )}
    >
      {isEdit ? (
        <TodoForm
          todoId={todo.id}
          initialTodo={todo}
          onSuccess={() => {
            setIsEdit(false);
          }}
        />
      ) : (
        <div className="flex items-center gap-3 w-full ml-1">
          <Checkbox
            className="h-5 w-5 rounded-full"
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
          />

          <span
            className={cn(
              "transition-all",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.title}
          </span>
        </div>
      )}
      <div className={cn("flex")}>
        <Button onClick={toggleEdit} size={"icon"} variant={"ghost"}>
          {isEdit ? <PencilOff /> : <Pencil />}
        </Button>
        <Button
          onClick={() => handleDelete(todo.id)}
          size={"icon"}
          variant={"ghost"}
        >
          <Trash className="text-red-600" />
        </Button>
      </div>
    </div>
  );
}
