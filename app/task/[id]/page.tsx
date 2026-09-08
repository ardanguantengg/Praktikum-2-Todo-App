import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodoById } from "@/lib/todos";
import TaskDetailCard from "./components/taskdetailcard";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const todo = await getTodoById(Number(id));

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Kembali ke Todo List
        </Link>

        <TaskDetailCard todo={todo} />
      </div>
    </main>
  );
}