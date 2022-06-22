
# Vue-admin-frame

基于vite框架，vue，vue-router，element-ui，pinia等创建的基础的后台管理框架

## 平台简介

* 前端:vue3 , element-ui , vite , vue -router , pinia；
* 前后端交互：axios；
* 数据模拟：mock ， express；
* 其他：
    - 文件上传：multer；
    - 读取文件下的内容：glob；
    - 页面加载是顶部的加载进度条：nprogress；
    - 解析中间件：body.Parse(于server.js文件下应用)；
    - 更多查看package.json文件...


## 自定义配置

查看 [Vite Configuration Reference](https://vitejs.dev/config/).

## 项目设置

```sh
npm install
```

### 开发环境编译和热重新加载以进行开发

```sh
npm run dev：mock
```
在开发模式下,将 vite 的 connect 实例作中间件使用，配合express于mock进行数据模拟。(于server.js 与 mock/app.js文件下进行封装,模拟的mock数据均保存于mock文件夹下。)

### 生产环境

```sh
npm run build
```

## 文件结构

```sh
- .vscode
  - extensions.json
  - settings.json
- mock                              (除挨app.js外,均为mock数据,模拟接口)
  - app.js                          (配合server.js建立mock数据模拟)
  - list.js                         ('export default (app,Mock,upload)=>{}')
  - lsignMock.js
- public
  - favicon.ico
- src
  - assets
    - base.css
    - logo.svg
  - components
    - cropper                        (图片裁剪封装)
    - icon
    - intro                          (引导页封装)
        -newintro.js                 (引导页配置)
        -steps.js                    (引导页步骤)
    - Layout                         (页面布局)
        - EditStyle                  (页面风格设置)
        - GlobalHead                 (顶部导航)
        - HeaderLogo                 (logo与logo-text)
        - LayoutPage                 (布局展示)
        - ListUnit                   (emelemt的菜单item封装)
        - MAside                     (导航栏)
        - showpage                   (各种布局风格)
            -defaultPage             (默认风格)
            -leftPage                (左侧菜单风格)
            -topPage                 (顶部菜单风格)
    -MEditor                         (富文本编辑器封装 wangeditor)
  - language                         (国际化)
    -index.js
    -Zh-cn.js
    -en.js
  - router                           (路由)
    - index.js                       (路由引用与设置)
    - routers.js                     (导航栏中的路由设置)
  - sraric
  - stroe                            (pinia)
    - AllLayoutStors.js              (页面整体store)
    - LogInStore.js                  (登录store)
    - PageStyleStore.js              (页面风格store)
    - PersonalCenterStore.js         (个人中心store)
    - RoleStore.js                   (角色管理store)
    - TablelistStore.js              (查询表格store)
    - UserStore.js                   (用户管理store)
  - ToolPackage
    - axiosp.js                      (axios封装)
    - equipment.js                   (判断视口大小范围，js媒体查询)
  - views                            (视图)
    - Login
    - PersonalCenter                 (个人中心)
    - RichTextEditor                 (富文本编辑器)
    - RoleManagement                 (角色管理)
    - TableList                      (查询表格)
    - UserManagement                 (用户管理)
    - Analysis.vue                   (主页)
    - Guide.vue                      (引导页)
    - kong.vue                        
    - Lockscreen.vue                 (锁屏)
- App.vue                            (引入国际化文件，根部vue)
- main.vue                           (引入插件生成vue实例，挂在到index.html下)
- .env.development.local             (开发环境下的接口前缀ZMKT_HTTP_URL="")
- .env.production.local              (生产环境下的接口前缀ZMKT_HTTP_URL="")
- .eslintrc.cjs
- .gitgnore
- babel.config.js
- index.html
- package-lock.json
- package.json
- server.js                          (以中间件模式创建 Vite 服务器mock数据)
- vite.config.js
- README.md
```
## 后端接口拦截  
  
采用[expross](https://www.expressjs.com.cn/)开启服务器接口,以中间件模式创建 [vite](https://cn.vitejs.dev/guide/ssr.html) 服务器 ,将 [vite](https://cn.vitejs.dev/guide/ssr.html) 的 connect 实例作中间件使用.

* 使用multer插件用于上传文件.
* 使用body-parser插件,将post到后端的文件挂载到body下.
* 使用glob插件，独居mock文件获取除app.js外的所用文件(mock数据与后端模拟接口).
* mock 下的app.js用于监控开发时文件的变化实时更新.

具体代码可查看server.js文件、mock下app.js文件对文件变换的监控与实时更新、mock下其他问价均会输出一个以app,Mock,upload为参数的函数于server.js中引用被执行，app为开启的后端服务器，mock为mock.js插件中引入的Mock用于模拟数据，upload为multer插件的配置使用用于限制文件上传的种类或限制等。

## 后端数据模型与模板

于mock文件夹下的文件下获取:
  - userList : 用户名、密码、角色等级列表;
  - userinfos : 用户的基本信息集合；
  - mockinfo ：mock的用户信息；
  - RoleJurisdiction ：各种角色对应的权限；
  - RoleJurisdictiontem ：角色权限的树状控件(element-ui)所用的信息；
  - rolename ：角色的权限等级于角色名组成的数组集合；
  - usertemplate ：用户信息模板；

## 路由  

路由是整套系统中最重要的存在，和系统左侧导航、页面标题、顶部菜单导航甚至页面缓存都存在一定的关系。

### 路由配置文件结构

```
  - src
    - router
     - index.js
     - router.js
```

### index.js

按照[Vue-router](https://router.vuejs.org/zh/index.html)文档进行配置。

路由对象：
  - routes[0]为整题布局用来配置菜，菜单点击后跳转到的路由保存在其children属性下配置于 router.js 文件下。
  - routes[1]为登录路由。
  - routes[2]为锁屏路由。
```
let routes=[
    {
      path: '/',
      name: 'root',
      meta:{title:"homedirectory"},
      redirect:"/homepage",
      component:() => import('../components/Layout/LayoutPage/LayoutPage.vue'),
      children:routers
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('../views/LogIn/LogIn.vue'),
      meta:{title:"Login",view:false},
      hidden:true
    },
    {
      path:'/lockscreen',
      name:'lockscreen',
      component:() => import('../views/Lockscreen.vue'),
      meta:{title:"lockscreen",verification:true, view:false},
      hidden:true
    },
]
```
其他具体路由配置可查看[Vue-router](https://router.vuejs.org/zh/index.html)文档进行配置。

### router.js

菜单路由配置于其中。

```
{
    path: 'management',
    id:'2',
    name: 'management',
    allpath:'/management',
    icon:shallowRef(Monitor),
    redirect:"/management/user",
    meta:{title:"Management",verification:true},
    component: () => import('../views/kong.vue'),
    children:[
        {
            path:'user',
            id:'2-1',
            allpath:'/management/user',
            name:'user',
            icon:shallowRef(Avatar),
            meta:{title:"UserManage",verification:true,hidden:true},
            component:() => import('../views/UserManagement/UserManagement.vue'),
        }]
}
```
#### 菜单路由对象
| key* | 说明 | 
| :-----| :----- |
| path | 路由在游览器地址栏里的hash值，也就是说这个路由要用什么URL地址来访问 。| 
| name | 路由的标识，必填且与页面组件的name一致。 |
| component | 加载的页面组件位置.均匀保存于 src/view 下。 |
| id | 路由的唯一标识用于保证生成菜单项的准确性 |
| redirect | 重定向地址。 |
| children | 子集路由。 |
| meta | 元数据，见下方。 |

| key* | 说明 | 
| :-----| :----- |
| title | 显示名称。展示在菜单，标签和面包屑等中。仅为国际化时的属性名，具体名称保存在 src/language 问价下的各种语言类压缩文件夹对象的router对象的同名title下。|
| verification | 判断进入当前页是否需要登录生成的token。|
| hidden |判断是否可以显示进入当前路由。根据router.js下的 ishidden 函数判定.(为true时隐藏)|


## 组件  

均保存于src/components下：
 * copper ：编辑图片组件；
 * icons ：vue 自带的图片组件；
 * intro ：intro.js引导页组件的配置：
    - newintro.js：封装的[intro.js](https://www.npmjs.com/package/intro.js)组件；
    - steps.js:导出的steps数组为引导步骤；
 * Layout : 布局相关的组件：
    - editStyle ：页面风格组件(于/src/stroe/PageStyleStroe.js下配置)；
    - GlobalHead ：页面顶部组件(:root下--m-header-height 变量配置顶部高度);
    - HeaderLogo ：logo与logocontent组件;(于/src/stroe/AllLayoutStore.js下的logo与logotitle配置)；
    - LayoutPage : 选择布局风格的组件；
    - ListUnit ：菜单导航的item组件封装；
    - MAside：左侧导航菜单租件。(于/src/stroe/AllLayoutStore.js下配置,:root下--m-aside-item调整菜单item高度)；
    - showpage : 各种布局风格样式的组件
      - defaultPage : 默认样式下的风格组件；
      - leftPage ：左侧高长导航演示组件；
      - topPage ：顶部导航样式。
 * MEditor ：富文本编辑器组件基于[wangeditor](https://www.wangeditor.com/)

## 国际化

保存于src/language下：
 * index.js : 编辑的全部语种的集合，引入src/App.vue下配置国际化；
 * Zh-cn.js : 中文;
 * en.js : 英语。

## 静态文件
 保存于/src/static/下

## store状态管理

所有视图组件需要用的状态管理（pinia）：
 * AllLayoutStore.js：页面布局状态控制；
 * LoginStore.js ： 登录状态管理；
 * MenuStore.js : 菜单管理状态管理(开发中)；
 * PageStyleStore : 页面风格控制状态管理；
 * PersonalCenterStore.js ：个人中心状态管理；
 * RoleStore：角色管理状态控制；
 * TableListStore ：查询表格状态控制；
 * UserStore : 用户管理状态控制。

## 工具函数管理

保存于/src/ToolPackage/下：
 * axiosp.js ：axios封装；
 * equipment.js ：判断当前页面视口状态的组合函数，可自行添加需要的视口宽度，返回一个ref数据

## 视图

保存于/src/views/下：
 * Login ：登录视图；
 * MenuMange ：菜单管理视图(开发中)；
 * PersonalCenter ： 个人中心视图；
 * RichTextEditor ： 富文本编辑器视图 ；
 * RoleManagement ： 角色管理视图；
 * TableList ：查询表格视图；
 * UserManagement ： 用户管理视图；
 * Analysis.vue : 主页视图 ；
 * Guide.vue : 引导页视图 ；
 * kong.vue ：空状态视图，路由过渡；
 * Lockscreen.vue : 锁屏视图

## 不同环境下请求前缀 

* .env.development.local : 生产环境下的请求前缀
* .env.production.local  ：开发环境下请求前缀

使用import.meta.env.ZMKT_HTTP_URL获取，在axios封装时使用。  
'ZMKT_'于vite.config.js下配置 defineConfig 下的 envPrefix 属性修改

## 锁屏

可通过调整 /src/store/AllLayoutStore.js状态管理的state中的LockScreen属性，调整自动锁屏的时间。（默认30min）  
也可通过点击顶部锁屏按钮手动锁屏。  
退出锁屏需要输入当前用户的密码。

## 效果预览

<table>
    <tr>
        <td><img src="./src/static/login.png"/></td>
        <td><img src="./src/static/lockscreen.png"/></td>
    </tr>
    <tr>
        <td><img src="./src/static/defaulepage.png"/></td>
        <td><img src="./src/static/iscollapse.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/leftPage.png"/></td>
        <td><img src="./src/static/topPage.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/User.png"/></td>
        <td><img src="./src/static/UserAdd.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/UserEdit.png"/></td>
        <td><img src="./src/static/UserDelete.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/Role.png"/></td>
        <td><img src="./src/static/RoleAdd.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/Roleedit.png"/></td>
        <td><img src="./src/static/RoleDelete.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/TableList.png"/></td>
        <td><img src="./src/static/RichText.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/Guide.png"/></td>
        <td><img src="./src/static/changeimage.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/PersonalCenter.png"/></td>
        <td><img src="./src/static/ChangePass.png"></td>
    </tr>
    <tr>
        <td><img src="./src/static/EditStyle.png"/></td>
        <td><img src="./src/static/SmallShow.png"></td>
    </tr>
</table>













