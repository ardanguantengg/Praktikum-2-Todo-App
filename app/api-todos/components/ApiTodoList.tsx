'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import { ApiResponse } from '@/types/api-todo';
import { Button } from '../../components/ui/button';

type ApiTodoListProps = {
  initialTodos: Todo[];
};

export default function ApiTodoList({ initialTodos }: ApiTodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(() => initialTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/todos');
      const json = (await res.json()) as ApiResponse<Todo[]>;
      if (json.success) {
        setTodos(json.data);
      } else {
        setError(json.message);
      }
    } catch {
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggle = useCallback(async (id: number) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !current.completed }),
      });
    } catch {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: current.completed } : t
        )
      );
    }
  }, [todos]);

  const handleDelete = useCallback(async (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
    } catch {
      fetchTodos();
    }
  }, [fetchTodos]);

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100" suppressHydrationWarning>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Daftar Tugas (API-Driven)
          </h1>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Total: {stats.total}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              Selesai: {stats.completed}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              Pending: {stats.pending}
            </span>
          </div>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            ⚠️ {error}
          </div>
        )}

        {todos.length === 0 && !loading && (
          <div className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-lg">Belum ada tugas.</p>
            <p className="text-sm mt-1">Data diambil dari DummyJSON API.</p>
          </div>
        )}

        <ul className="space-y-3 mt-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 rounded-md border flex items-center justify-between gap-3 transition-colors ${
                todo.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="w-5 h-5 rounded text-blue-500 cursor-pointer"
                  suppressHydrationWarning
                />
                <span
                  className={`text-lg ${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Mengambil data...</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Button onClick={fetchTodos} variant="outline">
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
