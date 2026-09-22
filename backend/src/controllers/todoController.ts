import express from 'express';
import { TodoModel } from '../models/todoModel';
import {
  sendSuccess,
  sendSuccessPagination,
  sendError
} from '../utils/response';

import type {
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoResponse
} from '../types';

type Request = express.Request;
type Response = express.Response;

// GET /api/todos
// Ambil semua todo dengan pagination
export const getTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user.id;

  const page = Math.max(Number(req.query.page) || 1, 1);
  const perPage = Math.min(
    Math.max(Number(req.query.perPage) || 10, 1),
    100
  );

  const offset = (page - 1) * perPage;

  try {
    const [todos, total] = await Promise.all([
      TodoModel.getByUserId(userId, perPage, offset),
      TodoModel.countByUserId(userId)
    ]);

    const data: TodoResponse[] = todos.map((todo) => ({
      id: todo.id,
      todo: todo.task,
      completed: Boolean(todo.is_completed)
    }));

    const totalPages = Math.ceil(total / perPage);

    sendSuccessPagination(
      res,
      200,
      'Data tugas berhasil diambil!',
      data,
      {
        page,
        perPage,
        total,
        totalPages
      }
    );
  } catch (error) {
    sendError(
      res,
      500,
      'Gagal mengambil data tugas.'
    );
  }
};

// POST /api/todos
// Tambah todo baru
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body as CreateTodoRequest;
  const userId = req.user.id;

  try {
    const insertId = await TodoModel.create(
      task,
      userId
    );

    sendSuccess(
      res,
      201,
      'Tugas berhasil ditambahkan!',
      {
        id: insertId,
        todo: task,
        completed: false
      }
    );
  } catch (error) {
    sendError(
      res,
      500,
      'Gagal menambahkan tugas.'
    );
  }
};

// PUT /api/todos/:id
// Update todo
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { task, is_completed } =
    req.body as UpdateTodoRequest;

  const userId = req.user.id;

  try {
    const affectedRows = await TodoModel.update(
      Number(id),
      task,
      is_completed,
      userId
    );

    if (affectedRows === 0) {
      sendError(
        res,
        404,
        'Tugas tidak ditemukan!'
      );
      return;
    }

    sendSuccess(
      res,
      200,
      'Tugas berhasil diperbarui!'
    );
  } catch (error) {
    sendError(
      res,
      500,
      'Gagal memperbarui tugas.'
    );
  }
};

// DELETE /api/todos/:id
// Hapus todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const affectedRows = await TodoModel.delete(
      Number(id),
      userId
    );

    if (affectedRows === 0) {
      sendError(
        res,
        404,
        'Tugas tidak ditemukan!'
      );
      return;
    }

    sendSuccess(
      res,
      200,
      'Tugas berhasil dihapus!'
    );
  } catch (error) {
    sendError(
      res,
      500,
      'Gagal menghapus tugas.'
    );
  }
};

// GET /api/todos/:id
// Ambil satu todo berdasarkan ID
export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const todo = await TodoModel.getById(
      Number(id),
      userId
    );

    if (!todo) {
      sendError(
        res,
        404,
        'Tugas tidak ditemukan!'
      );
      return;
    }

    const data: TodoResponse = {
      id: todo.id,
      todo: todo.task,
      completed: Boolean(todo.is_completed)
    };

    sendSuccess(
      res,
      200,
      'Data tugas berhasil diambil!',
      data
    );
  } catch (error) {
    sendError(
      res,
      500,
      'Gagal mengambil data.'
    );
  }
};