const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    require: true,
    trim: true,
    
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email inválido');
      }
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Senha não pode conter >>password<<');
      }
    }
  },
  
  age: {
    type: Number,
    default:0,
    validate(value) {
      if (value < 0) {
        throw new Error('Idade tem que posuir número positivo');
      }
    }
  }
});

const me = new User({
  name: '        Andrew           ',
  email: 'password@ssss.com',
  password: '     2345678          ',
  age: 20
});

// me.save().then(() => {
//   console.log(me);
// }).catch((error) => {
//   console.log('Error!', error.errors);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'Learn the Mongoose library',
    completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});