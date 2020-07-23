import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pinjaman',
    name: 'Partner',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Partner.vue'),

  },
  {
    path: '/pinjaman',
    name: 'Detil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Pinjaman.vue'),
    children: [
      //UserInfo component is rendered when /user/:id is matched
      { path: ':id', name: 'Detil', component: () => import(/* webpackChunkName: "about" */ '../components/Pinjaman.vue'), props: true }
    ]

  },

  {
    path: '/riwayat',
    redirect: '/riwayat',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [
      //UserInfo component is rendered when /user/:id is matched
      { path: '', name: 'History', component: () => import(/* webpackChunkName: "about" */ '../views/History.vue'), props: true },
      { path: 'tambah', name: 'TambahRiwayat', component: () => import(/* webpackChunkName: "about" */ '../views/Filter.vue'), props: true },
    ]

  },
  {
    path: '/profile',
    name: 'Profile',
    redirect: '/profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: {
      render(c) {
        return c('router-view')
      }
    },
    // component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    children: [
      //UserInfo component is rendered when /user/:id is matched
      { path: '', name: 'Profile', component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'), props: true },
      { path: 'ubah-password', name: 'UbahPassword', component: () => import(/* webpackChunkName: "about" */ '../components/UbahPassword.vue'), props: true },
      { path: 'ubah-profile', name: 'UbahProfile', component: () => import(/* webpackChunkName: "about" */ '../components/UbahProfile.vue'), props: true },
      { path: 'keuntungan', name: 'Keuntungan', component: () => import(/* webpackChunkName: "about" */ '../views/Keuntungan.vue'), props: true }
    ]
  },

  {
    path: '/rekomendasi',
    name: 'Rekomendasi',
    redirect: '/rekomendasi',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      //UserInfo component is rendered when /user/:id is matched
      { path: '', name: 'Rekomendasi', component: () => import(/* webpackChunkName: "about" */ '../components/Rekomendasi.vue') },
      { path: 'filter', name: 'Filter', component: () => import(/* webpackChunkName: "about" */ '../views/Filter.vue'), props: true },
    ]

  },
  {
    path: '/simulasi',
    name: 'Simulasi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Simulasi.vue')
  }
  ,
  {
    path: '/result-simulasi',
    name: 'Result',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ChartSimulasi.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
