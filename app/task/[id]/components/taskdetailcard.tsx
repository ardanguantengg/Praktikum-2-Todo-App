import type { Todo } from "@/app/types/todo";

export default function TaskDetailCard({ todo }: { todo: Todo }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-zinc-900">
        {todo.title}
      </h1>

      <p className="mt-4 text-zinc-600">
        {todo.description}
      </p>

      <div className="mt-6 rounded-lg bg-zinc-100 p-4">
        <p className="font-medium">
          Status: {todo.completed ? "✅ Selesai" : "⏳ Belum selesai"}
        </p>
      </div>
    </div>
  );
}