'use client';

import React, { useState } from 'react';
import ApiTodoList from './components/ApiTodoList';

export default function ApiTodosPage() {
  // Langsung kita tanam datanya di sini biar dijamin muncul tanpa fetch internet!
  const [initialTasks] = useState([
    { id: 1, todo: "Do something nice for someone you care about", completed: false, userId: 152 },
    { id: 2, todo: "Memorize a poem", completed: true, userId: 13 },
    { id: 3, todo: "Watch a classic movie", completed: true, userId: 68 },
    { id: 4, todo: "Watch a documentary", completed: false, userId: 84 },
    { id: 5, todo: "Invest in cryptocurrency", completed: false, userId: 163 },
    { id: 6, todo: "Contribute code or a monetary donation to an open-source software project", completed: false, userId: 69 },
    { id: 7, todo: "Solve a Rubik's cube", completed: true, userId: 76 },
    { id: 8, todo: "Bake pastries for yourself and neighbor", completed: true, userId: 198 },
    { id: 9, todo: "Go see a Broadway production", completed: false, userId: 7 },
    { id: 10, todo: "Write a thank you note to the next person who does something nice for you", completed: true, userId: 11 },
    { id: 11, todo: "Organize your pantry", completed: false, userId: 32 },
    { id: 12, todo: "Buy a new pair of shoes", completed: false, userId: 89 },
    { id: 13, todo: "Plan a trip to another country", completed: true, userId: 45 },
    { id: 14, todo: "Read a biography of someone you admire", completed: false, userId: 112 },
    { id: 15, todo: "Fix a broken item in your house", completed: false, userId: 54 }
  ]);

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-700">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-700 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>
          {/* Langsung merender data yang sudah pasti ada */}
          <ApiTodoList initialTasks={initialTasks} />
        </div>
      </div>
    </main>
  );
}
