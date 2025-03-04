const { test, after, beforeEach } = require('node:test')
const app = require('../app')
const assert = require('node:assert')


const mongoose = require('mongoose')
const Blog = require('../models/blog')

const {sampleBlogs, getBlogs} = require("../utils/test_helper")

const supertest = require('supertest')
const api = supertest(app)

beforeEach(async ()=> {
    await Blog.deleteMany({})
    const blogDbObjects = sampleBlogs.map(blog=> new Blog(blog))
    const promiseArray = blogDbObjects.map(blog=> blog.save())
    await Promise.all(promiseArray)
})

test("get the blogs", async ()=> {
    const blogs = await api.get("/api/blogs")
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    assert.strictEqual(blogs.body.length, sampleBlogs.length)
})

test("check 'id' is key", async ()=> {
    const blog = {
        title: "Understanding JavaScript Closures",
        url: "https://example.com/js-closures",
        likes: 42,
        author: "John Doe"
    }

    const savedBlog = await api.post("/api/blogs").send(blog)                        
    .expect(201)
    .expect('Content-Type', /application\/json/)

    assert(savedBlog.body.id)

})

test("blog post are saved to DB", async ()=> {
    const newTitle = "Understanding JavaScript Closures"
    const blog = {
        title: newTitle,
        url: "https://example.com/js-closures",
        likes: 42,
        author: "John Doe"
    }

    const res = await api.post("/api/blogs").send(blog).expect(201)
        .expect('Content-Type', /application\/json/)

    const afterBlogs = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    assert(afterBlogs.body.map(blog=>blog.title).includes(newTitle))
    assert.strictEqual(sampleBlogs.length + 1, afterBlogs.body.length)
})

test("is likes property missing", async ()=> {
    const newTitle = "Understanding JavaScript Closures"
    const blog = {
        title: newTitle,
        url: "https://example.com/js-closures",
        author: "John Doe"
    }

    const res = await api.post("/api/blogs").send(blog).expect(201).expect('Content-Type', /application\/json/)

    const findBlog = await Blog.findById(res.body.id)

    assert.strictEqual(findBlog.likes, 0)
})

test("responds with 400 if title or author missing", async ()=> {
    const blog = new Blog({
        url: "https://example.com/js-closures",
    })

    await api.post("/api/blogs").send(blog).expect(400)
})

test("delete by id", async ()=> {
    const beforeBlogsLength = sampleBlogs.length
    const blog = await Blog.findOne({})
    const deletedBlog = await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(204)

    const afterBlogs = await getBlogs()
    const findDeletedBlog = await Blog.findById(blog.id)

    assert(!findDeletedBlog)
    assert.strictEqual(beforeBlogsLength - 1, afterBlogs.length)
})

test("update by id", async ()=> {
    const blog = await Blog.findOne({})
    const updatedBlog = {
        title: "Understanding JavaScript Closures",
        url: "https://example.com/js-closures",
        likes: 123123
    }
    const res = await api
        .put(`/api/blogs/${blog.id}`)
        .send(updatedBlog)
        .expect(201)
    
    const afterUpdate = await Blog.findById(blog.id)

    assert.deepStrictEqual(afterUpdate.likes, updatedBlog.likes)
})


after(async ()=> {
    await mongoose.connection.close()
})