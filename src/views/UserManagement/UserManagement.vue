<template>
    <section class='tableList-show'>

        <div class="tableList-show-body">

            <el-table :data="currentuserlist" style="width: 100%">

                <el-table-column min-width="100" :label="language.userRole.Role">

                    <template #default="scope">

                        <div>{{rolename.get(scope.row.role)}}</div>

                    </template>

                </el-table-column>

                <el-table-column :label="language.userRole.Name"  prop="username" min-width="100" />

                <el-table-column :label="language.userRole.Jurisdiction">

                        <template #default="scope">

                            <div>{{scope.row.role}}</div>

                        </template>

                </el-table-column>

                <el-table-column  width="142" min-width="142" align='center'>

                    <template #header>

                        <div>{{language.userRole.operation}}</div>

                        <el-button type="primary" size="small" @click="openadduser = true" :disabled="management.disableadd">

                            {{language.useroperation.adduser}}<el-icon class="el-icon--right"><Plus /></el-icon>

                        </el-button>

                    </template>

                    <template #default="scope">

                        <el-button size="small" type="primary" @click="handleEdit(scope.row.username)" :disabled="management.disablededit(scope.row.role)" >{{language.operation.edit}}</el-button>
                        
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.username)" :disabled="management.disableddelete(scope.row.role)" >{{language.operation.delete}}</el-button>
                    
                    </template>
                
                </el-table-column>
           
            </el-table>

            <!-- 分页 -->
            <div class="pagination-container">
             
                <el-pagination v-model:currentPage="currentpage" v-model:page-size="pagesize" :page-sizes="pagesizes" background :layout="paginationitem" :total="total" @size-change="SizeChange"  @current-change="CurrentChange" />
            
            </div>   
            
            <!-- 添加新用户-->
            <el-dialog v-model="openadduser" :title="language.useroperation.addnewuser" width="50%" :before-close="userreturn"> 
                
                <el-form :model="usertemplate" :rules="passrules" status-icon  label-width="auto" ref='addnewuser'>
                    
                    <el-form-item  prop="username" :label="language.useroperation.user">
                       
                       <el-input v-model="usertemplate.username" />
                    
                    </el-form-item>
                    
                    <el-form-item  prop="password" :label="language.useroperation.password">
                        
                        <el-input v-model="usertemplate.password" type="password"/>
                    </el-form-item>

                    <el-form-item  prop="againpassword" :label="language.useroperation.newpassword">

                        <el-input v-model="usertemplate.againpassword" type="password"/>

                    </el-form-item>

                    <el-form-item  :label="language.useroperation.role">

                        <el-select v-model="usertemplate.role" placeholder="Role" >

                            <el-option v-for="role in allrole" :key="role.id" :label="rolename.get(role)" :value="role" :disabled="!((CurrentUser.role-role)<0)"/>

                        </el-select>

                    </el-form-item>

                </el-form>

                <template #footer>

                    <div style="margin-right: 15px">

                        <el-button  @click="userreturn">{{language.operation.cancel}}</el-button>

                        <el-button type="primary" @click="useradd" :disabled="!complyrules" >{{language.operation.confirm}}</el-button>

                    </div>

                </template>

            </el-dialog>

            <!-- 编辑用户信息 -->
            <el-dialog v-model="openEdit" :title="language.useroperation.edituser" width="50%" :before-close="editreturn">

                <el-form :model="usertemplate" status-icon label-width="auto" :rules="passrules">

                    <el-form-item  prop="username" :label="language.useroperation.user">

                        <el-input v-model="usertemplate.username" disabled/>

                    </el-form-item>

                    <el-form-item  prop="password" :label="language.useroperation.password">

                        <el-input v-model="usertemplate.password" type="password" disabled/>

                    </el-form-item>

                    <el-form-item  :label="language.useroperation.role">

                        <el-select v-model="usertemplate.role" placeholder="Role" >

                            <el-option v-for="role in allrole" :key="role.id" :label="rolename.get(role)" :value="role" :disabled="!((CurrentUser.role-role)<0)" />
                        
                        </el-select>

                    </el-form-item>

                </el-form>

                <template #footer> 

                    <div style="margin-right: 15px">

                        <el-button  @click="editreturn">{{language.operation.cancel}}</el-button>

                        <el-button type="primary" @click="edittrue" :disabled="!changeinfo(oldname)">{{language.operation.confirm}}</el-button>

                    </div>

                </template>

            </el-dialog>
            
            <!-- 删除用户信息-->
            <el-dialog v-model="opendelete" :title="language.useroperation.deleteuser" width="50%" :before-close="deleteno">

                <el-form :model="usertemplate" status-icon label-width="auto" :rules="passrules" disabled>

                    <el-form-item  prop="username" :label="language.useroperation.user">

                        <el-input v-model="usertemplate.username" />

                    </el-form-item>

                    <el-form-item  prop="password" :label="language.useroperation.password">

                        <el-input v-model="usertemplate.password" type="password"/>

                    </el-form-item>

                    <el-form-item  :label="language.useroperation.role">

                        <el-select v-model="usertemplate.role" placeholder="Role">

                            <el-option v-for="role in allrole" :key="role.id" :label="rolename.get(role)" :value="role"/>

                        </el-select>

                    </el-form-item>

                </el-form>

                <template #footer>

                    <div style="margin-right: 15px">

                        <el-button  @click="deleteno">{{language.operation.cancel}}</el-button>

                        <el-button type="primary" @click="deletetrue">{{language.operation.confirm}}</el-button>

                    </div>

                </template>

            </el-dialog>

        </div>

    </section>
</template>
<script setup>
    import { ref , reactive , onBeforeMount , inject , watch} from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { Select , CloseBold , Plus } from '@element-plus/icons-vue'
    import { storeToRefs } from 'pinia'
    import axios from "@/ToolPackage/axiosp";
    import { ElMessage } from 'element-plus'

    let currentusername=localStorage.getItem('user')
    // console.log(userpower,currentusername);
    // 国际化
    let language=inject('language')


    //配置下面的管理员界面
    import {userManagement} from '@/store/UserStore.js'
    let management=userManagement()

    //初始化数据
    let GetUsers=management.GetUsers
    onBeforeMount(async()=>{
        GetUsers(currentusername)
        if(sessionStorage.getItem("page")){
            currentpage.value=sessionStorage.getItem("page")-0
            sessionStorage.removeItem("page")
        }
        if(sessionStorage.getItem("pagesize")){
            pagesize.value=sessionStorage.getItem("pagesize")-0
            sessionStorage.removeItem("pagesize")
        }
        
    })

    /** 所有用户的信息：userList
     * 全部职业等级 ：allrole
     * 全部职业权限 ：roleJurisdiction
     * 角色名映射 ：rolename
     * 当前用户信息 ：CurrentUser
     * 用户的属性面板模板 ：usertemplate
     * 添加新用户dom
     * 判断新用户的密码与用户名是否合格
     * 数据是否修改
     * @management
     */
    let {userList,allrole,roleJurisdiction,rolename,CurrentUser,usertemplate,addnewuser,complyrules,changeinfo} = storeToRefs(management)
    /**获取分页所需要的信息
     * 信息总 ：total
     * 当前页 ：currentpage
     * 每页条数 ：pagesize
     * 可选的每页条数 ：pagesizes
     * 当前页展示的信息 :currentuserlist
     * 分页组件显示的元素

     */
    let {total,currentpage,pagesize,pagesizes,currentuserlist,paginationitem } = storeToRefs(management)

    //当前的分页控件
    //设备名称 js媒体查询
    import {useResize} from '@/ToolPackage/equipment.js'
    let equipment=useResize().device
    watch(equipment,(newvalue,oldvalue)=>{
      if(newvalue==='desktop'){
            paginationitem.value='total, sizes, prev, pager, next, jumper'
        }else if(newvalue==='tablet'){
            paginationitem.value='total, sizes, prev, pager, next'
        }else if(newvalue==='mobile'){
            paginationitem.value='total, prev, pager, next'
        }
    },{ immediate:true })
    //当前页改变时触发的事件
    let CurrentChange=management.CurrentChange

    //每页条数改变时触发
    let SizeChange=management.SizeChange
    window.onbeforeunload=function(){
        sessionStorage.setItem('page', currentpage.value);
        sessionStorage.setItem('pagesize', pagesize.value);
    }
    
    //打开添加用户面板
    let openadduser=ref(false)
    
    //添加新用户时用户名和密码的规则
    const validatename=(rule,value,callback)=>{
        // 判断用户名是否为空
        let reg=/^[a-z0-9_-][a-z0-9_-]{2,14}$/
        if(!reg.test(value)){
            callback(new Error('用户名规则4到16位(字母,数字,下划线,减号)'))
        }else{
            callback()
        }
    }
    //密码规则
    const validatepass=(rule,value,callback)=>{
        let reg=/^(?=.*[a-z0-9])[^]{8,16}$/
        if(!reg.test(value)){
            callback(new Error('至少8-16个字符,1个小写字母和1个数字,其他可以是任意字符'))
        }else{
            callback()
        }
    }
    //重新输入密码
    const validatepassnext=(rule,value,callback)=>{
        let reg=/^(?=.*[a-z0-9])[^]{8,16}$/
        if(!reg.test(value)){
            callback(new Error('至少8-16个字符,1个小写字母和1个数字,其他可以是任意字符'))
        }else{
            if(value !== usertemplate.value.password){
            callback(new Error('两次密码不一致,请重新输入'))
        }else{
            callback()
        }
        }
    }
    const passrules = {
        username: [
            { required: true, message: 'Please input the user', trigger: 'blur' },
            { validator: validatename, trigger: 'blur' }],
        password: [
            { required: true, message: 'Please input the password', trigger: 'blur' },
            { validator: validatepass, trigger: 'blur' }],
        againpassword: [ 
            { required: true, message: 'Please confirm the password', trigger: 'blur' },
            { validator: validatepassnext, trigger: 'blur' }]
    }
    //取消添加新用户
    function userreturn() {
        openadduser.value=false
        for (const key in usertemplate.value) {
            usertemplate.value[key]=null
        }
    }
    //添加新用户
    let adduser=management.adduser
    function useradd() {
        addnewuser.value.validate((valid) => {
            if (valid) {
                openadduser.value=false
                adduser()
            } else {
                ElMessage({
                    grouping: true,
                    message: `请正确添写信息`,
                    type: 'error',
                })
            }
        })
        
    }

    
    let oldname=ref(null)
    //编辑
    async function handleEdit(info){
        let newinfo=await axios.get(`/useList/${info}`)
        oldname.value=info
        openEdit.value=true
        usertemplate.value=newinfo.data.currentuser
    }
    //删除
    async function handleDelete(info){
        opendelete.value=true
        let newinfo=await axios.get(`/useList/${info}`)
        usertemplate.value=newinfo.data.currentuser
    }


    //打开编辑面板
    let openEdit=ref(false)
    let changeUser=management.changeUser;
    //确认编辑
    function edittrue() {
        openEdit.value=false
        changeUser(oldname.value)
        setTimeout(() => {
            userpower=JSON.parse(localStorage.getItem('jurisdiction'))
        }, 0);
    }
    //取消编辑
    function editreturn() {
        openEdit.value=false
        for (const key in usertemplate.value) {
            usertemplate.value[key]=null
        }
    }

    //打开删除面板
    let opendelete=ref(false)
    let deleteUsers=management.deleteUser
    //确认删除
    function deletetrue(){
        opendelete.value=false
        deleteUsers()
    }
    //取消删除
    function deleteno(){
        opendelete.value=false
        for (const key in usertemplate.value) {
            usertemplate.value[key]=null
        }
    }
</script>
<style scoped>
    @import url('./UserManagement.css');
</style>