const express = require("express");
const app = express();

app.use(express.json());

const AIReport = require("./aiReportModel");
const Project = require("./projectModel");
const CloudUsage = require("./cloudUsageModel");


// Store AI Analysis Result
app.post("/addAIReport", async (req, res) => {
  try {
    const report = new AIReport(req.body);
    await report.save();

    res.json({
      message: "AI report stored successfully",
      data: report
    });
  } catch (error) {
    res.status(500).json({
      message: "Error storing AI report"
    });
  }
});
