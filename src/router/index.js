import Vue from 'vue'
import VueRouter from 'vue-router'
import Teams from '../views/Teams.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Competitions from '../views/Competitions.vue'
import Matchs from '../views/Matchs.vue'
import Games from '../views/Games.vue'
import Scoreboard from '../views/Scoreboard.vue'
import goTo from 'vuetify/es5/services/goto'
import store from '../store'
import Guesses from '../views/Guess.vue'
import Ranking from '../views/Ranking.vue'
import Chat from '../views/Chat.vue'
import Prize from '../views/Prize.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/competitions',
    name: 'Competitions',
    component: Competitions
  },
  {
    path: '/matchs',
    name: 'Matchs',
    component: Matchs,
    props: true
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: Scoreboard
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/guesses',
    name: 'Guesses',
    component: Guesses,
    props: true
  },
  
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/prize',
    name: 'Prize',
    component: Prize
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }

  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.userStore.loggedUser) next({ name: 'Login' })
  else {
    document.title = process.env.VUE_APP_TITLE + ' - ' + to.name
    next()
  }
})

router.afterEach(() => {
  goTo(0, { duration: 0 })
})

export default router
