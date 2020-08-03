const express = require('express');
const projectModel = require('../models/projectM');
const isAuth = require('../util')

const projectRoute = express.Router();

projectRoute.get("/", async (req, res) => {
  const projects = await projectModel.find({});
  res.send(projects);
});

projectRoute.post("/", isAuth, async (req, res) => {
  const project = new projectModel({
    link: req.body.link,
    name: req.body.name,
    description: req.body.description,
    technologies: req.body.technologies,
    date: req.body.date,
    Epic_lvl: req.body.Epic_lvl
  });
  const newProject = await project.save();
  if (newProject) {
    return res.status(201).send({ message: 'New Project Created', data: newProject });
  }
  return res.status(500).send({ message: ' Error in Creating Project.' });
})

projectRoute.put("/:id", isAuth, async (req, res) => {

  const projectId = req.params.id;
  const project = await projectModel.findById(projectId);
  if (project) {
    project.name = req.body.name;
    project.link = req.body.link;
    project.date = req.body.date;
    project.technologies = req.body.technologies;
    project.Epic_lvl = req.body.Epic_lvl;
    project.description = req.body.description;
    const updatedProject = await project.save();
    if (updatedProject) {
      return res.status(200).send({ message: 'Project Updated', data: updatedProject });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Project.' });

});


projectRoute.delete("/:id", isAuth, async (req, res) => {
  const deletedProject = await projectModel.findById(req.params.id);
  if (deletedProject) {
    await deletedProject.remove();
    res.send({ message: "Project Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});



module.exports = projectRoute;