<template>
    
  <div  class="common-layout">
    <el-scrollbar  noresize  height="100vh" >
    <el-container  class="body-container" >
        <el-aside  width="auto"  v-if="hiddenmenu"  :class="{fixedAside:fixedAside}" >
            <m-aside>
                <template #asidelogo>
                    <div  class="header-menu-logo-img"  :class="{'start':iscollapse}" >
                        <a >
                            <img  :src="logo"  :alt="logotitle">
                            <h1  v-if="!iscollapse" >{{logotitle}}</h1>
                        </a>
                    </div>
                </template>
                <template #changecoll>
                    <div  class="changecoll"  @click="changecollapse">
                      <el-icon  :class="{'step1':hiddenmenu}">
                        <Transition  name="coll">
                          <component  :is="Fold"  v-if="!iscollapse"></component>
                          <component  :is="Expand"  v-else></component>
                        </Transition>
                      </el-icon>
                  </div>
                </template>
            </m-aside>
        </el-aside>
        <el-container   class='all-body'  :class='{"fixedHeader-container":fixedHeader}' >
            <el-header  height="auto"  class="header-body"  :class="{fixedHeader:fixedHeader}" >
                <global-head  class="whilt-head">
                    <template #logo  v-if="!hiddenmenu">
                        <header-logo  :headermenu='hiddenmenu'  :logoimage='logo'  :content='logotitle'>
                            <div  class="hiddencoll"  @click="changeshowmenu">
                                <el-icon>
                                <Transition  name="coll">
                                    <component  :is="Fold"  v-if="showmenu"></component>
                                    <component  :is="Expand"  v-else></component>
                                </Transition>
                                </el-icon>
                            </div>
                        </header-logo>
                    </template>
                </global-head>
            </el-header>
            <el-container  class='all-main'> 
                <div  class="main-header">
                    <div  class="main-header-nav step6">
                        <el-breadcrumb  :separator-icon="ArrowRight">
                            <el-breadcrumb-item   v-for="router in nowcrumbsarr"  :key="router.path"  :to="{path:router.path}" >{{language.router[router.title]}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
                <el-main  class="main-container">
                    <router-view />
                </el-main>
                <el-footer  height="auto">
                    <div  class="footers-header">
                        <a  title="Ant Design Pro"  target="_blank"  href="https://pro.ant.design"  rel="noreferrer">Ant Design Pro</a>
                        <a  title="github"  target="_blank"  href="https://github.com/ant-design/ant-design-pro"  rel="noreferrer">GitHub</a>
                        <a  title="Ant design"  target="_blank"  href="https://ant.design/"  rel="noreferrer">Ant design</a>
                    </div>
                    <div  class="footers-copyright">2021 {{language.footer.practice}}</div>
                </el-footer> 
            </el-container> 
        </el-container>
    </el-container>
    </el-scrollbar>
    <el-drawer  v-model="showmenu"  :with-header="false"  :size="200"  :z-index="20"  direction='ltr'  custom-class="aside-drawer">
        <m-aside>
        </m-aside>
    </el-drawer>
  </div>
</template>

<script setup>

    import { Expand , Fold , ArrowRight } from '@element-plus/icons-vue'
    import { inject } from 'vue'
    // 国际化
    let language = inject('language')

    //侧边stroe
    import { allpageinfo } from "@/store/AllLayoutStore";
    import { storeToRefs } from 'pinia'
    let nowinfo = allpageinfo()
    /**
     * 页面导航菜单的router
     * 当前页的router
     * 当前aside是否折叠
     * 当前页的面包屑
     * 当前左侧aside是否存在
     * logo与logotitle
     * 左侧隐藏菜单
     */
    let { routers , nowrouter , iscollapse , nowcrumbsarr , hiddenmenu , logo , logotitle , showmenu} = storeToRefs(nowinfo)
    //点击折叠按钮 
    let changecollapse = nowinfo.changecollapse
    //展开左侧隐藏菜单
    let changeshowmenu = nowinfo.changeshowmenu
    //页面风格
    //store关于页面样式
    import { layoutshows } from "@/store/PageStyleStore.js";
    let layoutshow = layoutshows()
    /*
     * 内容宽度样式
     * 是否固定顶部导航
     * 是否固定侧边菜单
     */
    let { flowWidth , fixedHeader , fixedAside , Splitmenu } = storeToRefs(layoutshow)
</script>

<style scoped>
    @import url('./leftPage.css');
   
</style>