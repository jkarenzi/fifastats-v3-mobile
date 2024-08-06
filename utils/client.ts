import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 70000
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(!error.response){
      return Promise.reject('Network Error')
    }

    return Promise.reject(error.response.errors[0].message)
  }
)

export default axiosInstance;