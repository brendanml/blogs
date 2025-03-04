const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

blogsRouter.get("/", async (req, res) => {
    console.log("a request is being initiated...")
    try {
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({error: "PROBLEM"})
    }
})

blogsRouter.post("/", async (req, res) => {
    const {title, author, url, likes} = req.body
    const { token } = req.body
    if(!title || !author || !url || !token) {
        return res.status(400).json({error: "missing required fields"})
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {    
        return res.status(401).json({ error: 'token invalid' })  }  
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({title, author, url, likes, user: user.id})

    try {
        const savedBlog = await blog.save()
        console.log("on the server, the saved blog is...", savedBlog)
        res.status(201).json(savedBlog)
    } catch (error) {
        res.status(400).json({error: "PROBLEM"})
    }
})

blogsRouter.delete("/:id", async (req,res, next)=> {
    try {
        const id = req.params.id

        const { token } = req.body
        if(!token) {
            return res.status(401).json({error: 'missing token'})
        }
        // console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!decodedToken.id) {
            return res.status(401).json({error: 'invalid token'})
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "blog not found" });
        }

        if(blog.user.toString() !== req.user.id) {
            return res.status(403).json({error: "unauthorized to delete this blog"})
        }

        const deletedBlog = await Blog.findByIdAndDelete(id, {new: false})

        console.log(deletedBlog)
        res.status(200).json(deletedBlog)
    } catch(e) {
        next(e)
    }
})

blogsRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const {title, author, url, likes} = req.body
    const blog = {title, author, url, likes}

    console.log("the blog is...", blog)

    const { token } = req.body

    console.log("the token is...", token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id) {
        return res.status(401).json({error: 'invalid token'})
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
        res.status(201).json(updatedBlog).end()
    } catch(e) {
        next(e)
    }
})
// const crea

module.exports = blogsRouter