import {List,Avatar,Stamp,Star,HomeFilled,Aim,Edit,Monitor,Suitcase,Menu} from '@element-plus/icons-vue'
import { shallowRef } from 'vue'
let nowjurisdiction=localStorage.getItem('jurisdiction')
// console.log(nowjurisdiction);
function ishidden(arr){
  let ok=true
  for (const key in arr) {
    if(nowjurisdiction.includes(arr[key])){
        ok=false
    }
  }
  return ok
}
let routers=[
    {
        path: 'homepage',
        id:'1', 
        name: 'homepage',
        allpath:'/homepage',
        icon:shallowRef(HomeFilled),
        meta:{title:"HomePage",verification:true},
        component: () => import('../views/Analysis.vue'),
      },
      {
        path: 'management',
        id:'2',
        name: 'management',
        allpath:'/management',
        icon:shallowRef(Monitor),
        redirect:"/management/user",
        meta:{title:"Management",verification:true,hidden:ishidden(['UserV','RoleV','MenuV']),},
        component: () => import('../views/kong.vue'),
       
        children:[
          {
            path:'user',
            id:'2-1',
            allpath:'/management/user',
            name:'user',
            icon:shallowRef(Avatar),
            meta:{title:"UserManage",verification:true,hidden:ishidden(['UserV']),},
            component:() => import('../views/UserManagement/UserManagement.vue'),
            
          },
          {
            path:'role',
            id:'2-2',
            allpath:'/management/role',
            name:'role',
            icon:shallowRef(Stamp),
            meta:{title:"RoleManage",verification:true,hidden:ishidden(['RoleV'])},
            component:() => import('../views/RoleManagement/RoleManagement.vue'),
            
          },
          {
            path:'menumanagement',
            id:'2-3',
            allpath:'/management/menumanagement',
            name:'menumanagement',
            icon:shallowRef(Menu),
            meta:{title:"menumanagement",verification:true,hidden:ishidden(['MenuV'])},
            component:() => import('../views/MenuManage/MenuManage.vue'),
            
          },
        ]
      },
      {
        path: 'systemtools',
        id:'3',
        name: 'systemtools',
        allpath:'/systemtools',
        icon:shallowRef(Suitcase),
        redirect:"/systemtools/editor",
        meta:{title:"Systemtools",verification:true},
        component: () => import('../views/kong.vue'),
        children:[
          {
            path: 'editor',
            allpath:'/systemtools/editor',
            id:'3-1',
            name:'editor',
            icon:shallowRef(Edit),
            meta:{title:"editor",verification:true},
            component:() => import('../views/RichTextEditor/RichTextEditor.vue'),
          },
        ]
      },
      {
        path: 'list',
        id:'4',
        name: 'list',
        icon:shallowRef(List),
        allpath:'/list',
        meta:{title:"QueryList",verification:true},
        component: () => import('../views/TableList/TableList.vue'),
      },
      {
        path: 'account',
        id:'5',
        allpath:'/account',
        name:'account',
        icon:shallowRef(Star),
        meta:{title:"PersonalCenter",verification:true},
        component:() => import('../views/PersonalCenter/PersonalCenter.vue'),
      },
      {
        path: 'guide',
        id:'6',
        allpath:'/guide',
        name:'guide',
        icon:shallowRef(Aim),
        meta:{title:"guide",verification:true},
        component:() => import('../views/Guide.vue'),
      },

]
export {routers}