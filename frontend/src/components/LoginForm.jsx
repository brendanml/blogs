import { useState } from 'react'
import PropTypes from 'prop-types'
import login from '../services/login'



const LoginForm = ({ handleLogin, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('logging in to the app', username, password)
      const user = await handleLogin({ username, password })
      console.log('the user in onSubmit after handleLogin is...', user)
      if(user === null) {
        throw new Error('there was an error logging in')
      }
      setUsername('')
      setPassword('')
    } catch(e) {
      console.log('there was an error logging in', e)
      setNotification('there was an error logging in')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    // implement error funcitonality
  }

  return (
    <div>
      <h1>login to blogs</h1>
      <form onSubmit={onSubmit}>
        <div>
                Username:
          <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div>
                Password:
          <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
