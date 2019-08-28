import axios from '../utils/axios.config'
import URL from '../constant/api'
export function $uploadImg (data) {
  return axios({
    url: URL.material.uploadImg,
    method: 'post',
    data
  })
}
export function $likeORdislike (item) {
//   console.log(item)
  return axios({
    method: 'put',
    url: URL.material.likeORdislike + `${item.id}`,
    data: { collect: !item.is_collected }
  })
}
export function $delImg (item) {
//   console.log(item.id)
  return axios({
    method: 'delete',
    url: URL.material.delImg + `${item.id}`
  })
}
export function $getImgs (params) {
  return axios({
    url: URL.material.getImgs,
    params
  })
}
