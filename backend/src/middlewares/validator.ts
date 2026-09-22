import express from 'express';
import { sendError } from '../utils/response';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

// Validasi register
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    sendError(
      res,
      400,
      'Username dan password wajib diisi!'
    );
    return;
  }

  next();
};

// Validasi login
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    sendError(
      res,
      400,
      'Username dan password wajib diisi!'
    );
    return;
  }

  next();
};

// Validasi saat tambah todo
export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { task } = req.body;

  if (!task || typeof task !== 'string') {
    sendError(
      res,
      400,
      'Task wajib diisi dan harus berupa string!'
    );
    return;
  }

  next();
};

// Validasi saat update todo
export const validateUpdateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { task, is_completed } = req.body;

  if (task === undefined && is_completed === undefined) {
    sendError(
      res,
      400,
      'Isi minimal task atau is_completed!'
    );
    return;
  }

  if (task !== undefined && typeof task !== 'string') {
    sendError(
      res,
      400,
      'Task harus berupa string!'
    );
    return;
  }

  if (
    is_completed !== undefined &&
    typeof is_completed !== 'boolean'
  ) {
    sendError(
      res,
      400,
      'is_completed harus berupa true atau false!'
    );
    return;
  }

  next();
};