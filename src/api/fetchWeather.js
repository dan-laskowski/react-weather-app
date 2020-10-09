import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = 'fecb4313c0099c72112faaadd5035989'

export const fetchSimpleView = async (query) => {
  const { data } = await axios.get(`${URL}/weather`,
    {
      params:
      {
        q: query,
        units: 'metric',
        lang: 'pl',
        APPID: API_KEY
      }
    });

  return data
}

export const fetchFullView = async (lat, lon) => {
  const { data } = await axios.get(`${URL}/onecall`,
    {
      params:
      {
        lat,
        lon,
        units: 'metric',
        lang: 'pl',
        exclude: 'current,hourly,minutely',
        appid: API_KEY
      }
    })
  return data
}