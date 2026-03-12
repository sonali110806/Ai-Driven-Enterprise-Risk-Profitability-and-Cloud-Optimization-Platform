import express from "express";
const router = express.Router();

router.post("/ai-insight", (req, res) => {

  const { projectName, budget, timeline, complexity, cpuUsage, storageUsage } = req.body;

  let riskLevel = "Low";
  if (complexity === "High" || timeline < 3) {
    riskLevel = "High";
  }

  const estimatedProfit = budget * 0.2;

  let recommendations = [];

  if (cpuUsage < 20) {
    recommendations.push("EC2 instance underutilized – consider downsizing");
  }

  if (storageUsage < 30) {
    recommendations.push("Unused storage detected – clean up volumes");
  }

  res.json({
    projectName,
    riskLevel,
    estimatedProfit,
    cloudWasteDetected: cpuUsage < 20,
    recommendations,
    summary: "AI generated enterprise project insight"
  });

});

export default router;