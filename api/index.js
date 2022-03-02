import axios from 'axios'
const api = 'https://api.spotify.com/v1/'

const httpClient = axios.create({
    baseURL: api,
    headers: {
        Authorization: `Bearer `,
        'Content-Type': 'application/json'
    }
})

export default httpClient 