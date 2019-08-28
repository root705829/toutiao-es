import axios from '../utils/axios.config'
import URL from '../constant/api'
export function login (data) {
  return axios({
    url: URL.app_login,
    method: 'post',
    data
  })
}
export function login2 () {
  console.log(1212)
}
