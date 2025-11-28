// same as index.ts
// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js app URL
    credentials: true,
  })
);
app.use(express.json());

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// TODO: mount routes later, e.g.
// import subscriptionsRouter from "./routes/subscriptions";
// app.use("/api/subscriptions", subscriptionsRouter);

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  await testConnection(); // optional: remove later once stable
});
