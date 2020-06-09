const express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())


app.post(('/users'), (req,res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch( (e) => {
        res.status(400).send(e.reason)
    })
})

app.get(('/users'), (req,res) => {
    User.find({ name:"Devyash" }).then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500),send(e.reason)
    })
})

app.get(('/users/:id'), (req,res) => {
    const _id = req.params.id

    User.findById(_id).then( (user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch( (e) => {
        res.status(500).send(e.reason)
    })
})

app.post(('/tasks'), (req,res) => {
    const task = new Task(req.body)
    task.save().then( () => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e.reason)
    })
})

app.get(('/tasks'), (req,res) => {
    Task.find({}).then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500),send(e.reason)
    })
})

app.get(('/tasks/:id'), (req,res) => {
    const _id = req.params.id

    Task.findById(_id).then( (task) => {
        if(task.length === 0){
            return res.status(404).send()
        }
        res.send(task)
    }).catch( (e) => {
        res.status(500).send(e.reason)
    })
})


app.listen(port, () => {
    console.log("Server is up and running on PORT ",port);
})

// console.log(__dirname);