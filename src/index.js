const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * USER (GET POST PUT DELE) 
 */
// GET
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// GET BY ID
app.get('/users/:id', async (req, res) => {
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
app.post('/users', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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



//==================== TASK (GET POST PUT DELE) ================================
//==================== TASK (GET POST PUT DELE) ================================

/**
 * TASK (GET POST PUT DELE) 
 */
// GET
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// GET BY ID
app.get('/tasks/:id', async (req, res) => {
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
app.post('/tasks', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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




app.listen(port, () => {
  console.log('Express rodando na porta ' + port);
});