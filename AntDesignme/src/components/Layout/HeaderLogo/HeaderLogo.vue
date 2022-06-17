<template>
    <div  class="header-menu-logo">

        <div  class="header-menu-logo-img">

            <a >
                <img  :src="logoimage"  :alt="content">
                <h1  v-if="headermenu" >{{content}}</h1>
            </a>

        </div>

        <div  class="step-top"  v-if="!headermenu">
             <slot></slot>
        </div>
        
    </div>
</template>
<script setup>
    import{ defineProps , toRef }from "vue"
    const props = defineProps({"headermenu":Boolean,'logoimage':String,'content':String})
    const headermenu = toRef(props, "headermenu")
    const logoimage = toRef(props,'logoimage')
    const content = toRef(props,'content')
</script>
<style scoped>
    @import url('./HeaderLogo.css');
</style>