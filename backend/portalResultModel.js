const mongoose = require("./database");

const PortalResultSchema = new mongoose.Schema({
  user_id: String,
  project_name: String,
  risk_score: Number,
  profitability_score: Number,
  delay_probability: Number,
  cost_overrun_probability: Number,
  predicted_risk_level: String,
  predicted_profit: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PortalResult", PortalResultSchema);
