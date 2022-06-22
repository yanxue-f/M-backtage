<template>
        <el-menu-item  :index="routerpath"  :router='router'  v-if='!Rchildren && routerhidden!==true'>

            <el-icon  v-if="icontitle">
                <component  :is="icontitle"></component>
            </el-icon>

            <span>{{language.router[texttitle]}}</span>

        </el-menu-item>

        <el-sub-menu  :index="routerpath" v-else-if='Rchildren && routerhidden!==true'>

            <template #title>
                <el-icon  v-if="icontitle">
                    <component  :is="icontitle"></component>
                </el-icon>
                <span>{{language.router[texttitle]}}</span>
            </template>

            <template  v-for="unit in Rchildren" >

                <list-unit  :router='unit'  :key="unit.id"  v-if="unit.children && unit.meta.hidden!==true"></list-unit>

                <el-menu-item  :key="unit.id"  v-if="!unit.children && unit.meta.hidden!==true"  :index="unit.allpath">
                    <el-icon  v-if="unit.icon">
                        <component  :is="unit.icon"></component>
                    </el-icon>
                    <span>{{language.router[unit.meta.title]}}</span>
                </el-menu-item>
                
            </template>

        </el-sub-menu>
</template>
<script setup>
    import { shallowRef , inject } from "vue"
    let language = inject('language')
    const props = defineProps({router:Object})
    let { router } = props
    let texttitle = router.meta.title
    let icontitle = router.icon
    let Rchildren = router.children
    let routerpath = router.allpath
    let routerhidden= router.meta.hidden
</script>
<style scoped>
    @import url('./ListUnit.css');
</style>