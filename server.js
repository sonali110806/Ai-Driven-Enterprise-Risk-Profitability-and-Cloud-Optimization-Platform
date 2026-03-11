const express = require("express")

const app = express()

// Middleware
app.use(express.json())

// Import Routes
const aiInsightRoutes = require("./routes/aiInsightRoutes")
const projectRoutes = require("./routes/projectRoutes")
const cloudRoutes = require("./routes/cloudRoutes")
const projectDataRoutes = require("./routes/projectDataRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const reportRoutes = require("./routes/reportRoutes")

// Use Routes
app.use("/api", aiInsightRoutes)
app.use("/api", projectRoutes)
app.use("/api", cloudRoutes)
app.use("/api", projectDataRoutes)
app.use("/api", dashboardRoutes)
app.use("/api", reportRoutes)

// Default route (just to check server)
app.get("/", (req, res) => {
  res.send("Enterprise AI Platform API is running 🚀")
})

// Start Server
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
