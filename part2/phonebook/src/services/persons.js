import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  try {
    let response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const create = async person => {
  try {
    const response = await axios.post(baseUrl, person)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const remove = async id => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, updatedObj) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObj)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, create, remove, update }
