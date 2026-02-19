"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTodo } from "../../server/api/create-todo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/types";
import { updateTodo } from "../../server/api/update-todo";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoFormProps {
  todoId?: number;
  initialTodo?: Todo;
  onSuccess?: () => void;
}

export default function TodoForm({
  todoId,
  initialTodo,
  onSuccess,
}: TodoFormProps) {
  const isEdit = Boolean(todoId);

  const [title, setTitle] = useState(initialTodo?.title ?? "");
  const [isTitleError, setIsTitleError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTitle(initialTodo?.title ?? "");
  }, [initialTodo?.title]);

  async function handleSubmit() {
    if (!title?.trim()) {
      setIsTitleError("Title is required");
      return;
    }

    try {
      setIsLoading(true);
      setIsTitleError("");

      if (isEdit && todoId) {
        const res = await updateTodo(todoId, { title });
        toast.success(res.message);
      } else {
        const res = await createTodo({ title });
        toast.success(res.message);
        setTitle("");
      }

      router.refresh();
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex gap-2 w-full"
    >
      <div className="w-full space-y-2 ">
        <Input
          value={title}
          className={cn("rounded-xl", !isEdit && "h-12")}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          disabled={isLoading}
        />
        {isTitleError && <p className="text-red-600">{isTitleError}</p>}
      </div>

      {isEdit ? (
        <Button disabled={isLoading} variant={"ghost"} size={"icon"}>
          <Save className="text-green-800" />
        </Button>
      ) : (
        <Button className="rounded-xl h-12">Add</Button>
      )}
    </form>
  );
}
