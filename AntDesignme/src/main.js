import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//pinia
import { createPinia } from 'pinia'
//截图插件
import { CropperImage } from "./components/cropper";
//富文本编辑器
import  MEditor from "./components/MEditor/MEditor.vue";
//侧边导航
import  MAside from "./components/Layout/MAside/MAside.vue"
//logo
import  HeaderLogo  from "./components/Layout/HeaderLogo/HeaderLogo.vue";
//顶部
import  GlobalHead  from "./components/Layout/GlobalHead/GlobalHead.vue";
//封装菜单item
import  ListUnit  from './components/Layout/ListUnit/ListUnit.vue'




const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.use(CropperImage)
app.component('HeaderLogo',HeaderLogo)
   .component('GlobalHead',GlobalHead)
   .component('MAside',MAside)
   .component('MEditor',MEditor)
   .component('ListUnit',ListUnit)
   .component('NProgress',NProgress)
app.mount('#app')
