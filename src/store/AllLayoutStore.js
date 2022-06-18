import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
export const allpageinfo=defineStore('allpageinfo',{
    state:()=>{
        return{
            //页面导航菜单的router
            routers:useRouter().options.routes[0].children,
            //当前页的router
            nowrouter:useRoute().path,
            //当前页的面包屑
            nowcrumbsarr:[],
            //当前aside是否折叠
            iscollapse:false,
            //当前左侧aside是否存在
            hiddenmenu:true,
            //logo
            logo:`${location.origin}/src/assets/Logo.svg`,
            logotitle:'Vue-admin-frame',
            //左侧隐藏菜单是否展开
            showmenu:false
        }
    },
    getters:{
        
    },
    actions:{
        //点击折叠按钮
        changecollapse(){
            this.iscollapse=!this.iscollapse
        },
        //初始化
        initial(nowrouter){
            this.nowcrumbsarr=[{path:'/',title:'HomePage'}]
            let nowpathpage=nowrouter.matched
            for (const key in nowpathpage) {
                if(nowpathpage[key].path!=="/homepage"&& nowpathpage[key].redirect!=="/homepage") this.nowcrumbsarr.push({path:nowpathpage[key].path,title:nowpathpage[key].meta.title})
            }
        },
        //显示左侧隐藏菜单
        changeshowmenu(){
            this.showmenu=!this.showmenu
        },
    }
})