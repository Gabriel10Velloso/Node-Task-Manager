const express = require('express');
require('./db/mongoose');


const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT || 3000;

// Deixa o middleware acessível
// app.use((req, res, next)=>{
//   res.status(503).send('Site fora do ar. Voltaremos em breve!');
// });

app.use(express.json());

// ROUTER
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
  console.log('Express rodando na porta ' + port);
});