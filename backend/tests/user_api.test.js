const app = require('../app')
const assert = require('assert')
const {beforeEach, test, after} = require('node:test')
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const helper = require('../utils/test_helper')

const supertest = require('supertest')
const api = supertest(app)


beforeEach(async ()=> {
    await helper.deleteAndCreateSampleData()
})

test("get users when multiple in db", async ()=> {
    const before_users = User.find({})
    const users = await api.get("/api/users")
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    assert.strictEqual(users.body.length, 5)
})

test("create user with valid data", async ()=> {
    const before_users = await User.find({})
    const hashed_pass = await bcrypt.hash("newpassword", 10)
    const newUser = {
        username: "newuser",
        name: "New User",
        password: hashed_pass
    }
    
    const savedUser = await api.post("/api/users").send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const after_users = await api.get("/api/users")
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const after_usernames = after_users.body.map(user=>user.username)
    assert.strictEqual(before_users.length + 1, after_users.body.length)
    assert(after_usernames.includes(newUser.username))
})

test("create user with invalid data", async ()=> {
    const before_users = await User.find({})
    const newUser = {
        username: "ne",
        name: "New User",
        password: "ne"
    }
    
    const savedUser = await api.post("/api/users").send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    const after_users = await api.get("/api/users")
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(before_users.length, after_users.body.length)
})

after(async ()=> {
    await mongoose.connection.close()
})