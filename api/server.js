// BUILD YOUR SERVER HERE
const express = require('express');
const Model = require('./users/model');

const server = express();

server.use(express.json());

// [GET] /api/users
//Returns an array users.
server.get('/api/users', async (req, res) =>{
    try{
        const users = await Model.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({
            message: "The users information could not be retrieved" 
        })
    }
})

// [POST] /api/users
//Creates a user using the information sent inside the request body.
server.post('/api/users', async(req, res) => {
    try{
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({
                message:'Please provide name and bio for the user'
            })
        } else {
            const newUser = await Model.insert({ name, bio });
            res.status(201).json(newUser);
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

// [GET] /api/users/:id	
//Returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const user = await Model.findById(id);
        if(!user) {
            res.status(404).json({
                message:"The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(500).json({
            message:"The user information could not be retrieved"
        })
    }
})

// [DELETE] /api/users/:id	
//Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', async(req, res)=>{
    try{
        const { id } = req.params;
        const deletedUser = await Model.remove(id);
        if(!deletedUser){
            res.status(404).json({
                message:"The user with the specified ID does not exist"
            })
        } else {
            res.json(deletedUser)
        }
    }
    catch(err){
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

// [PUT] /api/users/:id	
//Updates the user with the specified id using data from the request body. Returns the modified user

module.exports = server // EXPORT YOUR SERVER instead of {}
