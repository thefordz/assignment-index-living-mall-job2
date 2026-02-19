import TodoForm from "@/features/todos/client/components/todo-form";
import { TodoList } from "@/features/todos/client/components/todo-list";
import { fetchTodos } from "@/features/todos/server/api/fetch-todos";

export default async function Home() {
  const res = await fetchTodos();
  const data = res?.data || [];

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold ">Todo List</h1>
      <TodoForm />
      <div className="border p-2 rounded-xl bg-secondary">
        <TodoList todos={data} />
      </div>
    </div>
  );
}
