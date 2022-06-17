import { defineStore } from 'pinia'
import axios from "@/ToolPackage/axiosp";
import { JSEncrypt } from "jsencrypt"
import router from '@/router';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'

export const SigninStore = defineStore('Signin', {
    state: () => {
        return {
          //密码登录
          passwordForm:{
              name:null,
              password:null
          },
          //表单实例
          passlogin:null,
        }
    },
    getters:{
        isLogin:(state)=>{
            return state.passwordForm.name && state.passwordForm.password
        }
    },
    actions: {
         passwordLogin(){
            this.passlogin.validate(async(valid) => {
                if (valid) {
                     //获取表单传入的用户名和密码
                    const username=this.passwordForm.name
                    const userpassword=this.passwordForm.password
                    //携带用户名向后端发送请求判断用户名是否存在
                    const axiosPromise=await axios.get(`/Publickey/${username}`)
                    let Publickey=axiosPromise.data.Publickey
                    if(axiosPromise.data.success===false){
                        ElMessage.error(axiosPromise.data.error)
                    }else{
                        /**
                         * 使用公钥
                         * 对密码进行加密
                         * JSEncrypt组件
                         * let cryptJSE=new JSEncrypt();
                         * cryptJSE.setPublicKey(publickey);
                         * let password=cryptJSE.encrypt(userpassword);
                         * 省略
                         */
                        const fetchLogin = await axios.post(`/login`,{username,userpassword})
                        const data =fetchLogin.data;
                        if(data.success=== true){
                            localStorage.setItem('token',data.result.token)
                            localStorage.setItem('user',username)
                            localStorage.setItem('jurisdiction',JSON.stringify(data.result.jurisdiction))
                            this.passwordForm.name=null;
                            this.passwordForm.password=null
                            router.push({
                                path: router.currentRoute.value.query.redirect || "/"
                            })
                            this.passlogin.clearValidate()
                        }else{
                            ElMessage.error(data.error)
                        }
                        
                    }
                } else {
                    ElMessage.error('登录失败:用户名或密码不满足规则')
                }
            })
            
            
            /**
             * //携带用户名向后端发送请求判断用户名是否存在
            const axiosPromise =await axios.get(`http://localhost:2077/user/getPublicked/${username}/`)
            const publickey =axiosPromise.data;
            if (publickey==='无此用户') {
                errorcontent.value="当前用户名错误"
                errorshow.value=true
            }else{
                //加密密码
                let cryptJSE=new JSEncrypt();
                cryptJSE.setPublicKey(publickey);
                let password=cryptJSE.encrypt(userpassword);
                //发送请求查看密码是否正确
                const fetchLogin = await axios.post(`http://localhost:2077/user/login`,JSON.stringify({username,password}))
                const data =fetchLogin.data;
                if (data.code===200) {
                    localStorage.setItem('token',data.result.token)
                    console.log(router.currentRoute.value.query);
                    router.push({
                        path: router.currentRoute.value.query.redirect || "/"
                    })
                }else{
                    this.errorcontent=data.error
                    this.errorshow=true
                }
            }*/
        }
    }
})