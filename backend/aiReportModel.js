const mongoose = require("./database");

const AIReportSchema = new mongoose.Schema({
  project_name: String,
  risk_score: Number,
  profitability_score: Number,
  delay_probability: Number,
  cost_overrun_probability: Number,
  predicted_risk_level: String,
  predicted_profit: Number,
  ai_suggestions: [String]
});

module.exports = mongoose.model("AIReport", AIReportSchema);
