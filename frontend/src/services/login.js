import axios from 'axios'
const baseUrl = '/api/login';

const login  = async (credentials)=> {
    console.log("logging in through login service", credentials)
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default {login}