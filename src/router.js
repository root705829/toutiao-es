import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/comment',
          component: () => import('./views/comment')
        },
        {
          path: '/home/material',
          component: () => import('./views/material')
        },
        {
          path: '/home/articles',
          component: () => import('./views/articles')
        },
        {
          path: '/home/publish',
          component: () => import('./views/publish')
        },
        {
          path: '/home/publish/:id',
          component: () => import('./views/publish')
        },
        {
          path: '/home/account',
          component: () => import('./views/account')
        },
        {
          path: '/home/fansdata',
          component: () => import('./components/common/echarts.vue')
        }
      ]
    },
    {
      path: '*',
      component: () => import('./views/404.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
