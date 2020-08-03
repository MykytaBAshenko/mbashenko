const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  link: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: Array, required: true },
  date: { type: String,  required: true },
  Epic_lvl: { type: Number, required: true }
});

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;