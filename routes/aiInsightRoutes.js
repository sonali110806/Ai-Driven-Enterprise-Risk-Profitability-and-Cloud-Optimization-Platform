const express = require("express")
const router = express.Router()

router.post("/ai-insight", (req, res) => {

  const { projectName, budget, timeline, complexity, cpuUsage, storageUsage } = req.body

  // Risk analysis
  let riskLevel = "Low"
  if (complexity === "High" || timeline < 3) {
    riskLevel = "High"
  }

  // Profit estimation
  const estimatedProfit = budget * 0.2

  // Cloud analysis
  let recommendations = []

  if (cpuUsage < 20) {
    recommendations.push("EC2 instance underutilized – consider downsizing")
  }

  if (storageUsage < 30) {
    recommendations.push("Unused storage detected – clean up volumes")
  }

  // Final AI insight
  res.json({
    projectName,
    riskLevel,
    estimatedProfit,
    cloudWasteDetected: cpuUsage < 20,
    recommendations,
    summary: "AI generated enterprise project insight"
  })

})

module.exports = router