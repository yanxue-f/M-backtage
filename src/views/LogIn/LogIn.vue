<template>
    <div class="login-body">
        <div class="signin-header">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link" >
                    <el-icon><EditPen /></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :class="{'is-focus':language.id==='zh-cn'}" @click="changelanguage('zhcn')">中文</el-dropdown-item>
                    <el-dropdown-item :class="{'is-focus':language.id==='en'}" @click="changelanguage('en')">English</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="new-container">
            <div class="new-body">
                <div class="new-body-header">
                    {{language.login.title}}
                </div>
                <div class="new-body-form">
                    <el-form :model="passwordForm" :rules="passrules" ref="passlogin">
                        <el-form-item  prop="name">
                            <el-input size="large"  :prefix-icon="User" v-model="passwordForm.name" :placeholder="language.login.user"/>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <el-input size="large" :prefix-icon="Key" v-model="passwordForm.password" :placeholder="language.login.pass" type="password" show-password/>
                        </el-form-item>
                        <el-form-item class="new-body-fornew-btn">
                            <el-button size="large" type="primary" :disabled="!isLogin"  @click="passwordLogin">{{language.login.login}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="signin-footer">
            
        </div>
    </div>
</template>

<script>
export default {
    name:"sign-in"
}
</script>

<script setup>
import { reactive , ref , onMounted , inject , watch } from 'vue'
import { Unlock, User , Key , Iphone , EditPen } from '@element-plus/icons-vue'
// import { JSEncrypt } from "jsencrypt"
import { SigninStore } from '@/store/LogInStore'
import { storeToRefs } from 'pinia'
// import axios from "../../../ToolPackage/axiosp"

//国际化
let language = inject('language')
let changelanguage = inject('changelanguage')

//登录状态管理
let signin = SigninStore()
//密码登录的信息 , 满足登录条件 , 表单实例
const { passwordForm,  isLogin , passlogin} = storeToRefs(signin)
//用户名规则
const validatename = (rule,value,callback)=>{
    let reg = /^[a-z0-9_-]{4,14}$/
    if(!reg.test(value)){
        callback(new Error(language.value.login.usererror1))
    }else{
        callback()
    }
}
//密码规则
const validatepass = (rule,value,callback)=>{
    let reg = /^(?=.*[a-z0-9])[^]{8,16}$/
    if(!reg.test(value)){
        callback(new Error(language.value.login.passerror2))
    }else{
        callback()
    }
}
//用户密码登录时的验证规则
const passrules = {
  name: [
      { required: true, message: language.value.login.usererror2, trigger: 'blur' },
      { validator: validatename, trigger: 'blur' }
    ],
  password:[
      { required: true, message: language.value.login.passerror1, trigger: 'blur' },
      { validator: validatepass, trigger: 'blur' }
  ] 
}
//密码点击登录
//加以验证
let passwordLogin = signin.passwordLogin
</script>
<style scoped>
    @import url('./login.css');
</style>