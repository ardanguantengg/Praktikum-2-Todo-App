import Link from "next/link";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Todo List
            </h1>

            <p className="mt-1 text-zinc-500">
              Kelola tugas kamu dengan mudah
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </header>

        <TodoForm />

        <TodoList todos={todos} />
      </div>
    </main>
  );
}
