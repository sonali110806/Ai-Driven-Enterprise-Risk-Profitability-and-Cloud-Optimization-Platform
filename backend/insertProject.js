const Project = require("./projectModel");

async function insertProject() {

  const newProject = new Project({
    project_name: "Banking Mobile App",
    client_name: "ABC Bank",
    domain: "FinTech",
    budget: 500000,
    expected_timeline_months: 6,
    team_size: 8,
    tech_stack: ["React", "NodeJS", "MongoDB"],
    cloud_provider: "AWS",
    project_manager: "Rahul Sharma",
    start_date: new Date()
  });

  await newProject.save();

  console.log("Project stored successfully");
}

insertProject();
