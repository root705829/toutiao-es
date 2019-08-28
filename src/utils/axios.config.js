import axios from 'axios'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
axios.interceptors.request.use(function (config) {
  // console.log(config)
  let result = localStorage.getItem('userInfo')
  let token = result ? JSON.parse(result).token : null
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  console.dir(error)
  let code = error.response ? error.response.status : ''
  let message
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      window.location.hash = '#/login'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message: message, type: 'warning' })
  return new Promise(function (resolve, reject) {})
})
export default axios
