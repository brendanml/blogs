import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  console.log("get all is being hit")
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  console.log("creating a blog")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log("and the config is...", config)
  console.log(config.headers)
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const increaseLikes = async (blog, token) => {
  console.log("updating a blog")
  console.log("the token is...", token)
  console.log("the blog is in increaseLikes is: ", blog.id)
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const newBlog = {...blog, likes: blog.likes + 1}
  const res = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return res.data
}

const deleteBlog = async (blog, token) => {
  console.log("deleting a blog")
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const confirmed = window.confirm(`Are you sure you want to delete ${blog.title}?`)
  if(!confirmed) {
    return
  }
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

export default { getAll, create, increaseLikes, deleteBlog }