import express from "express";
import db from "../database/database_schema.js";

import projectRoutes from "./routes/projectRoutes.js";
import aiInsightRoutes from "./routes/aiInsightRoutes.js";
import cloudRoutes from "./routes/cloudRoutes.js";
import projectDataRoutes from "./routes/projectDataRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
const { connectDB } = db;


// Middleware
app.use(express.json());                  
connectDB();

app.use("/api/analyze", projectRoutes);
app.use("/api/ai", aiInsightRoutes);
app.use("/api/cloud", cloudRoutes);
app.use("/api/project-data", projectDataRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/report", reportRoutes);

// Default route (just to check server)
app.get("/", (req, res) => {
  res.send("Server working");
});

// Start Server
const PORT = 8080;
                                  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
