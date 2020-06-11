const express = require('express');
const Task = require('../models/task')
const router = new express.Router()

router.post(('/tasks'), async (req,res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e.reason)
    }

})

router.get(('/tasks'), async (req,res) => {
    const result = await Task.find({})
    try{
        res.send(result)
    } catch(e) {
        res.status(500),send(e.reason)
    }

})

router.get(('/tasks/:id'), async (req,res) => {
    const _id = req.params.id

    const task = await Task.findById(_id)
    try{
        if(task.length === 0){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send(e.reason)
    }
    
})

router.patch(('/tasks/:id'), async (req,res) => {
    
    const newKeys = Object.keys(req.body)
    const allowedUpdates = ["completed","description"]
    const checkingEvery = newKeys.every(newKey => allowedUpdates.includes(newKey))

    if(!checkingEvery){
        return res.status(400).send({"error": "Invalid Updates"})
    }

    try{ 
        const task = await Task.findByIdAndUpdate(req.params.id,req.body, { new:true, runValidators: true })

        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch(e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', async (req,res) => {
    try{ 
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router