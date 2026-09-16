import pool from '../config/db';

export const TodoModel = {
  // Method dari praktikum sebelumnya untuk mengambil semua todo milik user tertentu
  getByUserId: async (userId: number): Promise<any[]> => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE user_id = ?',
      [userId]
    );
    return rows;
  },

  // Method dari praktikum sebelumnya untuk menambah todo baru
  create: async (task: string, userId: number): Promise<number> => {
    const [result]: any = await pool.query(
      'INSERT INTO todos (task, user_id) VALUES (?, ?)',
      [task, userId]
    );
    return result.insertId;
  },

  // Langkah 1: Update task atau status is_completed
  update: async (id: number, task: string, isCompleted: boolean, userId: number): Promise<number> => {
    const [result]: any = await pool.query(
      'UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?',
      [task, isCompleted, id, userId]
    );
    return result.affectedRows;
  },

  // Langkah 1: Hapus todo berdasarkan id dan userId
  delete: async (id: number, userId: number): Promise<number> => {
    const [result]: any = await pool.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  },

  // Langkah 10: Tambah GET Todo by ID
  getById: async (id: number, userId: number): Promise<any> => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0]; // Mengembalikan 1 data, atau undefined jika tidak ditemukan
  }
};
