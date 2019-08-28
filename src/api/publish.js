import axios from '../utils/axios.config'
import URL from '../constant/api'
export function $fromIDget (id) {
  return axios({
    url: URL.publish.fromIDget + `${id}`
  })
}
export function $publish (method, url, draft, data) {
  return axios({
    method,
    url,
    params: { draft },
    data
  })
}
export function $getchannel () {
  return axios({
    url: URL.publish.getchannel
  })
}
