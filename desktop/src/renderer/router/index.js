import Vue from 'vue'
import Router from 'vue-router'

import Header from '@/components/Header'
import LandingPage from '@/components/LandingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      components: { default: LandingPage, header: Header }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
