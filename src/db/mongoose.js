const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});


// const user = new User({
//     name: "Devyash",
//     email: 'bordia999@gmail.com',
//     password: 'PASSWsdasdORD123',
//     age: 20,
//     completed: true
// })


// user.save().then(() => {
//     console.log("Success ",user);
// }).catch( (error) => {
//     console.log("Task Failed ",error);
// })