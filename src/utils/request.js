import axios from 'axios'
// import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
  /**
  * status 可结合自己业务进行修改
  */
    return response.data
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 1000
    // })
    return Promise.reject(error)
  }
)

export default service
