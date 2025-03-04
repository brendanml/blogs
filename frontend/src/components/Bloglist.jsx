import Blog from './Blog'

const Bloglist = ({ blogs, user, setBlogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs}/>)}
    </div>
  )
}

export default Bloglist