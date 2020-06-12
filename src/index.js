const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

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

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server is up and running on PORT",port);
})

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign( { _id: 'abcd123' }, 'devyashbordia', { expiresIn: '10 seconds' })   
//     console.log(token);


//     const data = jwt.verify(token, 'devyashbordia')
//     console.log(data);
// }

// myFunction()