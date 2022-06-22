<template>
    <div ref='roots'>
      <component :is='NowLayoutPage'></component>
      <!-- 仅再生产环境下调用的组件用来调整页面风格，风格存储余@/store/PageStyleStore.js -->
      <component :is='environment'></component>
    </div>
</template>
<script setup>
  import { ref , provide , onUpdated , watch, onBeforeMount , onMounted ,  defineAsyncComponent , shallowRef} from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  //获取当前环境变量(生产，开发)
  //import.meta.env.DEV=true 开发环境
  let environment=shallowRef(null)
  onBeforeMount(()=>{
    if(import.meta.env.DEV){
      environment.value=defineAsyncComponent(() =>import(`../EditStyle/EditStyle.vue`))
    }
    //设置主题色
    layoutshow.ChangeColor(themecolors.value)
    //页面风格设置
    layoutshow.changeoverall()
  })

  //页面hash变化是loading
  let loading = ref(false)
  onUpdated(()=>{
    loading.value = false
  })
  //引导页
  let roots=ref(null)
  import  intro  from "@/components/intro/newintro.js";
  import  steps  from "@/components/intro/steps.js";
  function OpenGuide(){
    let stepnow = steps.filter(item=>{
      return roots.value.querySelector(item.element) !== null;
    })
    intro.setOptions({steps:stepnow})
    intro.start()
  }
  provide('guide',OpenGuide)

  //全局stroe
  import { allpageinfo } from "@/store/AllLayoutStore";
  import { storeToRefs } from 'pinia'
  let nowinfo = allpageinfo()
  /**
   * 当前页的router
   * 当前aside是否折叠
   * 当前页的面包屑
   * 当前左侧aside是否存在
   * 左侧隐藏菜单
   * 锁屏时间
   */
  let { nowrouter , iscollapse , nowcrumbsarr , hiddenmenu , showmenu ,LockScreen} = storeToRefs(nowinfo)
  //初始化
  let initial = nowinfo.initial
  //设备名称 js媒体查询
  import { useResize } from '@/ToolPackage/equipment.js'
  let equipment = useResize().device
  //生成面包屑判断当前页面宽度下菜单栏的状态
  onMounted(()=>{
      initial(useRoute())
  })

  watch(useRoute(),( newQuestion, oldQuestion) => {
      loading.value = true
      nowrouter.value = newQuestion.path
      initial(newQuestion)
  })

  let arrrouters =useRouter()
  watch(equipment,(newvalue,oldvalue)=>{
      showmenu.value = false
      if(newvalue === 'desktop'){
          hiddenmenu.value = true
          iscollapse.value = false
      }else if(newvalue === 'tablet'){
          hiddenmenu.value = true
          iscollapse.value = true
      }else if(newvalue === 'mobile'){
          hiddenmenu.value = false
          iscollapse.value = false
      }
  },{ immediate:true })
  //store关于页面样式
  import { layoutshows } from "@/store/PageStyleStore.js";
  let layoutshow = layoutshows()
  /*
   * 当前导航风格
   */
  let { navigation , themecolors } = storeToRefs(layoutshow)
  /*当前风格布局组件 */
  let NowLayoutPage = shallowRef(null);
  watch(navigation,(newvalue,oldvalue)=>{
    NowLayoutPage.value = defineAsyncComponent(() =>
    import(`../showpage/${newvalue}Page/${newvalue}Page.vue`)
  )
  },{ immediate:true })

 
  //监控用户头像发生变化
  let headportrait = ref(false)
  provide('headportrait',headportrait)

  import router from '@/router';
  //当前页面的path方便结束锁屏后进入
  let nowpath = new useRoute().path
  //一段时间内不进行操作自动跳转到锁屏
  let timer;
  function startTimer() {
      timer = setTimeout(function () {
        sessionStorage.setItem('nowpath',nowpath)
        router.push({
                path:'/lockscreen'
            })
      }, LockScreen.value)//这里测试就只10s，没有任何操作就跳转到login.html，你要2分钟就是2*60*1000
  }
  document.onmousedown = document.onmousemove = function () { clearTimeout(timer); startTimer(); }
</script>
<style>
  @import url('./LayoutPage.css');
</style>
