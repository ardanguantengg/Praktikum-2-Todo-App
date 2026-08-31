"use client";

import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    alert("Todo berhasil ditambahkan!");
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Tambah Todo
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan todo..."
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Tambah
        </button>
      </div>
    </form>
  );
}
