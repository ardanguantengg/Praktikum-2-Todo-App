import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { JwtUserPayload } from '../types';
import { sendError } from '../utils/response';

dotenv.config();

export const verifyToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        sendError(
            res,
            401,
            'Akses ditolak. Token tidak ditemukan!'
        );
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtUserPayload;

        req.user = decoded;

        next();
    } catch (error) {
        sendError(
            res,
            403,
            'Sesi tidak valid atau kedaluwarsa!'
        );
    }
};