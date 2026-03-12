const express = require("express")
const router = express.Router()

let projects = []

// CREATE PROJECT
router.post("/project-data", (req, res) => {

  const { projectName, budget, timeline, teamSize, complexity } = req.body

  const newProject = {
    id: projects.length + 1,
    projectName,
    budget,
    timeline,
    teamSize,
    complexity
  }

  projects.push(newProject)

  res.json({
    message: "Project created successfully",
    project: newProject
  })

})


// GET ALL PROJECTS (HISTORICAL PROJECTS)
router.get("/projects", (req, res) => {

  res.json({
    totalProjects: projects.length,
    projects: projects
  })

})

module.exports = router