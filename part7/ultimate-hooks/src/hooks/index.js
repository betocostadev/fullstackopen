import { useState } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => setResources(response.data))
  }

  const create = async resource => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    getAll, create
  }

  return [
    resources, service
  ]
}
