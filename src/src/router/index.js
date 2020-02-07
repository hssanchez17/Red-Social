import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'landingPage',
    component: () => import( '../views/LandingPage.vue'),
    beforeEnter:forwardAuthenticated
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/Home.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/user/profile',
    name:'profile',
    component:()=>import('../views/User/Profile.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/post/add',
    name:'addPost',
    component:()=>import('../views/Post/AddPost.vue'),
    beforeEnter: ensureAuthenticated
  },

  {
    path:'/user/show/:id',
    name:'showUser',
    component:()=>import('../views/User/UserShow.vue'),
    beforeEnter: ensureAuthenticated
  },

  {
    path:'/user/update',
    name:'updateUser',
    component:()=>import('../views/User/UserUpdate.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/post/show/:id',
    name:'ShowPost',
    component:()=>import('../views/Post/PostShow.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/comment/show/:id',
    name:'showComment',
    component:()=>import('../views/Comment/ShowComment.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/user/list',
    name:'listOfSearchedUsers',
    component:()=>import('../views/User/ListOfSearchedUsers.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/friend/list/following/people/:id',
    name:'listOfFollowingPeople',
    component:()=>import('../views/FollowPeople/ListOfFollowigPeople.vue'),
    beforeEnter: ensureAuthenticated
  },
  {
    path:'/friend/list/followers/people/:id',
    name:'listOfFollowersPeople',
    component:()=>import('../views/FollowPeople/ListOfFollowersPeople.vue'),
    beforeEnter: ensureAuthenticated
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function ensureAuthenticated (to, from, next) {
  if(Vue.cookie.get('token'))next()
  else{
    alert('Login first')
    next('/')
  }
}

function forwardAuthenticated (to, from, next) {
  if(Vue.cookie.get('token')) next('/home')
  else next()
}




export default router
