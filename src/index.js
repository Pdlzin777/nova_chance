import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import authRoutes from "./routes/auth.routes.js";
import empresaRoutes from "./routes/empresa.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(authRoutes);
app.use(empresaRoutes);
app.use(uploadRoutes);

export default app;
