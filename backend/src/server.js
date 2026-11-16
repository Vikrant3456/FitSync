import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import activityRoutes from './routes/activity.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import path from 'path';
const __dirname = path.resolve();

const app = express();

// Allow any origin – safe for local development
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/analytics', analyticsRoutes);

// Production static serving (unchanged)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Listen on all interfaces (still fine for localhost)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});