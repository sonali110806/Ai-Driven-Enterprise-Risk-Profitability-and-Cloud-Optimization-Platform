const mongoose = require("./database");

const CloudUsageSchema = new mongoose.Schema({
  project_name: String,
  cloud_provider: String,
  storage_used_gb: Number,
  compute_hours: Number,
  monthly_cloud_cost: Number,
  network_usage_gb: Number
});

module.exports = mongoose.model("CloudUsage", CloudUsageSchema);
