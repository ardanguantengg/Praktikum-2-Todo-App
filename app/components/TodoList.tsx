'use client';

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void; // 👈 Pastikan tipe prop ini ada
};

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
        <p className="text-gray-500 text-sm">Tidak ada tugas.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Bagian Header List & Jumlah Item */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Daftar Tugas</h2>
        <span className="text-xs bg-gray-70 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {todos.length} item
        </span>
      </div>

      {/* Render Tiap TodoItem */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo} // 👈 Meneruskan fungsi ke TodoItem
          />
        ))}
      </ul>
    </div>
  );
}
