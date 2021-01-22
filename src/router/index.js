import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =()=>import('../components/views/home/Home')
const Category =()=>import('../components/views/category/Category')
const Cart =()=>import('../components/views/cart/Cart.vue')
const Profile =()=>import('../components/views/profile/Profile')
const Detail =()=>import('../components/views/detail/Detail')

Vue.use(VueRouter)

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router=new VueRouter({
  routes,
  mode:'history'
})

export default router
