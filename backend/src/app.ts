import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import routes from './routes/index.js';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const app = express();

// CORS
app.use(
  cors({
    exposedHeaders: ['X-Request-Id']
  })
);

app.use(express.json());

// X-Request-Id + logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = crypto.randomUUID();

  res.setHeader('X-Request-Id', requestId);

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log(
      `[${requestId}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next();
});

// Route utama
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend Todo Praktikum Berjalan Mulus!',
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// Semua route dengan prefix /api
app.use('/api', routes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} tidak ditemukan!`,
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

// Global Error Handler
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error('Terjadi error:', err.message);

    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      meta: {
        timestamp: new Date().toISOString()
      }
    });
  }
);

export default app;