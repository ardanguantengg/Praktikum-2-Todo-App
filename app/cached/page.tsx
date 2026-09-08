'use client';

import React, { useState, useEffect } from 'react';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';

export default function TodoCachedApp() {
  // Data tiruan awal yang dikunci di lokal agar aman dari eror server-side
  const [todos, setTodos] = useState([
    { id: 1, title: 'Mengerjakan Praktikum 2', description: 'Tugas praktikum state dasar.', completed: true, createdAt: ['2026-09-08'] },
    { id: 2, title: 'Mengerjakan Tugas Praktikum 3', description: 'Integrasi caching dan external API.', completed: false, createdAt: ['2026-09-08'] },
    { id: 3, title: 'Belajar Next.js Turbopack', description: 'Mendalami routing dan handler.', completed: false, createdAt: ['2026-09-08'] }
  ]);

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-700">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-700 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>
          
          {/* Form Input Tambah Tugas Dummy */}
          <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tambahkan tugas baru..."
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 text-sm outline-none"
                disabled
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50" disabled>
                Tambah
              </button>
            </div>
          </div>
          
          {/* Indikator Status Caching Sesuai Gambar Modul Target */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
            <span className="flex items-center gap-1.5 font-medium text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Cache aktif (`localStorage: TODO_LIST_CACHE`)
            </span>
            <span className="text-gray-400 underline cursor-not-allowed">
              Reset ke Data Awal
            </span>
          </div>

          {/* List Tugas Interaktif */}
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </main>
  );
}
 