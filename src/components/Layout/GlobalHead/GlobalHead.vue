<template>
    <div  class="header-menu" >

        <div  class="header-menu-logo">
            <slot  name="logo"></slot>
        </div>

        <div  class="header-menu-navigation">
            <div>
                <slot name="splitmenu"></slot>
            </div>
        </div>

        <div  class="header-menu-main">

            <div  class="header-menu-main-full"  @click="tofull">
                <el-icon  class="step2"><FullScreen /></el-icon>
            </div>

            <div  class="header-menu-main-full"  @click="Lockscreen">
                <el-icon  class="step3"><Lock /></el-icon>
            </div>

            <div  class="header-menu-main-user">

                <el-dropdown trigger="click">

                    <span  class="header-menu-main-user-name step4">
                        <el-avatar  :size="30"  :src='Userinfos.image'/>
                        <span>{{Userinfos.name}}</span>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu  class='user-body'>

                            <el-dropdown-item  class="user-info">
                                <RouterLink  to="/account"  class="user-info-item">
                                    <el-icon ><Star /> </el-icon>
                                    {{language.router.PersonalCenter}}
                                </RouterLink>
                            </el-dropdown-item>

                            <div  style="margin:5px 0 ;border-top:solid 1px #dcdfe6;"></div>

                            <el-dropdown-item  class="user-log-out user-info" >
                                <div   class="user-info-item"  @click="LogOut">
                                    <el-icon >
                                        <component  :is="SwitchButton"></component>
                                    </el-icon>
                                    {{language.router.Logout}}
                                </div>
                            </el-dropdown-item>

                        </el-dropdown-menu>
                    </template>

                </el-dropdown>
            </div>
            <div  class="header-menu-main-language" >

                <el-dropdown  trigger="click"  class="step5">

                    <span  class="el-dropdown-link" >
                        <el-icon><EditPen /></el-icon>
                    </span>

                    <template  #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item  :class="{'is-focus':language.id==='zh-cn'}"  @click="changelanguage('zhcn')">中文</el-dropdown-item>
                            <el-dropdown-item  :class="{'is-focus':language.id==='en'}"  @click="changelanguage('en')">English</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    
                </el-dropdown>

            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref , inject , onBeforeMount , watch } from "vue"
    import { useRouter , useRoute } from 'vue-router'
    import { SwitchButton , FullScreen , EditPen , Lock  , Star} from '@element-plus/icons-vue'
    import axios from "@/ToolPackage/axiosp";
    //获取用户名
    let currentusername = localStorage.getItem('user')
    let Userinfos = ref({})
    //用户获取头像和昵称
    onBeforeMount(async()=>{
        let nameok = await axios(`/global/${currentusername}`)
        if(nameok.data.success){
            Userinfos.value = nameok.data.userinfo
        }
    })
    //头像发生变化是重新获取头像信息
    let headportrait = inject('headportrait')
    watch(headportrait,async (newvalue,oldvalue)=>{
        if(newvalue===true){
             let nameok = await axios(`/global/${currentusername}`)
            if(nameok.data.success){
                Userinfos.value = nameok.data.userinfo
            }
        }
    })
    //全屏
    function tofull(){
         if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
    }
    const router = useRouter()
    //退出登录
    async function LogOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('jurisdiction')
        localStorage.removeItem('role')
        router.push({
                path:'/login'
            })
    }
    //国际化
    let language = inject('language')
    let changelanguage = inject('changelanguage')

    let nowpath = useRoute().path
    //锁屏
    function Lockscreen() {
        sessionStorage.setItem('nowpath',nowpath)
        router.push({
                path:'/lockscreen'
            })
    }
</script>
<style scoped>
    @import url('./globalhead.css');
</style>
