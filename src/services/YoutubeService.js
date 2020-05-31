import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  withCredentials: false,
  headers: {
    Accept: 'image/jpeg',
    'Content-Type': 'image/jpeg'
  }
})

export default {
  // add call methods here. below is sample of form.
  verifyVideo(videoId) {
    return apiClient.get(
      `videos?id=${videoId}&part=status&key=${process.env.VUE_APP_YT_KEY}`
    )
  }
}
