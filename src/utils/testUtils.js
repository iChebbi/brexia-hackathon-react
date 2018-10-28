import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const uploadFile = async (file, type) => {
  try {
    const response = await axios.get(apiUrl + '/cols/' + file + '/' + type)
    return response.data.cols
  } catch (e) { return [] }
}


export const postInstruction = async (instuctions) => {
  try {
    const response = await axios.post(apiUrl + '/gg', {
      instuctions
    })
    console.log({ response })
    console.log({ data: response.data })
  } catch (error) {

  }
}