const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');


// Logout
router.post('/users/logout', auth, async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token;
      })
      await req.user.save();

      res.send();
  } catch (e) {
      res.status(500).send();
  }
})
// Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});


// GET
router.get('/users/me', auth, async (req, res) => {
   // Retorna todos os usuários
  // try {
  //   const users = await User.find();
  //   res.status(200).send(users);
  // } catch (e) {
  //   res.status(500).send();
  // }
  // Retorna apens o usuário logado 
  res.send(req.user);
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
    const token = await user.generateAuthToken();

    res.status(201).send({user, token});
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
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    const user = await User.findByIdAndUpdate(_id, req.body);

    updates.forEach((update) => user[update] = req.body[update]);
    
    await user.save();

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