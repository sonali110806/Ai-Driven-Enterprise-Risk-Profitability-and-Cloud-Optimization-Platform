import express from "express";
const router = express.Router()

router.post("/cloud-analysis", (req, res) => {

  const { cpuUsage, storageUsage } = req.body

  let recommendations = []

  if (cpuUsage < 20) {
    recommendations.push("EC2 instance underutilized – consider downsizing")
  }

  if (storageUsage < 30) {
    recommendations.push("Unused storage detected – clean up volumes")
  }

  res.json({
    wasteDetected: cpuUsage < 20,
    recommendations,
    predictedMonthlyCost: 1200
  })

});

export default router;