import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'landingPage',
    component: () => import( '../views/LandingPage.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/Home.vue')
  },
  {
    path:'/user/profile',
    name:'profile',
    component:()=>import('../views/User/Profile.vue')
  },
  {
    path:'/post/add',
    name:'addPost',
    component:()=>import('../views/Post/AddPost.vue')
  },

  {
    path:'/user/show/:id',
    name:'showUser',
    component:()=>import('../views/User/UserShow.vue')
  },

  {
    path:'/user/update',
    name:'updateUser',
    component:()=>import('../views/User/UserUpdate.vue')
  },
  {
    path:'/post/show/:id',
    name:'ShowPost',
    component:()=>import('../views/Post/PostShow.vue')
  },
  {
    path:'/comment/show/:id',
    name:'showComment',
    component:()=>import('../views/Comment/ShowComment.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
