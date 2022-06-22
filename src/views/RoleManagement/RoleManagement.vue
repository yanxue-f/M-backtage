<template>
    <section class='tableList-show'>
        <div class="tableList-show-body">
            <el-table :data="rolekeyvalue" style="width: 100%">
                <el-table-column min-width="100" :label="language.roleoperation.rolename" prop="key" align="center" />
                <el-table-column min-width="100" :label="language.roleoperation.rolevalue" prop="value" align="center" />
                <el-table-column min-width="200" align="center">
                    <template #header>
                        <div class="Operations">
                            <div>{{language.userRole.operation}}</div>
                            <el-button type="primary" size="small" @click="openAddrole=true" :disabled="administer.disabledadd">
                                {{language.roleoperation.addrole}}<el-icon class="el-icon--right"><Plus /></el-icon>
                            </el-button>
                        </div> 
                    </template>
                    <template #default="scope">
                        <div class="Operations-btn">
                            <el-button size="small" type="primary" @click="handleEdit(scope.row)" :disabled="administer.disablededit(scope.row.value)">{{language.operation.edit}}</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.row)" :disabled="administer.disableddelete(scope.row.value)">{{language.operation.delete}}</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加新角色 -->
            <el-dialog v-model="openAddrole" :title="language.roleoperation.addnewuser" width="50%" :before-close="CancelAdd"> 
                <el-form :model="roledynamic" :rules="Rolerules" status-icon  label-width="auto">
                    <el-form-item  prop="key" :label="language.roleoperation.rolename">
                        <el-input v-model="roledynamic.key" />
                    </el-form-item>
                    <el-form-item  prop="value" :label="language.roleoperation.rolevalue">
                        <el-tooltip class="box-item" effect="light" :content="language.roleoperation.prompt" placement="right">
                            <el-input-number v-model="roledynamic.value" :min="currentuser.role+1"/>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item  :label="language.roleoperation.rolejur">
                        <div class="jurisdiction-container">
                            <el-tree
                                ref='addtree'
                                :data="roleList"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="[]"
                                :props="defaultProps"
                            />
                        </div>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div style="margin-right: 15px">
                        <el-button @click="CancelAdd">{{language.operation.cancel}}</el-button>
                        <el-button type="primary" @click='oktoadd' :disabled="!roleruleok || !rolevalueok || !rolenameok">{{language.operation.confirm}}</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 编辑角色 -->
            <el-dialog v-model="openEditrole" :title="language.roleoperation.editrple" width="50%"  :before-close="Cancelediting"> 
                <el-form :model="roledynamic" status-icon  label-width="auto">
                    <el-form-item  prop="key" :label="language.roleoperation.rolename">
                        <el-input v-model="roledynamic.key"/>
                    </el-form-item>
                    <el-form-item  prop="value" :label="language.roleoperation.rolevalue">
                        <el-tooltip class="box-item" effect="light" :content="language.roleoperation.prompt" placement="right">
                            <el-input-number v-model="roledynamic.value" :min="currentuser.role" v-if='currentuser.role===1'/>
                            <el-input-number v-model="roledynamic.value" :min="currentuser.role+1" v-else/>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item  :label="language.roleoperation.rolejur">
                        <div class="jurisdiction-container">
                            <el-tree
                                ref='edittree'
                                :data="roleList"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="RoleJurisdiction[rolerow]"
                                :props="defaultProps"
                            />
                        </div>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div style="margin-right: 15px">
                        <el-button @click="Cancelediting">{{language.operation.cancel}}</el-button>
                        <el-button type="primary" @click="oktoedit" :disabled='!Edited(oldrolevalue)'>{{language.operation.confirm}}</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 删除角色 -->
            <el-dialog v-model="opendeleterole" :title="language.roleoperation.deleterole" width="50%"  :before-close="Canceldelete"> 
                <el-form :model="roledynamic" status-icon  label-width="auto" disabled>
                    <el-form-item  prop="key" :label="language.roleoperation.rolename">
                        <el-input v-model="roledynamic.key" />
                    </el-form-item>
                    <el-form-item  prop="value" :label="language.roleoperation.rolevalue">
                        <el-tooltip class="box-item" effect="light" :content="language.roleoperation.prompt" placement="right">
                            <el-input-number v-model="roledynamic.value" :min="1"/>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item  :label="language.roleoperation.rolejur">
                        <div class="jurisdiction-container">
                            <el-tree

                                :data="roleList"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="RoleJurisdiction[rolerow]"
                                :props="defaultProps"
                            />
                        </div>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div style="margin-right: 15px">
                        <el-button @click="Canceldelete">{{language.operation.cancel}}</el-button>
                        <el-button type="primary" @click="oktodelete">{{language.operation.confirm}}</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </section>
</template>
<script setup>
    import {ref,reactive,onBeforeMount,inject} from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import {Select,CloseBold,Plus} from '@element-plus/icons-vue'
    import { storeToRefs } from 'pinia'
    import axios from "@/ToolPackage/axiosp";
    // 国际化
    let language=inject('language')

    let currentusername=localStorage.getItem('user')

    //配置管理角色界面
    import {roleadminister} from '@/store/RoleStore.js'
    let administer=roleadminister()
    //初始化页面数据
    let initialization=administer.initialization
    onBeforeMount(()=>{
        initialization(currentusername)
    })
    /**角色权限模板
     * 角色列表(权限)
     * 当前用户
     * 角色模板动态
     * 角色名映射
     * 角色名-值
     * 新建校色名和值是否存在
     * 判断是否已编辑权限
     * 添加角色是的对象
     * 编辑角色的对象
     * 删除角色对象
     */
    let {roleList , RoleJurisdiction , currentuser , roledynamic , rolename , rolekeyvalue , roleruleok , Edited , addtree , edittree,deletetree}=storeToRefs(administer)
    const defaultProps = ref({
        children: 'children',
        label: (data,node)=> language.value.router[data.label],
        disabled: (data,node)=>{
            if(!data.children){
                return !RoleJurisdiction.value[currentuser.value.role].includes(data.id)
            }else{
                return false
            }
            
        }
    })
    let rolerow=ref()
    //判断添加角色时是否符合规则
    let rolenameok=ref(false)
    let rolevalueok=ref(false)
    //创建角色时的规则
    const validatekey=(rule,value,callback)=>{
        let isnameexistence=rolekeyvalue.value.filter(item=>{
            return item.key.toLowerCase()===value.toLowerCase()
        })
        if(isnameexistence.length){
            rolenameok.value=false
            callback(new Error('当前角色已存在,请重新输入'))
        }else{
            rolenameok.value=true
            callback()
        }
    }
    const validatevalue=(rule,value,callback)=>{
        let isGradeexistence=rolekeyvalue.value.filter(item=>{
            return item.value===value
        })
        if(isGradeexistence.length){
            rolevalueok.value=false
            callback(new Error('当前角色值以存在,请重新输入'))
        }else{
            rolevalueok.value=true
            callback()
        }
    }
    const Rolerules = reactive({
        key:  [{ required: true, message: 'Please input the Rolename', trigger: 'blur' },{ validator: validatekey, trigger: 'blur' }],
        value: [{ required: true, message: 'Please input the Rolevalue', trigger: 'blur' },{ validator: validatevalue, trigger: 'change' }]
    })
   

     //打开角色添加模板
    let openAddrole=ref(false)
    //取消添加
    function CancelAdd(){
        openAddrole.value=false
        addtree.value.setCheckedNodes([])
    }
    let addRole=administer.addRole
    //确认添加
    function oktoadd(){
        openAddrole.value=false
        addRole()
        addtree.value.setCheckedNodes([])
    }

    //打开编辑面板
    let openEditrole=ref(false)
    //旧的角色值
    let oldrolevalue=ref(null)
    //点击编辑按钮
    function handleEdit(info){
        addroleinfo(info)
        oldrolevalue.value=info.value
        openEditrole.value=true
    }
    //取消编辑
    function Cancelediting(){
        openEditrole.value=false
        edittree.value.setCheckedNodes(RoleJurisdiction.value[rolerow.value])
    }
    let editrole=administer.editrole
    //确认编辑
    function oktoedit(){
        openEditrole.value=false
        editrole(oldrolevalue.value)
        edittree.value.setCheckedNodes(RoleJurisdiction.value[rolerow.value])
    }

    //打开删除面板
    let opendeleterole=ref(false)
    //点击删除按钮
    function handleDelete(info){
        addroleinfo(info)
        opendeleterole.value=true
        
    }
    //取消删除
    function Canceldelete(){
        opendeleterole.value=false
        deletetree.value.setCheckedNodes(RoleJurisdiction.value[rolerow.value])
    }
    let deleterole=administer.deleterole
    //确认删除
    function oktodelete(){
        opendeleterole.value=false
        deleterole()
        deletetree.value.setCheckedNodes(RoleJurisdiction.value[rolerow.value])
    }

    //添冲面板数据
    function addroleinfo(info){
        roledynamic.value.key=info.key;
        roledynamic.value.value=info.value;
        rolerow.value=info.value
    }
</script>
<style scoped>
    @import url('./RoleManagement.css');
</style>