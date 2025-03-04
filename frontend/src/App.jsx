import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import bs from './services/blogs'
import ls from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    bs.getAll().then(blogs =>{
      let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    }
    )  
  }, [])

  useEffect(() => {
    try{
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
      }
    } catch(e) {
      console.log("no user present in broweser, ", e)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await ls.login(credentials)
      console.log("the user in handleLogin is...", user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
    } catch(e) {
      console.log("there was an error logging in", e)
      setNotification("there was an error logging in")
      setTimeout(() => {
        setNotification(null) }, 3000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      {notification ? <Notification notification={notification}/> : null}
      {user === null 
      ? <LoginForm handleLogin={handleLogin} setNotifcation={setNotification}/> 
      : <div>
          <Bloglist blogs={blogs} user={user} setBlogs={setBlogs}/>
          <Toggleable buttonLabel="new blog">
            <BlogForm user={user} setBlogs={setBlogs} setNotification={setNotification} />
          </Toggleable>
          <button onClick={handleLogout}>logout</button>
        </div>}
    </div>
  )
}

export default App