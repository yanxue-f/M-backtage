import { createRouter,  createWebHashHistory } from 'vue-router'
import {routers} from './routers.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
let routes=[
    {
      path: '/',
      name: 'root',
      meta:{title:"homedirectory"},
      redirect:"/homepage",
      component:() => import('../components/Layout/LayoutPage/LayoutPage.vue'),
      children:routers
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('../views/LogIn/LogIn.vue'),
      meta:{title:"Login",view:false},
      hidden:true
    },
    {
      path:'/lockscreen',
      name:'lockscreen',
      component:() => import('../views/Lockscreen.vue'),
      meta:{title:"lockscreen",verification:true, view:false},
      hidden:true
    },
]
console.log(import.meta.env.ZMKT_HTTP_URL)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  NProgress.start();
  if(from.path==='/lockscreen'){
    if(sessionStorage.getItem('lockscreen')==='true'){
      router.push({
        path:'/lockscreen'
      })
    }
  }
  //判断是否时最高权限
  if(to.meta.verification){
    if(localStorage.getItem('token')){
      //判定是否有访问权限 to.meta.view===power.view
        if(to.meta.hidden===true){
          next({path:from.path})
        }else{
          logonsuccess(from,to)
          next()
        }
    }else{
        next({
          path:'/login',
          query:{redirect:to.fullPath}}
          )
    }
  }else{
    logonsuccess(from,to)
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done();
})
function logonsuccess(from,to){
  if(from.path==='/login'){
      ElMessage({
        center: true,
        message: '登录成功',
        type: 'success',
      })
  }
}
export default router
