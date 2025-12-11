const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET - Svi projekti
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('projects/index', { projects });
});

// GET - Dodaj novi projekt
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// POST - Spremi novi projekt
router.post('/', async (req, res) => {
  const { name, description, price, tasks, startDate, endDate } = req.body;
  await Project.create({ name, description, price, tasks, startDate, endDate });
  res.redirect('/projects');
});

// GET - Prikaži jedan projekt
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/show', { project });
});

// GET - Edit
router.get('/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/edit', { project });
});

// PUT - Update
router.put('/:id', async (req, res) => {
  const { name, description, price, tasks, startDate, endDate } = req.body;
  await Project.findByIdAndUpdate(req.params.id, {
    name, description, price, tasks, startDate, endDate
  });
  res.redirect('/projects');
});

// DELETE - Obriši
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/projects');
});

// POST - Dodavanje člana tima
router.post('/:id/team', async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.teamMembers.push({ name: req.body.name, role: req.body.role });
  await project.save();
  res.redirect('/projects/' + req.params.id);
});

module.exports = router;
