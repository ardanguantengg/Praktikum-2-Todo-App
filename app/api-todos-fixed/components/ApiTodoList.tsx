'use client';

import React, { useState } from 'react';

interface ApiTodoListProps {
  initialTasks: any[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<any[]>(initialTasks);

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Daftar Tugas</h2>
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-400 text-sm">Tidak ada tugas yang ditemukan.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                task.completed
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-white border-gray-100 hover:border-blue-400/30 shadow-sm'
              }`}
            >
              {/* Sisi Kiri: Checkbox & Judul Tugas */}
              <div className="flex items-center gap-3.5 flex-1 pr-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600 rounded"
                />
                <p
                  className={`text-sm font-medium transition-all ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {task.todo} {/* 👈 Menggunakan field 'todo' dari DummyJSON */}
                </p>
              </div>

              {/* Sisi Kanan: Badges Warna-warni untuk Laporan */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                  ID: #{task.id}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">
                  User: #{task.userId}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    task.completed
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-amber-100 text-amber-700 border-amber-200'
                  }`}
                >
                  {task.completed ? 'Selesai' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
