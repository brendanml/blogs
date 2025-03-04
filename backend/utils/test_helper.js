const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const sampleUsers = [
    {
      username: "john_doe",
      name: "John Doe",
      password: "password",
      blogs: []
    },
    {
      username: "jane_smith",
      name: "Jane Smith",
      password: "password",
      blogs: []
    },
    {
      username: "robert_martin",
      name: "Robert C. Martin",
      password: "password",
      blogs: []
    },
    {
      username: "alice_johnson",
      name: "Alice Johnson",
      password: "password",
      blogs: []
    },
    {
      username: "emily_davis",
      name: "Emily Davis",
      password: "password",
      blogs: []
    }
  ]

const sampleBlogs = [
    {
      title: "Understanding JavaScript Closures",
      author: "John Doe",
      url: "https://example.com/js-closures",
      likes: 42,
    },
    {
      title: "Mastering React Hooks",
      author: "Jane Smith",
      url: "https://example.com/react-hooks",
      likes: 25,
    },
    {
      title: "A Guide to Node.js Performance Optimization",
      author: "Robert C. Martin",
      url: "https://example.com/node-performance",
      likes: 30,
    },
    {
      title: "Exploring MongoDB Aggregation Framework",
      author: "Alice Johnson",
      url: "https://example.com/mongodb-aggregation",
      likes: 18,
    },
    {
      title: "CSS Grid vs Flexbox: Which One to Use?",
      author: "Emily Davis",
      url: "https://example.com/css-grid-flexbox",
      likes: 50,
    },
    {
      title: "Understanding TypeScript Generics",
      author: "John Doe",
      url: "https://example.com/ts-generics",
      likes: 22,
    }
  ];

  const deleteAndCreateSampleData = async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    console.log("deleted all users and blogs")

    for(let user of sampleUsers) {
        const hashed_pass = await bcrypt.hash(user.password, 10)
        user.password = hashed_pass
        const newUser = new User(user)
        await newUser.save()
    }

    console.log("created all users")
    const one_user_id = await User.findOne({}).then(user=>user._id)
    for(let blog of sampleBlogs) {
        blog.user = one_user_id
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
    console.log("created all blogs")
    const all_blogs = await Blog.find({})
    const all_blog_ids = all_blogs.map(blog=>blog._id)
    await User.findByIdAndUpdate(one_user_id, {blogs: all_blog_ids})
  }

  const getBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog=> blog.toJSON())
  }
  
  module.exports = {
    sampleBlogs, getBlogs, sampleUsers, deleteAndCreateSampleData
  }
  