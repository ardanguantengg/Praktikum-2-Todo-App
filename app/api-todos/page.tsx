'use client';

import React, { useEffect, useState } from 'react';
import { getTasks } from '@/lib/tasks';
import ApiTodoList from './components/ApiTodoList';

//  KATA KUNCI 'export default' DI BAWAH INI WAJIB ADA AGAR ERROR HILANG!
export default function ApiTodosPage() {
  const [initialTasks, setInitialTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getTasks({ limit: 15, skip: 0 });
        setInitialTasks(result?.tasks || []);
      } catch (err) {
        console.error('Gagal mengambil data dari endpoint API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-700">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-700 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>
          {loading ? (
            <div className="text-center py-6 text-sm text-gray-500">
              Memuat data dari API DummyJSON...
            </div>
          ) : (
            <ApiTodoList initialTasks={initialTasks} />
          )}
        </div>
      </div>
    </main>
  );
}
