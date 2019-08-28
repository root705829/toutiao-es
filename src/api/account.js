import axios from '../utils/axios.config'
import URL from '../constant/api'
export function $edit (data) {
  return axios({
    method: 'patch',
    url: URL.account.edit,
    data
  })
}
export function $uploadIMG (data) {
  return axios({
    method: 'patch',
    url: URL.account.uploadIMG,
    data
  })
}
export function $getData () {
  return axios({
    url: URL.account.getData
  })
}
