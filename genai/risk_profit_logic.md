# AI Project Risk, Delay, and Profit Analysis Logic

## 1. Overview

This document defines the **constraints, scoring rules, and formulas** used for analyzing software projects using AI.

The system evaluates a project based on the following objectives:

* Calculate **Risk Score**
* Estimate **Delay Probability**
* Compute **Profit Margin**
* Determine **Project Health Score**

These rules are used by the AI system to generate structured project analysis.

---

# 2. Input Factors

| Factor                | Description                         |
| --------------------- | ----------------------------------- |
| Complexity            | Technical difficulty of the project |
| Timeline              | Project duration in months          |
| Team Size             | Number of team members              |
| Budget                | Total project budget                |
| Cloud Usage           | Monthly cloud infrastructure cost   |
| Requirement Stability | Frequency of requirement changes    |

---

# 3. Risk Scoring Weights

## 3.1 Complexity Score

| Level  | Score |
| ------ | ----- |
| Low    | 10    |
| Medium | 20    |
| High   | 35    |

---

## 3.2 Timeline Score

| Timeline   | Score |
| ---------- | ----- |
| > 6 months | 10    |
| 3–6 months | 20    |
| 1–3 months | 35    |

---

## 3.3 Team Size Score

| Team Size      | Score |
| -------------- | ----- |
| >100 members   | 12    |
| 25–100 members | 22    |
| <25 members    | 32    |

---

## 3.4 Budget Score

| Budget Range    | Score |
| --------------- | ----- |
| > 60,000        | 10    |
| 15,000 – 60,000 | 16    |
| < 15,000        | 25    |

---

## 3.5 Requirement Stability Score

| Requirement Stability | Score |
| --------------------- | ----- |
| Stable                | 5     |
| Moderate              | 15    |
| Frequent Changes      | 25    |

---

## 3.6 Cloud Usage Score

| Cloud Cost (Monthly) | Score |
| -------------------- | ----- |
| Low                  | 10    |
| Moderate             | 18    |
| High                 | 25    |

---

# 4. Total Risk Score

Total Risk Score is calculated as:

Total Risk Score =
Complexity Score +
Timeline Score +
Team Size Score +
Budget Score +
Cloud Usage Score +
Requirement Stability Score

---

# 5. Normalized Risk Score

Normalized Risk Score =

Normalized Risk Score = (Total Score / Maximum Score) × 100

---

# 6. Risk Level Classification

| Risk Score | Risk Level |
| ---------- | ---------- |
| 0 – 40     | Low        |
| 41 – 70    | Moderate   |
| 71 – 100   | High       |

---

# 7. Delay Score Calculation

Delay Score =

Complexity Score +
Timeline Score +
Team Size Score +
Budget Score +
Cloud Usage Score

---

# 8. Delay Probability

| Score Range | Delay Probability | Delay Percent |
| ----------- | ----------------- | ------------- |
| 0 – 40      | Low               | 20 – 30 %     |
| 41 – 70     | Moderate          | 40 – 55 %     |
| 71 – 100    | High              | 60 – 80 %     |

---

# 9. Delay Driver Mapping

| Delay Cause       | Category            |
| ----------------- | ------------------- |
| Timeline pressure | Schedule Risk       |
| Small team        | Resource Risk       |
| High complexity   | Technical Risk      |
| Cloud dependency  | Infrastructure Risk |

---

# 10. Risk Factor Tags

The system may output the following risk factors:

```json
{
 "risk_factors":[
 "high_complexity",
 "short_timeline",
 "small_team",
 "low_budget",
 "low_cloud_usage"
 ]
}
```

---

# 11. Development Cost Calculation

Development Cost =

Dev Cost =
Team Size × Average Salary × Timeline

---

# 12. Cloud Cost Estimation

Cloud Cost =

Monthly Cloud Cost × Timeline

---

# 13. Total Project Cost

Total Cost =

Dev Cost + Cloud Cost

---

# 14. Profit Calculation

Profit =

Budget − Total Cost

---

# 15. Profit Margin

Profit Margin =

(Profit / Budget) × 100

---

# 16. Return on Investment (ROI)

ROI =

(Profit / Investment) × 100

---

# 17. Profit Category

| Profit Margin | Category        |
| ------------- | --------------- |
| > 25%         | High Profit     |
| 10–25%        | Moderate Profit |
| < 10%         | Low Profit      |

---

# 18. Project Health Score

Project Health Score =

(Profit Margin × 0.4) +
(100 − Risk Score × 0.4) +
(100 − Delay Percent × 0.2)

---

# 19. Project Health Status

| Health Score | Status   |
| ------------ | -------- |
| ≥ 75         | Good     |
| 50 – 74      | Moderate |
| < 50         | Poor     |

---

# 20. AI Output Schema

The AI system must generate output in the following JSON structure.

```json
{
 "risk_analysis": {
   "risk_score": 72,
   "risk_level": "High",
   "risk_drivers": [
     "high_complexity",
     "small_team"
   ]
 },

 "delay_analysis": {
   "delay_probability": "High",
   "delay_percent": 65,
   "delay_drivers": [
     "schedule_risk",
     "resource_risk"
   ]
 },

 "profit_analysis": {
   "budget": 150000,
   "estimated_cost": 120000,
   "profit": 30000,
   "profit_margin": 20,
   "profit_category": "Moderate"
 },

 "project_health_analysis": {
   "project_health_score": 68,
   "health_status": "Moderate"
 }
}
```

---

# 21. AI Instruction

The AI system must:

1. Follow the scoring rules defined in this document.
2. Use the provided formulas for all calculations.
3. Generate the final response strictly in the defined JSON output format.
4. Identify risk drivers and delay drivers based on the corresponding factors.
