import express from "express";
const router = express.Router()

router.post("/analyze-project", (req, res) => {

  const { projectSize, budget, timeline, teamSize, complexity } = req.body

  let riskLevel = "Low"

  if (complexity === "High" || timeline < 3) {
    riskLevel = "High"
  }

  const delayProbability = Math.floor(Math.random() * 50)

  const profit = budget * 0.2

  res.json({
    riskLevel,
    delayProbability,
    estimatedProfit: profit,
    mitigationAdvice: "Increase team size or extend timeline"
  })

})

export default router;