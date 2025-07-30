import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnection } from './database/dbconnection.js';
import { errorMiddleware } from './database/error/error.js';
import reservationRouters from './routes/reservationroutes.js';

const app = express();

// ✅ Load environment variables
dotenv.config({ path: './config/config.env' });

// ✅ Define allowed origins
const allowedOrigins = [
  'https://debansu.netlify.app',
  'https://debansumern1.netlify.app',
  'http://localhost:5173' // Optional for local development
];

// ✅ Apply dynamic CORS check
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  credentials: true
}));

// ✅ Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route registration
app.use("/api/v1/reservation", reservationRouters);

// ✅ Default route
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Hello World"
  });
});

// ✅ Connect to database
dbconnection();

// ✅ Global error handler
app.use(errorMiddleware);

export default app;