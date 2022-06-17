import { defineStore } from 'pinia';
import axios from "@/ToolPackage/axiosp";
let userinfonochange={}
export const personinfoes=defineStore('personinfo',{
    state:()=>{
        return{
            //个人信息
            userinfo:{},
            //用户名密码等
            userNPR:{},
            //用户映射名
            rolename:new Map(),
            //修改密码
            paswordchange:{
                password:null,
                newpassword:null,
                confirmpassword:null,
            },
            //信息修改成功
            changeinfook:null,
            //密码修改成功
            changepassok:null,
        }
    },
    getters:{
        changeornot:(state)=>{
            for (const key in state.userinfo) {
                if (state.userinfo[key]!==userinfonochange[key]) {
                    return false  
                }
            }
            return true
        },
        changepasswordok:(state)=>{
            for (const key in state.paswordchange) {
                if (!state.paswordchange[key]) {
                    return false  
                }
            }
            return true
        }
    },
    actions:{
        async initialization(name){
            let nowuserinfo=await axios.get(`/personal/${name}`)
            if(nowuserinfo.data.success){
                this.userinfo=nowuserinfo.data.userinfo,
                this.userNPR=nowuserinfo.data.userPNRs,
                this.rolename=new Map(nowuserinfo.data.rolenames)
                for (const key in nowuserinfo.data.userinfo) {
                    userinfonochange[key]=nowuserinfo.data.userinfo[key]
                }
            }
        },
        Resetuserinfo(){
            for (const key in userinfonochange) {
                this.userinfo[key]=userinfonochange[key]
            }
        },
        
        /*改变信息 */
        async changeinfo(username){
            let postobj={
                name:username,
                info:this.userinfo
            }
            this.changeinfook=null
            let changeyes=await axios.post('/personal/changeinfo',postobj)
            if(changeyes.data.success){
                this.userinfo=changeyes.data.userinfo;
                for (const key in changeyes.data.userinfo) {
                    userinfonochange[key]=changeyes.data.userinfo[key]
                }
                this.changeinfook=true
                
            }else{
                this.changeinfook=false
                
            }
        },
        /*改变密码 */
        async changepassword(obj){
            this.changepassok=null
            let changepassoks=await axios.post('/personal/changepass',obj)
            if(changepassoks.data.success){
                this.userNPR=changepassoks.data.userPNRs,
                this.changepassok=true
                
            }else{
                this.changepassok=false
                
            }
        },
        
    }
})