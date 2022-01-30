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
  // Forma Sincrona
  // User.find().then((users) => {
  //   res.status(200).send(users);
  // }).catch(() => {
  //   res.status(500).send();
  // });
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
  // Forma Sincrona
  // User.findById(_id).then((user) => {
  //   if(!user) {
  //     return res.status(404).send();
  //   }
  //   res.status(200).send(user);
  // }).catch((e) => {
  //   res.status(500).send();
  // });
});

// POST]
// Forma Sincrona
// app.post('/users', (req, res) => {
//   const user = new User(req.body);
//   user.save().then(() => {
//     res.status(201).send(user);
//   }).catch(() => {
//     res.status(400).send(e);
//   });
// });

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
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
  // Forma Sincrona
  // Task.find().then((tasks) => {
  //   res.status(200).send(tasks);
  // }).catch(() => {
  //   res.status(500).send();
  // });
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
  // Forma Sincrona
  // Task.findById(_id).then((task) => {
  //   if (!task) {
  //     return res.status(404).send();
  //   }
  //   res.status(200).send(task);
  // }).catch((e) => {
  //   res.status(500).send();
  // });
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

   // Forma Sincrona
  // task.save().then(() => {
  //   res.status(201).send(task);
  // }).catch((e) => {
  //   res.status(400).send(e);
  // });
});


app.listen(port, () => {
  console.log('Express rodando na porta ' + port);
});