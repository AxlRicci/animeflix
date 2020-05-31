import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://img.youtube.com/vi/',
  withCredentials: false,
  headers: {
    Accept: 'image/jpeg',
    'Content-Type': 'image/jpeg'
  }
})

export default {
  // add call methods here. below is sample of form.
  verifyVideo(params) {
    return apiClient.get(`${params}/0.jpg`)
  }
}
