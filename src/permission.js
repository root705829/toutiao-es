import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(function (to, from, next) {
  nprogress.start()
  console.log(to, to.path.startsWith)
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('userInfo')
    if (result) {
      let userInfo = JSON.parse(result)
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(function (to, from, next) {
  nprogress.done()
})
export default router
