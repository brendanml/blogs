const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => (max?.likes || 0) > (blog?.likes || 0) ? max : blog)
}

const mostBlogs = (blogs) => {
    let blogCounts = Object.entries(blogs.reduce((acc, {author})=> {
        acc[author] = (acc[author] || 0) + 1;
        return acc
    }, {}))
    let maxAuthor = blogCounts.reduce((maxAuthor, [author, count])=> {
        return count > maxAuthor.count ? {author, count} : maxAuthor
    }, {author: null, count: 0})
    return maxAuthor

}
const mostLikes = (blogs) => {
    let likeCounts = Object.entries(blogs.reduce((acc, {author, likes})=> {
        acc[author] = (acc[author] || 0) + (likes || 0)
        return acc
    }, {}))
    let maxAuthor = likeCounts.reduce((maxAuthor, [author, count])=> {
        return count > maxAuthor.count ? {author, count} : maxAuthor
    }, {author: null, count: 0})
    return maxAuthor

}

module.exports = {
    dummy,
    totalLikes, favoriteBlog, mostBlogs, mostLikes
}