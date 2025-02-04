import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4444/api',
    withCredentials:true,

    headers: {'X-Custom-Header': 'foobar'}
  });

export default axiosInstance