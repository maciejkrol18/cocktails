import axios from 'axios'

const client = axios.create({
  baseURL: 'https://cocktails.solvro.pl/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default client
