export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />

        <p className="text-zinc-600">
          Loading Todo...
        </p>
      </div>
    </main>
  );
}