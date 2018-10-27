import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const uploadFile = async file => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    const response = await axios.post(apiUrl + '/file', config)
    console.log({ response })
  } catch (e) { console.log({ e }) }
}