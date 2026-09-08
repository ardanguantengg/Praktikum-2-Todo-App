import type { Todo } from "@/app/types/todo";

export const todos: Todo[] = [
  {
    id: 1,
    title: "Belajar Next.js",
    description: "Mempelajari Next.js App Router.",
    completed: false,
  },
  {
    id: 2,
    title: "Mengerjakan Praktikum 2",
    description: "Menyelesaikan tugas Todo App.",
    completed: true,
  },
  {
    id: 3,
    title: "Push ke GitHub",
    description: "Upload project ke GitHub.",
    completed: false,
  },
];

export async function getTodos(): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return todos;
}

export async function getTodoById(id: number): Promise<Todo | undefined> {
  return todos.find((todo) => todo.id === id);
}