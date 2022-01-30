require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('61f6a2d87857278bc0c5f993', { age: 10 })
//   .then((user) => {
//     return User.countDocuments({ age: 0 });
//   })
//   .then((result) => {
//     console.log(result)
//   }).catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ completed: false });
  return count;
}

updateAgeAndCount('61f6aad37596657d048f458a', 20).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e);
});