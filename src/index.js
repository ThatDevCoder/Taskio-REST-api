const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use( (req,res,next) => {
//     if(req.method === 'GET'){
//         res.send("GET request are disabled")
//     } else {
//         next()
//     }
// })

//Middle-ware function when site is in maintanence mode

// app.use( (req,res,next) => {
//     if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE') {
//        return res.status(503).send()
//     }
// })

// const multer = require("multer");
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // const extension = file.originalname.split('.')
//         // const lol = extension[extension.length-1]
//         if(file.originalname.match(/\.(doc|docx)$/)){
//             // console.log(file);
//             cb(undefined,true)
//         }
//         else {
//             cb(new Error("File must be a word document"))
//         }

//         // cb(undefined, true)
//         // cb(undefined,false)

//     }
// })
// app.post('/upload', upload.single('upload'), (req,res) => {
//     res.send()
// })



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up and running on PORT", port);
});

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {

//     const user = await User.findById('5ee3ffa286606822ecd34797')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }

// main()

////
