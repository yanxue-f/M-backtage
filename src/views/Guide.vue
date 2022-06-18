<template>
    <div class="guide-container">
        <div class="guide">
            <el-button type="info" @click="startguide()">开启引导页</el-button>
        </div>
        <div class="guide">
            当前引导页插件基于intro.js封装,配置项为@/components/intro/newintro.js可在其中调整引导页配置,引导步骤于@/components/intro/steps.js调整。
            于根部组件@/components/Layout/Layout.vue中调用也css也在其调用。
        </div>
    </div> 
</template>

<script setup>
import { inject } from "vue";
// 国际化
let language = inject('language')
/**获取当前用户名和权限 */
let userpower = JSON.parse(localStorage.getItem('jurisdiction'))
let currentusername = localStorage.getItem('user')
let startguide = inject('guide')
</script>

<style  scoped>
    .guide-container{
        display: flex;
        flex-direction:column;
        gap: 24px;
       
    }
    .guide{
        width: 100%;
        padding: 24px;
        background-color: #fff;
        border-radius: 2px;
    }
    
</style>