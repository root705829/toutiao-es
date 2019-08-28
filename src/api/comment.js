import axios from '../utils/axios.config'
import URL from '../constant/api'
export function $closeOrOpen (row) {
  return axios({
    method: 'put',
    url: URL.comment.closeOrOpen,
    params: { article_id: row.id.toString() },
    data: { allow_comment: !row.comment_status }
  })
}
export function $getComment (pageobj) {
  return axios({
    url: URL.comment.getComment,
    params: { response_type: 'comment', ...pageobj }
  })
}
