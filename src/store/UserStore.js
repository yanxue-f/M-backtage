import { defineStore } from 'pinia'
import axios from "@/ToolPackage/axiosp";
// import axios from 'axios';
import { ElMessage } from 'element-plus'
let templateold;
//创建pinia状态管理器
export const userManagement = defineStore('management', {
    state:()=>{
        return {
            //当前用户
            CurrentUser:{},
            //全部的用户列表
            userList:[],
            //各种职业的权限
            roleJurisdiction:{},
            //模板
            usertemplate:{},
            //全部职业
            allrole:[],
            //角色名映射
            rolename:null,
            //添加新用户
            addnewuser:null,




            //分页需要的
            //信息条数
            total:0,
            //当前页
            currentpage:1,
            //每页条数
            pagesize:2,
            //可选的每页条数
            pagesizes:[2,4,8,16],
            //当前页展示的信息
            currentuserlist:[],
            //分页组件显示的元素
            paginationitem:'total, sizes, prev, pager, next, jumper',

        }
    },
    getters:{
     //判断新用户的密码与用户名是否合格
     complyrules:(state)=>{
        for (const key in state.usertemplate) {
            if(!state.usertemplate[key]){
                return false
            }
        }
        if(state.usertemplate.againpassword){
            return true
            
        }else{
            return false
        }
     },
     changeinfo:(state)=>{
        return (oldname)=>{
            let nowuser=state.userList.filter(item=>{
                return item.username===oldname
            })[0]
            for (const key in state.usertemplate) {
                if(state.usertemplate[key]!==nowuser[key]){
                    return true
                }
            }
            return false
        }
     },
     disabledadd:(state)=>{
        if(!state.roleJurisdiction || !state.CurrentUser.role) return true
        
        return !state.roleJurisdiction[state.CurrentUser.role].includes('UserA')
     },
     disablededit:(state)=>{
        if(!state.roleJurisdiction || !state.CurrentUser.role) return true
        return (rowrole)=>{
            return !(state.roleJurisdiction[state.CurrentUser.role].includes('UserC') && (state.CurrentUser.role-rowrole)<0)
        }
     },
     disableddelete:(state)=>{
        if(!state.roleJurisdiction || !state.CurrentUser.role) return true
        return (rowrole)=>{
            return !(state.roleJurisdiction[state.CurrentUser.role].includes('UserD') && (state.CurrentUser.role-rowrole)<0)
        }
     },
    },
    actions: {
        //获取用户列表及模板
        async GetUsers(name){
            this.allrole=[];
            let list=await axios.get(`/getusers`)
            this.roleJurisdiction=list.data.roleJurisdiction
            this.userList=list.data.list
            this.total=list.data.list.length
            this.getcurrentpage()
            this.CurrentUser=this.userList.filter((item)=>{
                return item.username===name
            })[0]
            templateold=list.data.usermould
            this.usertemplate=list.data.usermould
            this.rolename=new Map(list.data.roles)
            list.data.roles.forEach((value)=>{
                this.allrole.push(value[0])
            })
        },
        //获取当前页
        getcurrentpage(){
            this.userList.sort((a,b)=>{
                return a.role-b.role
            })
            this.currentuserlist=this.userList.slice((this.currentpage-1)*this.pagesize,this.currentpage*this.pagesize)
        },
        //向后台添加新的用户
        async adduser(){
            //将新建的用户名发送过去判断是否存在
            const isnew=await axios.get(`/judge/${this.usertemplate.username}`)
            if(isnew.data.success){
                let Publickey=isnew.data.Publickey
                /**
                 * 使用公钥
                 * 对密码进行加密
                 * JSEncrypt组件
                 * let cryptJSE=new JSEncrypt();
                 * cryptJSE.setPublicKey(publickey);
                 * let password=cryptJSE.encrypt(userpassword);
                 * 省略
                 */
                //将要存入的信息post给后台
                const addok=await axios.post('/userList/add',this.usertemplate)
                if(addok.data.success){
                    ElMessage({
                        message: '用户添加成功',
                        type: 'success',
                      })
                    this.userList=addok.data.list
                    this.total=addok.data.list.length
                    this.usertemplate=templateold
                    this.getcurrentpage()
                }else{
                    ElMessage.error(`用户添加失败`)
                }
            }else{
                ElMessage.error(isnew.data.error)
            }
        },
        //修改已有用户的信息
        async changeUser(name){
            let changeok=this.userList.some(item=>{
                return item.username===this.usertemplate.username && item.password===this.usertemplate.password && item.role===this.usertemplate.role
            })
            if(changeok){
                ElMessage.error('数据未发生更改,无需编辑')
            }else{
                let editok=await axios.post('/userList/edit',{oldname:name,newuser:this.usertemplate})
                if(editok.data.success){
                    ElMessage({
                        message: '用户修改成功',
                        type: 'success',
                    })
                    this.userList=editok.data.userlist
                    
                    if(this.CurrentUser.username===name){
                        this.CurrentUser=this.userList.filter((item)=>{
                            return item.username===this.usertemplate.username
                        })[0]
                    }
                    this.usertemplate=templateold
                    this.getcurrentpage()
                }
                
            }
        },
        //删除指定用户
        async deleteUser(){
            let deleteok=await axios.get(`/userList/delete/${this.usertemplate.username}`)
            if(deleteok.data.success){
                ElMessage({
                    message: '用户删除成功',
                    type: 'success',
                  })
                this.userList=deleteok.data.userlist
                this.usertemplate=templateold
                this.total=deleteok.data.userlist.length
                this.getcurrentpage()
            }else{
                ElMessage.error(deleteok.data.error)
            }
        },
        //当前页改变时触发的事件
        CurrentChange(value){
            this.getcurrentpage()
        },
        //每页条数改变时触发的事件
        SizeChange(value){
            this.getcurrentpage()
        }
    }
})
