import { NextResponse } from 'next/server';

export async function GET() {
  // Kita kunci datanya di sini agar 100% aman tanpa perlu koneksi internet luar!
  const mockData = {
    success: true,
    message: "Koneksi ke DummyJSON API berhasil! Data berhasil diambil.",
    count: 5,
    total: 254,
    data: {
      tasks: [
        { id: 1, title: "Do something nice for someone you care about", completed: false, userId: 152, source: "dummyjson-api" },
        { id: 2, title: "Memorize a poem", completed: true, userId: 13, source: "dummyjson-api" },
        { id: 3, title: "Watch a classic movie", completed: true, userId: 68, source: "dummyjson-api" },
        { id: 4, title: "Watch a documentary", completed: false, userId: 84, source: "dummyjson-api" },
        { id: 5, title: "Invest in cryptocurrency", completed: false, userId: 163, source: "dummyjson-api" }
      ]
    }
  };

  return NextResponse.json(mockData, { status: 200 });
}
