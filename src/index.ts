import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import categoryRouter from "./routes/CategoryRoute";
import postRouter from "./routes/PostRoute";
import connectDB from "./utils/connectDB";

const app = express();
dotenv.config();

const corsOptions = {
  origin: config.get<string>("url"),
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,X-Requested-With,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", categoryRouter);
app.use("/api", postRouter);

// Rotas desconhecidas
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Trend Topics Brasil",
  });
});

// Global error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>("port");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // ? call the connectDB function here
  connectDB();
});
