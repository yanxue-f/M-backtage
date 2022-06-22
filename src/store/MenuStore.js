import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import { shallowRef,defineAsyncComponent} from 'vue'
import axios from "@/ToolPackage/axiosp";
import router from '@/router';
export const routersMenus=defineStore('routersMenu',{
    state:()=>{
        return{
            
        }
    },
    getters:{
        
    },
    actions:{
        
    }
})