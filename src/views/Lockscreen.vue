<template>
    <div class="lockscreen">
        <div class="lockscreen-header">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link" >
                    <el-icon><EditPen /></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item  :class="{'is-focus':language.id==='zh-cn'}"  @click="changelanguage('zhcn')">
                        中文
                    </el-dropdown-item>
                    <el-dropdown-item  :class="{'is-focus':language.id==='en'}" @click="changelanguage('en')">
                        English
                    </el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="lockscreen-main">
            <el-card class="box-card">
               <div class="lockscreen-main-header">
                    <div class="lockscreen-main-header-portrait">
                        <el-avatar :src="info.portrait"/>
                    </div>
                    <div class="lockscreen-main-header-name">
                        <div>{{info.name}}</div>
                    </div>
               </div>
               <div class="lockscreen-main-input">
                    <el-input v-model="password"  placeholder="Please input password"  type="password"   @keyup.enter='login'>
                        <template #append><el-button text :icon="Key" @click='login'></el-button></template>
                    </el-input>
               </div>
            </el-card>
        </div>
    </div>
</template>
<script setup>
    import { Key , EditPen } from '@element-plus/icons-vue'
    import { ref , inject , onBeforeMount , onMounted}from "vue"
    import axios from "@/ToolPackage/axiosp";
    import { ElMessage } from 'element-plus'
    import router from '@/router';
    //国际化
    let language = inject('language')
    let changelanguage = inject('changelanguage')
    //获取用户名
    let userpower = JSON.parse(localStorage.getItem('jurisdiction'))
    let currentusername = localStorage.getItem('user')
    let info = ref({
        name:null,
        portrait:null
    })
   
    onBeforeMount(async()=>{
        let infook = await axios(`/global/${currentusername}`);
        if(infook.data.success){
            info.value.name = infook.data.userinfo.name;
            info.value.portrait = infook.data.userinfo.image;
        }
        sessionStorage.setItem('lockscreen',true)
    })
    let nowpath = sessionStorage.getItem('nowpath')
    let password = ref(null)
    async function login(){
        sessionStorage.setItem('lockscreen',false)
        let loginok = await axios.post('/login',{username:currentusername,userpassword:password.value})
        if(loginok.data.success=== true){
            router.push({
                path: nowpath
            })
        }else{
            ElMessage.error('登录失败')
        }
    }
</script>
<style scoped>
    .lockscreen{
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        padding: 25px;
    }
    .lockscreen-header{
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        z-index: 1;
    }
    .lockscreen-main{
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translateY(-30px)
    }
    .box-card{
        width: 35%;
        min-width: 300px;
        
    }
    .lockscreen-main-header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        margin-bottom:10px ;
    }
</style>