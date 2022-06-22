<template>
    <div class="guide-container">
        <div class="guide">
            当前选择富文本编辑器为wangeditor,封装于@/components/MEditor中,若不能满足使用要求可选择其他富文本编辑器插件
        </div>
        <div class="guide">
            <div>{{asd}}</div>
        </div>
        <div class="guide">
            <m-editor v-model:valueHtml='asd'></m-editor>
        </div>
    </div>
    
</template>

<script setup>
import { inject,ref} from "vue";
// 国际化
let language=inject('language')
/**获取当前用户名和权限 */
let currentusername=localStorage.getItem('user')
let asd= ref('')
</script>

<style  scoped>
    @import url('./RichTextEditor'); 
</style>