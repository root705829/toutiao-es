import axios from '../utils/axios.config'
import URL from '../constant/api'
export function $deleteWZ (item) {
  return axios({
    method: 'delete',
    url: URL.articles.deleteWZ + `${item.id}`
  })
}
export function $getchannel () {
  return axios({
    url: URL.articles.getchannel
  })
}
export function $getlist (params) {
  return axios({
    url: URL.articles.getlist,
    params
  })
}
