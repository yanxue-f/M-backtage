import { defineStore } from 'pinia'
import axios from "@/ToolPackage/axiosp";
import { JSEncrypt } from "jsencrypt"
import router from '@/router';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
let Reset;
//创建pinia状态管理器
export const tablelist = defineStore('querytable', {
    state: () => {
        return {
            //列表内信息的总条数
            totals:0,
            //当前页
            current:1,
            //列表每页展示的信息条数
            pagesize:20,
            //当前页信息
            currentList:[],
            //查询规则
            Querybasis:{
                //规则名称
                rule:null,
                //描述 
                describe:null,
                // 服务调用次数 
                calls:null,
                // 状态 
                state:null,
                // 上次调度时间
                time:null,
            },
            //信息列表展示的数据列
            colsetup:{
                rulename:true,
                describe:true,
                servicecalls:true,
                state:true,
                Updatetime:true,
                operation:true
            },
            //分页组件显示的元素
            paginationitem:'total, sizes, prev, pager, next, jumper',
            //新建规则
            Newrule:{
                rulename:null,
                describe:null,
            },
            //配置规则
            allocation:{},
            monitor:{
                Monitorobj:1,
                Ruletemplate:1,
                Ruletype:1,
                Monitortime:1,
              }
        }
    },
    getters:{
    },
    actions:{
        async updateList(){
            let initial={
                current:this.current,
                pagesize:this.pagesize
            }
            //第二中vite中配置代理时开发环境中需要的前缀由配置的server.proxy   /api/initial
            let currentinfo=await axios.post(`/initial`,initial)
            if(currentinfo.data.success){
                this.totals=currentinfo.data.total
                this.currentList=currentinfo.data.alllist
                this.allocation=currentinfo.data.onlyrule
                Reset=currentinfo.data.onlyrule
            }
            
        },
        async changesize(){
            let initial={
                current:this.current,
                pagesize:this.pagesize
            }
            //第二中vite中配置代理时开发环境中需要的前缀由配置的server.proxy   /api/initial
            let currentinfo=await axios.post(`/changesize`,initial)
            if(currentinfo.data.success){
                this.totals=currentinfo.data.total
                this.currentList=currentinfo.data.alllist
            }   
           
        },
        async changepage(){
            let initial={
                current:this.current,
                pagesize:this.pagesize
            }
            //第二中vite中配置代理时开发环境中需要的前缀由配置的server.proxy   /api/initial
            let currentinfo=await axios.post(`/changesize`,initial)
            if(currentinfo.data.success){
                this.totals=currentinfo.data.total
                this.currentList=currentinfo.data.alllist
            } 
        },
        async establishrule(name){
            let pushok=await axios.post('/tablelist/add',{currentpage:this.current,currentsize:this.pagesize,username:name,newrole:this.Newrule})
            if(pushok.data.success){
                this.totals=pushok.data.total
                this.currentList=pushok.data.current
                for (const key in this.Newrule) {
                    this.Newrule[key]=null
                }
                ElMessage({
                    message: '规则添加',
                    type: 'success',
                })
            }else{
                ElMessage.error(pushok.data.error)
            }
        },
        resetallocation(){
            this.allocation=Reset
        },
        async allocationrole(oldname){
            
        }
    }
})