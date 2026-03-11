const express = require("express")
const router = express.Router()

router.get("/dashboard", (req, res) => {

  const insights = {
    totalProjects: 5,
    highRiskProjects: 2,
    predictedProfit: 50000,
    cloudSavings: 1200
  }

  res.json(insights)

})

module.exports = router