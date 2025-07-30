import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnection } from './database/dbconnection.js';
import { errorMiddleware } from './database/error/error.js';
import reservationRouters from './routes/reservationroutes.js';

const app = express();

// ✅ Load environment variables
dotenv.config({ path: './config/config.env' });

// ✅ Apply CORS globally (recommended approach)
app.use(cors({
 origin: 'https://debansu.netlify.app', // ✅ matches your frontend's port
  methods: ['POST', 'OPTIONS'],
  credentials: true
}));
// ✅ Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route registration
app.use("/api/v1/reservation", reservationRouters);

app.get("/",(req,res,next)=>{return res.status(200).json({
  success:true,
  message: "Hello World"
})})
// ✅ Database connection
dbconnection();

// ✅ Error middleware
app.use(errorMiddleware);

export default app;