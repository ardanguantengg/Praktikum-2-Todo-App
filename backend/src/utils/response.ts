import type { Response } from 'express';
import type { PaginationMeta, ResponseMeta } from '../types';

const createMeta = (): ResponseMeta => ({
  timestamp: new Date().toISOString(),
});

export const sendSuccess = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    meta: createMeta(),
  });
};

export const sendSuccessPagination = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data: T,
  pagination: PaginationMeta
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    meta: {
      ...createMeta(),
      pagination,
    },
  });
};

export const sendError = (
  res: Response,
  status: number,
  message: string,
  errors?: unknown
) => {
  return res.status(status).json({
    success: false,
    message,
    ...(errors !== undefined ? { errors } : {}),
    meta: createMeta(),
  });
};