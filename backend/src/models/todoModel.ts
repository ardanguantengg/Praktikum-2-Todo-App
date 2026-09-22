import pool from '../config/db';

export const TodoModel = {
  // Mengambil todo milik user dengan pagination
  getByUserId: async (
    userId: number,
    limit: number,
    offset: number
  ): Promise<any[]> => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE user_id = ? LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );

    return rows;
  },

  // Menghitung jumlah seluruh todo milik user
  countByUserId: async (userId: number): Promise<number> => {
    const [rows]: any = await pool.query(
      'SELECT COUNT(*) AS total FROM todos WHERE user_id = ?',
      [userId]
    );

    return rows[0].total as number;
  },

  // Menambah todo baru
  create: async (task: string, userId: number): Promise<number> => {
    const [result]: any = await pool.query(
      'INSERT INTO todos (task, user_id) VALUES (?, ?)',
      [task, userId]
    );

    return result.insertId;
  },

  // Update task atau status is_completed
  update: async (
    id: number,
    task: string,
    isCompleted: boolean,
    userId: number
  ): Promise<number> => {
    const [result]: any = await pool.query(
      'UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?',
      [task, isCompleted, id, userId]
    );

    return result.affectedRows;
  },

  // Hapus todo berdasarkan id dan userId
  delete: async (
    id: number,
    userId: number
  ): Promise<number> => {
    const [result]: any = await pool.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    return result.affectedRows;
  },

  // Mengambil todo berdasarkan ID
  getById: async (
    id: number,
    userId: number
  ): Promise<any> => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    return rows[0];
  }
};