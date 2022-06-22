import { defineStore } from 'pinia';
import axios from "@/ToolPackage/axiosp";
import { ElMessage } from 'element-plus'
//角色模板静态
export let rolestatic;
export const roleadminister=defineStore('administer',{
    state:()=>{
        return{
            //角色对应权限模板列表
            roleList:{},
            //全部角色的权限
            RoleJurisdiction:[],
            //当前用户
            currentuser:null,
            //角色模板动态
            roledynamic:null,
            //角色名映射
            rolename:null,
            //角色值和角色名
            rolekeyvalue:[],
            //添加是的tree对象
            addtree:null,
            //编辑角色的对象
            edittree:null,
            //删除tree对象
            deletetree:null
        }
    },
    getters:{
        //判断当前权限
        nowJurisdiction:(state)=>{
            if(state.RoleJurisdiction.length!==0 || state.currentuser){
                return state.RoleJurisdiction[state.currentuser.role]
            }
        },
        disabledadd:(state)=>{
            if(!state.RoleJurisdiction || !state.currentuser) return true
        
            return !state.RoleJurisdiction[state.currentuser.role].includes('RoleA')
        },
        disablededit:(state)=>{
            if(!state.RoleJurisdiction || !state.currentuser) return true
            return (rowrole)=>{
                return !(state.RoleJurisdiction[state.currentuser.role].includes('RoleC') && (state.currentuser.role-rowrole)<0)
            }
        },
        disableddelete:(state)=>{
            if(!state.RoleJurisdiction || !state.currentuser) return true
            return (rowrole)=>{
                return !(state.RoleJurisdiction[state.currentuser.role].includes('RoleD') && (state.currentuser.role-rowrole)<0)
            }
         },
        roleruleok:(state)=>{
            if(state.roledynamic.key && state.roledynamic.value){
                return true
            }else{
                return false
            }
        },
        Edited:(state)=>{
            return (oldrole)=>{
                if(oldrole!==state.roledynamic.value){return true};
                if(state.rolename.get(oldrole).toLowerCase()!==state.roledynamic.key.toLowerCase()){return true};
                if(state.edittree && state.RoleJurisdiction){
                    if(state.RoleJurisdiction[oldrole].length!==state.edittree.getCheckedKeys().length){return true}
                    let length=state.RoleJurisdiction[oldrole].length
                    for (let i = 0; i < length; i++) {
                       if(!state.RoleJurisdiction[oldrole].includes(state.edittree.getCheckedKeys()[i])){
                            return true
                       } 
                    }
                    return false
                }
               
            }
        }
    },
    actions:{
        async initialization(name){
            this.rolename=null
            this.rolekeyvalue=[]
            let info=await axios.get(`/role/info/${name}`)
            if(info.data.success){
                this.roleList=info.data.rolelist;
                this.RoleJurisdiction=info.data.RoleJurisdiction
                this.currentuser=info.data.current;
                this.rolename=new Map(info.data.rolename)
                for (const key in info.data.rolename) {
                    this.rolekeyvalue.push({
                        key:info.data.rolename[key][1],
                        value:info.data.rolename[key][0]
                    })
                }
                this.roledynamic={
                    key:null,
                    value:null,
                    jurisdiction:info.data.rolelist
                }
                rolestatic={
                    key:null,
                    value:null,
                    jurisdiction:info.data.rolelist
                }
            }else{
                ElMessage.error(info.data.error)
            }
        },
        async addRole(){
            if(this.rolename.has(this.roledynamic.value)){
                ElMessage.error('当前职位已存在')
            }else{
                let ok=true
                for (const item in this.rolekeyvalue) {
                    if(this.rolekeyvalue[item].key.toLowerCase()===this.roledynamic.key.toLowerCase()){
                        ok=false
                        ElMessage.error('当前角色名映射已存在请重新输入')
                        break
                    }
                }
                if(ok){
                    let newrole={
                        key:this.roledynamic.key,
                        value:this.roledynamic.value,
                        jurisdiction:this.addtree.getCheckedKeys()
                    }
                    let addsuccess=await axios.post('/role/add',newrole)
                    if(addsuccess.data.success){
                        this.rolename=null;
                        this.rolekeyvalue=[];
                        this.RoleJurisdiction=addsuccess.data.RoleJurisdiction
                        this.rolename=new Map(addsuccess.data.rolename)
                        for (const key in addsuccess.data.rolename) {
                            this.rolekeyvalue.push({
                                key:addsuccess.data.rolename[key][1],
                                value:addsuccess.data.rolename[key][0]
                            })
                        }
                        this.roledynamic=rolestatic
                        ElMessage({
                            message: '角色添加成功',
                            type: 'success',
                          })
                    }
                }
                
            }
        },
        async editrole(oldname){
            let newrole={
                key:this.roledynamic.key,
                value:this.roledynamic.value,
                jurisdiction:this.edittree.getCheckedKeys()
            }
            let editok=await axios.post('/role/edit',{olduser:oldname,currentuser:this.currentuser,newuser:newrole})
            if (editok.data.success) {
                //判断是否替换user
                if(oldname!==this.roledynamic.value){
                    this.currentuser.role=this.roledynamic.value-0
                }
                this.rolename=null;
                this.rolekeyvalue=[];
                this.RoleJurisdiction=editok.data.RoleJurisdiction;
                this.rolename=new Map(editok.data.rolename)
                for (const key in editok.data.rolename) {
                    this.rolekeyvalue.push({
                        key:editok.data.rolename[key][1],
                        value:editok.data.rolename[key][0]
                    })
                }
                this.roledynamic=rolestatic
                ElMessage({
                    message: '角色修改成功',
                    type: 'success',
                    })
            }   
        },
        async deleterole(){
            let deleterole=await axios.post('/role/delete',{value:this.roledynamic.value})
            if(deleterole.data.success){
                this.rolename=null;
                this.rolekeyvalue=[];
                this.RoleJurisdiction=deleterole.data.RoleJurisdiction;
                this.rolename=new Map(deleterole.data.rolename)
                for (const key in deleterole.data.rolename) {
                    this.rolekeyvalue.push({
                        key:deleterole.data.rolename[key][1],
                        value:deleterole.data.rolename[key][0]
                    })
                }
                this.roledynamic=rolestatic
                ElMessage({
                    message: '角色删除成功',
                    type: 'success',
                    })
            }
        },
    }
})