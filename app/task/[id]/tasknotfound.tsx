export default function TaskNotFound() {
  return (
    <div className="rounded-xl bg-white p-8 text-center shadow">
      <h2 className="text-2xl font-bold text-zinc-900">
        Todo tidak ditemukan
      </h2>

      <p className="mt-2 text-zinc-500">
        Todo yang kamu cari tidak tersedia.
      </p>
    </div>
  );
}