import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../views/Welcome.vue'
import SearchSongs from '../views/SearchSongs.vue'
import AddSongs from '../views/AddSongs.vue'
import FavoritesSongs from '../views/FavoritesSongs.vue'
import ByCite from '../views/ByCite.vue'
import ByContent from '../views/ByContent.vue'
import ByCategory from '../views/ByCategory.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/search-songs',
      name: 'SearchSongs',
      component: SearchSongs
    },
    {
      path: '/add-songs',
      name: 'AddSongs',
      component: AddSongs
    },
    {
      path: '/favorites-songs',
      name: 'FavoritesSongs',
      component: FavoritesSongs
    },
    {
      path: '/by-cite',
      name: 'ByCite',
      component: ByCite
    },
    {
      path: '/by-content',
      name: 'ByContent',
      component: ByContent
    },
    {
      path: '/by-category',
      name: 'ByCategory',
      component: ByCategory
    }
  ]
})
