import express from "express";
const router = express.Router()

router.post("/generate-report", (req, res) => {

  const { projectName, riskLevel } = req.body

  const report = {
    projectName,
    summary: "AI analysis completed for the project.",
    riskLevel,
    recommendations: [
      "Increase development resources",
      "Optimize cloud usage",
      "Monitor delivery timeline closely"
    ]
  }

  res.json(report)

})

export default router;