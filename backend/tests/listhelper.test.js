const { test, describe } = require('node:test')
const assert = require('node:assert')
const {dummy, favoriteBlog, totalLikes, mostBlogs, mostLikes} = require('../utils/list_helper')


describe('total likes', () => {
    test('dummy returns one', () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
            },
            {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
            },
            {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
            },
            {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
            },
            {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
            }  
        ]

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
    })

    test("list with one blog is the blog's likes", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
            }
        ]
        result = totalLikes(blogs)
        assert.strictEqual(result, 7)
    })

    test("list with multiple blogs is the sum of all likes", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
            },
            {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
            },
            {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
            },
            {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
            },
            {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
            }  
        ]
        result = totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test("favourite blog with one post", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            likes: 7,
            __v: 0
            }
        ]
        result = favoriteBlog(blogs)
        assert.strictEqual(result, blogs[0])
    })
    test("favourite blog with multiple posts", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422a851b5dasd4a676234d17f7",
            title: "React dasdasd",
            likes: 9,
            __v: 0
            },
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React asdddddd",
            likes: 3,
            __v: 0
            },
            {
            _id: "5a422a851b5dasd4a676234d17f7",
            title: "React patterns",
            likes: 2,
            __v: 0
            },
        ]
        result = favoriteBlog(blogs)
        assert.strictEqual(result, blogs[1])
    })
    test("favourite blog with posts missing likes", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422a851b5dasd4a676234d17f7",
            title: "React dasdasd",
            likes: 9,
            __v: 0
            },
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React asdddddd",
            __v: 0
            },
            {
            _id: "5a422a851b5dasd4a676234d17f7",
            title: "React patterns",
            likes: 2,
            __v: 0
            },
        ]
        result = favoriteBlog(blogs)
        assert.strictEqual(result, blogs[1])
    })
    test("blogger with posts blog entries", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
            },
            {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
            },
            {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
            },
            {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
            },
            {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
            }  
        ]
        result = mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: "Robert C. Martin", count: 3})
    })
    test("blogger with most likes", () => {
        const blogs = [
            {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
            },
            {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
            },
            {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 16,
            __v: 0
            },
            {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
            },
            {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
            },
            {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
            }  
        ]
        result = mostLikes(blogs)
        assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", count: 21})
    })
})