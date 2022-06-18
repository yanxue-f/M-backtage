<template>
  <div width="auto" class="aside">

    <slot name="asidelogo"></slot>

    <!-- 菜单 -->
    <div class="aside-main-container">

        <el-scrollbar  noresize>
          <div :class="{'container':!iscollapse}">
              <el-menu :collapse="iscollapse"  :default-active="nowrouter" router unique-opened>
                <template v-for="router in routers">
                  <list-unit   :router='router'  :key="router.id" v-if="!(navigation==='default' && Splitmenu && !nowrouter.includes(router.path) && hiddenmenu)"></list-unit>
                </template>
              </el-menu>
          </div>
        </el-scrollbar>

        <!-- 展开和关闭按钮 -->
        <slot name="changecoll"></slot>

    </div>
  </div>
</template>

<script setup>
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
   * 当前左侧aside是否存在
   */
  let { routers , nowrouter , iscollapse , hiddenmenu } = storeToRefs(nowinfo)
  //页面风格
  //store关于页面样式
  import { layoutshows } from "@/store/PageStyleStore.js";
  let layoutshow = layoutshows()
  /*  整体风格
    * 内容宽度样式
    * 是否固定顶部导航
    * 是否固定侧边菜单
    * 是否分割菜单
    * 当前导航风格
    */
  let {overall, flowWidth , fixedHeader , fixedAside , Splitmenu , navigation} = storeToRefs(layoutshow)
</script>

<style>
 @import url('./MAside.css');
</style>