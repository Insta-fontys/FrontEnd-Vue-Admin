import { createRouter, createWebHistory } from 'vue-router'
import JwtManager from '../JwtManager.js'

//import pages
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: HomePage,
    meta:{
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Check before entering page
router.beforeEach((to, from, next) => {
  //Redirect when trying to access home page
  if(to.path === '/'){
    if (localStorage.getItem('jwt') == null) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    } 
    else {
      next({ name: 'home' })
    } 
  }   

  //AuthenticationState
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    } 
    else {
      const claims = JwtManager.parseJwt(localStorage.getItem("jwt"))
      const isExpired = JwtManager.checkExpiration(claims["exp"])

      if(isExpired){
        localStorage.removeItem("jwt")

        next({
          name: 'login',
          params: { nextUrl: to.fullPath }
        })
      }
      else{
        next()
      }
    }
  } 
  else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } 
    else {
      next({ name: 'home' })
    }
  } 
  else {
    next()
  }
})

export default router
