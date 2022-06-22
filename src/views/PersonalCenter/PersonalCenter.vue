<template>
    <div class="pensonal">
        <div class="pensonal-info">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{language.personal.personalinfo}}</span>
                    </div>
                </template>
                <div class="pensonal-info-body">
                    <div class="pensonal-info-avatar" @click="openchangepensonal=true">
                        <img ref="imgref" :src="userinfo.image" class="image"/>
                        <div class="pensonal-info-avatar-edit">
                            <el-icon><Plus /></el-icon>
                        </div>
                    </div>
                <div class="pensonal-info-show">
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><User /></el-icon>
                            <span>{{language.personal.username}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{currentusername}}
                        </div>
                    </div>
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><Iphone /></el-icon>
                            <span>{{language.personal.telephone}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{userinfo.template}}
                        </div>
                    </div>
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><Message /></el-icon>
                            <span>{{language.personal.email}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{userinfo.email}}
                        </div>
                    </div>
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><Avatar /></el-icon>
                            <span>{{language.personal.role}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{rolename.get(userNPR.role)}}
                        </div>
                    </div>
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><HomeFilled /></el-icon>
                            <span>{{language.personal.city}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{userinfo.city}}
                        </div>
                    </div>
                    <div class="pensonal-info-show-item">
                        <div class="pensonal-info-show-item-left">
                            <el-icon><Calendar /></el-icon>
                            <span>{{language.personal.time}}</span>
                        </div>
                        <div class="pensonal-info-show-item-right">
                            {{userinfo.createdAt}}
                        </div>
                    </div>
                </div>
                </div>
            </el-card>
        </div>
        <div class="pensonal-information">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{language.personal.basicinfo}}</span>
                    </div>
                </template>
                <el-tabs v-model="activeName" class="demo-tabs" @tab-change='changetab'>
                    <el-tab-pane :label="language.personal.basicinfo" name="first">
                        <div class="pensonal-information-item">
                            <el-form ref="userinfoRef"  :model="userinfo" status-icon :rules="userinforules" label-width="100px" class="demo-ruleForm" >
                                <el-form-item :label="language.personal.usernick" prop="name">
                                    <el-input v-model="userinfo.name"  autocomplete="off"  />
                                </el-form-item>
                                <el-form-item :label="language.personal.telephone" prop="template" >
                                    <el-input v-model="userinfo.template"  autocomplete="off"/>
                                </el-form-item>
                                <el-form-item :label="language.personal.email" prop="email">
                                    <el-input v-model="userinfo.email"  autocomplete="off"  />
                                </el-form-item>
                                <el-form-item :label="language.personal.gender" prop="gender" >
                                    <el-radio-group v-model="userinfo.gender" >
                                        <el-radio :label='0' size="large">{{language.personal.male}}</el-radio>
                                        <el-radio :label='1' size="large">{{language.personal.gril}}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :disabled="changeornot"  @click="okchangeinfo(userinfoRef)">{{language.personal.keep}}</el-button>
                                    <el-button type="danger" :disabled="changeornot" @click="onescinfo(userinfoRef)">{{language.personal.close}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="language.personal.changepass" name="second">
                        <div class="pensonal-information-item">
                            <el-form ref="paswordinfo"  :model="paswordchange" status-icon :rules="paswordinfoforules" label-width="100px" class="demo-ruleForm" >
                                <el-form-item :label="language.personal.oldpass" prop="password">
                                    <el-input v-model="paswordchange.password"  type="password" show-password />
                                </el-form-item>
                                <el-form-item :label="language.personal.newpass" prop="newpassword">
                                    <el-input v-model="paswordchange.newpassword" type="password" show-password  />
                                </el-form-item>
                                <el-form-item :label="language.personal.okpass" prop="confirmpassword">
                                    <el-input v-model="paswordchange.confirmpassword" type="password" show-password  />
                                </el-form-item>
                                <el-form-item>
                                    <el-button  type="primary"  :disabled="!changepasswordok"  @click="okchangepass(paswordinfo)">{{language.personal.keep}}</el-button>
                                    <el-button  type="danger"  @click="escchange(paswordinfo)">{{language.personal.close}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
        <el-dialog v-model="openchangepensonal" title="修改图片" custom-class="cropperimage-container" >
            <cropper-image :imageurl='userinfo.image' :open='openchangepensonal' :Swidth='100' :Sheight='100' @submit="changeimage" :active='currentusername'></cropper-image>
        </el-dialog>
    </div>
</template>
<script setup>
//获取状态管理
import { inject , ref , onBeforeMount , watch , provide } from "vue";
import { Plus, User ,Iphone ,HomeFilled ,Message,Avatar,Calendar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 国际化
let language = inject('language')
/**获取当前用户名 */
let currentusername = localStorage.getItem('user')

import { personinfoes } from "@/store/PersonalCenterStore.js";
import { storeToRefs } from 'pinia'
let personinfo = personinfoes()
//获取信息
let initialization = personinfo.initialization
onBeforeMount(()=>{
    initialization(currentusername)
})
/**角色名影视
 * 用户密码角色
 * 用去其他信息
 * 修改密码
 * 密码是否修改完成
 * 信息是否修改完成
 * 是否禁用信息保存修改
 * 是否禁用密码保存修改
 */
let { rolename , userNPR , userinfo , paswordchange , changepassok , changeinfook , changeornot , changepasswordok}=storeToRefs(personinfo)
watch(changepassok,(newvalue,oldvalue)=>{
    if(newvalue===true){
        ElMessage({
            message: language.value.personal.changepassok,
            type: 'success',
        })
    }else if(newvalue===false){
        ElMessage.error(language.value.personal.changepassno)
    }
})
watch(changeinfook,(newvalue,oldvalue)=>{
    if(newvalue===true){
        ElMessage({
            message: language.value.personal.changeinfook,
            type: 'success',
        })
    }else if(newvalue===false){
        ElMessage.error(language.value.personal.changeinfono)
    }
})
const activeName = ref('first')
//基本资料对象
let userinfoRef=ref({})
//基本资料的验证
let userinforules=ref({
    name:[
        {required:true,message: language.value.personal.nameerror1, trigger: 'blur'},
        {whitespace:true, message:language.value.personal.nameerror2, trigger: 'change' },
    ],
    template:[
        {required:true,message: language.value.personal.temperror1, trigger: 'blur'},
        {pattern: /^[0-9]{5,11}$/,message: language.value.personal.temperror2, trigger: 'change'},
    ],
    email:[
        {required:true,message: language.value.personal.emailerror1, trigger: 'blur'},
        {pattern:/^[a-zA-Z0-9_-]\.?[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: language.value.personal.emailerror2, trigger: 'change'},
    ],
})

let Resetuserinfo=personinfo.Resetuserinfo
//取消修改信息
function onescinfo(inforef){
    if (!inforef) return
    Resetuserinfo()
    inforef.clearValidate()
}
let changeinfo=personinfo.changeinfo
function okchangeinfo(inforef){
    inforef.validate((valid) => {
        if (valid) {
            changeinfo(currentusername)
        } else {
            ElMessage({
                grouping: true,
                message: language.value.personal.changeinfono1,
                type: 'error',
            })
        }
    })
   
}


//修改密码
let paswordinfo=ref({})
let paswordinfoforules=ref({
    password:[
        {required:true,message: language.value.personal.oldpasserror1, trigger: 'blur'},
        { validator: oldpasswords, trigger: 'blur' }
    ],
    newpassword:[
        {required:true,message: language.value.personal.newpasserror1, trigger: 'blur'},
        { validator: newpasswords, trigger: 'blur' }
    ],
    confirmpassword:[
        {required:true,message: language.value.personal.okpasserror1, trigger: 'blur'},
        { validator: confirmpasswords, trigger: 'change' }
    ],
})
function oldpasswords(rule, value, callback) {
    if(paswordchange.value.password===userNPR.value.password){
        callback()
    }else{
        callback(language.value.personal.oldpasserror2)
    }
}
function newpasswords(rule, value, callback) {
    if(paswordchange.value.newpassword!==userNPR.value.password){
        callback()
    }else{
        callback(language.value.personal.newpasserror2)
    }
}
function confirmpasswords(rule, value, callback) {
    if(paswordchange.value.newpassword===paswordchange.value.confirmpassword){
        callback()
    }else{
        callback(language.value.personal.okpasserror2)
    }
}
//取消修改密码
function escchange(inforef){
    if (!inforef) return
    inforef.resetFields()
}
let changepassword=personinfo.changepassword
//确定修改密码
function okchangepass(inforef){
    inforef.validate((valid) => {
        if (valid) {
            let obj={
                username:currentusername,
                newpassword:paswordchange.value.newpassword
            }
            changepassword(obj)
            paswordinfo.value.resetFields()
        } else {
            ElMessage({
                grouping: true,
                message: language.value.personal.changepassno1,
                type: 'error',
            })
        }
    })
    
}
function changetab(activeName){
    if(activeName==='first'){
        Resetuserinfo()
        userinfoRef.value.clearValidate()
    }
    if(activeName==='second'){
        paswordinfo.value.resetFields()
    } 
}
//头像参数
let imgref=ref(null)
//修改头像按钮是否打开
let openchangepensonal=ref(false)
let headportrait=inject('headportrait')
//保存图片修改事件
function changeimage(){
    openchangepensonal.value=false
    initialization(currentusername)
    headportrait.value=true
    setTimeout(() => {
        headportrait.value=false
    }, 200)
}
</script>
<style scoped>
    @import url('./PersonalCenter.css');
</style>