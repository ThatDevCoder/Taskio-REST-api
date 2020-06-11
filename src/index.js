const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


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