<template>
    <router-view/>
</template>
<script setup>
    import { provide,ref,watch} from "vue"
    import language from './language/index.js'
    import { ElLoading } from 'element-plus'
    let languages=ref(language)
    let internationalization
    if(sessionStorage.getItem('language')){
      internationalization=ref(JSON.parse(sessionStorage.getItem('language')))
    }else{
      internationalization=ref(languages.value.messages[languages.value.locale])
    }
    provide('language',internationalization)
    provide('changelanguage',changelanguage)
    sessionStorage.setItem('language', JSON.stringify(internationalization.value));
    function changelanguage(m){
      languages.value.locale=m
      internationalization.value=languages.value.messages[m]
      sessionStorage.removeItem('language');
      sessionStorage.setItem('language', JSON.stringify(internationalization.value));
    }
    watch(internationalization,async (newQuestion, oldQuestion) => {
      const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(255, 255, 255, 0.9)',
      })
      setTimeout(() => {
          location.reload()
      }, 500)
    })
</script>
