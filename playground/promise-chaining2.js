require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('61f6a2d87857278bc0c5f993').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ age: 0 });
//   })
//   .then((result) => {
//     console.log(result);
//   }).catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndCount('61f6aad37596657d048f458a').then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e);
});