import axios from 'axios'

const URL = 'https://api.opencagedata.com/geocode/v1/json'
const API_KEY = 'dbab2324b89a49d484dbf6ae4f1b723c'

export const fetchGeolocation = async (query) => {
  const { data } = await axios.get(URL,
    {
      params:
      {
        q: query,
        key: API_KEY,
        limit: 1
      }
    });

  return data
}