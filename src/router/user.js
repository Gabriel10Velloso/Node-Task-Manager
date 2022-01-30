const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// GET
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// GET BY ID
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


// PUT
// O PUT, é usado para alteração de um dado completo
// O PATCH é usado para atualização parcial.
router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const alloweUpdates = ['name', 'email', 'password', 'age'];

  const isValidOperation = updates.every((update) => {
    return alloweUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ eror: 'Atualização Inválida!' });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOneAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;