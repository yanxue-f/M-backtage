import { defineStore } from 'pinia';
import axios from "@/ToolPackage/axiosp";
import { ElMessage } from 'element-plus'
//角色模板静态
export let rolestatic;
export const roleadminister=defineStore('administer',{
    state:()=>{
        return{
            //角色列表
            roleList:{},
            //当前用户
            currentuser:null,
            //角色模板动态
            roledynamic:null,
            //角色名映射
            rolename:null,
            //角色值和角色名
            rolekeyvalue:[],
        }
    },
    getters:{
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
                for (const item in state.roledynamic.jurisdiction) {
                    if (state.roledynamic.jurisdiction[item]!==state.roleList[oldrole][item]) {
                        return true;
                    }
                }
                return false
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

                this.currentuser=info.data.current;
                this.roledynamic={
                    key:null,
                    value:null,
                    jurisdiction:info.data.role
                }
                rolestatic={
                    key:null,
                    value:null,
                    jurisdiction:info.data.role
                }
               
                this.rolename=new Map(info.data.rolename)
                for (const key in info.data.rolename) {
                    this.rolekeyvalue.push({
                        key:info.data.rolename[key][1],
                        value:info.data.rolename[key][0]
                    })
                }
                console.log(this.currentuser);

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
                    let addsuccess=await axios.post('/role/add',this.roledynamic)
                    if(addsuccess.data.success){
                        this.rolename=null;
                        this.rolekeyvalue=[];
                        this.roleList=addsuccess.data.rolelist;
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
            let changeok=true
            if(oldname===this.roledynamic.value){
                if(this.rolename.get(oldname).toLowerCase()===this.roledynamic.key.toLowerCase()){
                    for (const key in this.roleList[oldname]) {
                       if(this.roleList[oldname][key]!==this.roledynamic.jurisdiction[key]){
                            changeok=false
                            break
                       }
                    }
                    if(changeok){
                        ElMessage.error('当前角色属性信息未发生变化')
                    }
                }else{
                    for (let i = 0; i < this.rolekeyvalue.length; i++) {
                        if(this.rolekeyvalue[i].key.toLowerCase()===this.roledynamic.key.toLowerCase()){
                            changeok=true
                            break
                        }else{
                            changeok=false
                        }
                    }
                    if(changeok){
                        ElMessage.error('当前角色映射值已存在')
                    }
                }
            }else{
                if(this.rolename.has(this.roledynamic.value)){
                    changeok=true
                    ElMessage.error('当前角色已存在')
                }else{
                    changeok=false
                }
            }
            if(!changeok){
                let editok=await axios.post('/role/edit',{olduser:oldname,newuser:this.roledynamic})
                if (editok.data.success) {
                    //判断是否替换user
                    if(oldname!==this.roledynamic.value){
                        this.currentuser.role=this.roledynamic.value-0
                        localStorage.removeItem('jurisdiction')
                        localStorage.setItem('jurisdiction',JSON.stringify(this.roleList[this.currentuser.role]))
                    }
                    this.rolename=null;
                    this.rolekeyvalue=[];
                    this.roleList=editok.data.rolelist;
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
                
            }
            
        },
        async deleterole(){
            let deleterole=await axios.post('/role/delete',{value:this.roledynamic.value})
            if(deleterole.data.success){
                this.rolename=null;
                this.rolekeyvalue=[];
                this.roleList=deleterole.data.rolelist;
                this.rolename=new Map(deleterole.data.rolename)
                for (const key in deleterole.data.rolename) {
                    this.rolekeyvalue.push({
                        key:deleterole.data.rolename[key][1],
                        value:deleterole.data.rolename[key][0]
                    })
                }
                this.roledynamic=rolestatic
                ElMessage({
                    message: '角色修改成功',
                    type: 'success',
                    })
            }
        }
    }
})