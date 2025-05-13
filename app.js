import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import estudiantesRoutes from './routes/estudiantesRoutes.js';

const makeApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado'));
  
  app.use('/api/auth', authRoutes);
  app.use('/api/estudiantes', estudiantesRoutes);

  return app
}

export default makeApp;
