const express = require('express');
const router = new express.Router();
const Task = require('../models/task');


// GET
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// GET BY ID
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


// PUT
// O PUT, é usado para alteração de um dado completo
// O PATCH é usado para atualização parcial.
router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const alloweUpdates = ['description', 'completed'];

  const isValidOperation = updates.every((update) => {
    return alloweUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ eror: 'Atualização Inválida!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


// DELETE
router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }
    
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

