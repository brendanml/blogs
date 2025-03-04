const User = require('../models/User');
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');


usersRouter.post("/", async (req, res, next) => {
    const {username, password, name } = req.body

    if (password.length < 3 || username.length < 3 || name.length < 3) {
        return res.status(400).json({error: "Password, username and name must be at least 3 characters long"})
    }

    const hashed_password = await bcrypt.hash(password, 10)

    const new_user = new User({
        username: username,
        name: name,
        password: hashed_password
    })

    try {
        const saved_user = await new_user.save()
        res.status(201).json(saved_user)
    } catch(e) {
        next(e)
    }
})

usersRouter.get("/", async (req,res,next)=> {
    const all_users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})

    try {
        res.status(200).json(all_users)
    } catch(e) {
        next(e)
    }
})

module.exports = usersRouter