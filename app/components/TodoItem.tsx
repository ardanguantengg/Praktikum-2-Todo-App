import Link from "next/link";
import type { Todo } from "../types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          {todo.title}
        </h3>

        <span>
          {todo.completed ? "? Selesai" : "? Belum selesai"}
        </span>
      </div>

      <p className="mt-2 text-zinc-600">
        {todo.description}
      </p>

      <Link
        href={`/task/${todo.id}`}
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        Lihat Detail ?
      </Link>
    </div>
  );
}
