import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import dotenv from 'dotenv';

import type { RegisterRequest, LoginRequest } from '../types';
import { sendSuccess, sendError } from '../utils/response';

dotenv.config();

export const register = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { username, email, password } = req.body as RegisterRequest;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create(
            username,
            email,
            hashedPassword
        );

        sendSuccess(
            res,
            201,
            'Registrasi berhasil!'
        );
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            sendError(
                res,
                409,
                'Username atau Email sudah terdaftar!'
            );
            return;
        }

        sendError(
            res,
            500,
            'Error server.'
        );
    }
};

export const login = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const { username, password } = req.body as LoginRequest;

    try {
        const user = await UserModel.findByUsername(username);

        if (
            !user ||
            !(await bcrypt.compare(password, user.password))
        ) {
            sendError(
                res,
                401,
                'Username atau password salah!'
            );
            return;
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        );

        sendSuccess(
            res,
            200,
            'Login berhasil!',
            { token }
        );
    } catch (error) {
        sendError(
            res,
            500,
            'Error server.'
        );
    }
};