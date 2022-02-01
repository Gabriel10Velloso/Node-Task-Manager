const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Schema para usar o middleware
const userSchema = new mongoose.Schema({
  
    name: {
      type: String,
      require: true,
      trim: true,
  
    },
  
    email: {
      type: String,
      require: true,
      unique: true,
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
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Idade tem que posuir número positivo');
        }
      }
    }
});

//Login
userSchema.statics.findByCredentials = async (email, password) => {
  console.log(email);

  const user = await User.findOne( {email} );

  if(!user) {
    throw new Error('Login Inválido');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error('Login Inválido');
  }
  return user;
}

// Hash plain taxt password
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     require: true,
//     trim: true,

//   },
//   email: {
//     type: String,
//     require: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email inválido');
//       }
//     }
//   },
//   password: {
//     type: String,
//     require: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Senha não pode conter >>password<<');
//       }
//     }
//   },

//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Idade tem que posuir número positivo');
//       }
//     }
//   }
// });
// module.exports = User;

