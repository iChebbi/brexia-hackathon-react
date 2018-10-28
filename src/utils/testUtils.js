import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const uploadFile = async (file, type) => {
  try {
    const response = await axios.get(apiUrl + '/cols/' + file + '/' + type)
    console.log({ response: response.data })
    return response.data.cols
  } catch (e) { return [] }
}



