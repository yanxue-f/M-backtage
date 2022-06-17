<template>
    <div>
        <div  class="OpenGlobalstyle"  @click="drawer = true">
            <component  :is="Setting"></component>
        </div>
        <!-- 页面样式 -->
        <el-drawer  v-model="drawer"  title="I am the title"  :with-header="false"  :close-delay="100"  :size="280"  custom-class='style-drawer'>
            <div  class="drawer-main">
                <el-scrollbar  noresize  height="100%"  always>
                    <div  class="style-manu">
                        <div  class="style-manu-item">
                            <h3>{{language.styleset.allstyleset}}</h3>
                            <div  class="overall">
                                <div  class="overall-item overall-Lright"  @click="Lright">
                                    <component  :is="Check"  v-if="overall==='Lright'"></component>
                                </div>
                                <div  class="overall-item overall-Bright"  @click="Bright">
                                    <component  :is="Check"  v-if="overall==='Bright'"></component>
                                </div>
                            </div>
                        </div>
                        <div  class="style-manu-item">
                            <h3>{{language.styleset.stylecolor}}</h3>
                            <div  class="theme-color">
                                <el-tooltip  :content="language.styleset[themecolor.title]"  placement="top"  :show-after="100"  :auto-close="10"  v-for="themecolor in themecolorarr"  :key="themecolor.type">
                                    <div  class="theme-color-item"  :style='{"background-color":themecolor.color}'  :data-value="themecolor.type"  @click="ChangeColor(themecolor.type)">
                                        <component  :is="Check"  v-if="themecolors===themecolor.type"></component>
                                    </div>
                                </el-tooltip>
                            </div>
                        </div>
                        <el-divider />
                        <div class="style-manu-item">
                            <h3>{{language.styleset.navigationstyle}}</h3>
                            <div  class="navigationall">
                                <div  class="navigationall-item navigationall-left"  @click="navigation='left',flowWidth=true,Splitmenu=false">
                                    <component  :is="Check"  v-if="navigation==='left'"></component>
                                </div>
                                <div class="navigationall-item navigationall-top" @click="navigation='top',Splitmenu=false">
                                    <component  :is="Check"  v-if="navigation==='top'"></component>
                                </div>
                                <div class="navigationall-item navigationall-default"  @click="navigation='default',Splitmenu=false">
                                    <component  :is="Check"  v-if="navigation==='default'"></component>
                                </div>
                            </div>
                        </div>
                        <div  class="style-manu-item">
                            <div  class="hsList">
                                <ul  class="hsList-items">
                                    <li  class="hsList-item">
                                        <div  class="hsList-item-title"  :class="{'is-disabled':!navigationAll[navigation].flowWidth}">
                                            {{language.styleset.contentw}}
                                        </div>
                                        <div  class="hsList-item-btn">
                                            <div  class="hsList-item-select">
                                                <el-select  v-model="flowWidth"  class="m-2"  placeholder="Select"  size="small">
                                                    <el-option  v-for="item in navigationAll[navigation].flowWidth"  :disabled="!navigationAll[navigation].flowWidth"  :key="item.value"  :label="language.styleset[item.label]"  :value="item.value"/>
                                                </el-select>
                                            </div>
                                        </div>
                                    </li>
                                    <li  class="hsList-item">
                                        <div  class="hsList-item-title"  :class="{'is-disabled':!navigationAll[navigation].fixedHeader}">
                                            {{language.styleset.headerS}}
                                        </div>
                                        <div  class="hsList-item-btn">
                                            <el-switch  v-model="fixedHeader"  :disabled="!navigationAll[navigation].fixedHeader"  class="ml-2"  active-color="var(--m-text-color)" />
                                        </div>
                                    </li>
                                    <li class="hsList-item">
                                        <div  class="hsList-item-title"  :class="{'is-disabled':!navigationAll[navigation].fixedAside}">
                                            {{language.styleset.asideS}}
                                        </div>
                                        <div  class="hsList-item-btn">
                                            <el-switch  v-model="fixedAside"  :disabled="!navigationAll[navigation].fixedAside"  class="ml-2"  active-color="var(--m-text-color)" />
                                        </div>
                                    </li>
                                    <li  class="hsList-item">
                                        <div  class="hsList-item-title"  :class="{'is-disabled':!navigationAll[navigation].Splitmenu}">
                                            {{language.styleset.splitmenu}}
                                        </div>
                                        <div  class="hsList-item-btn">
                                            <el-switch  v-model="Splitmenu"  :disabled="!navigationAll[navigation].Splitmenu"  class="ml-2"  active-color="var(--m-text-color)" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <el-divider />
                    </div>
                    <div>
                        <div class="style-tips">
                            配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件
                        </div>
                        <el-button @click="Saveconfiguration">保存配置</el-button>
                    </div>
                </el-scrollbar>
            </div>
        </el-drawer>
        <el-dialog v-model="Completesetup" title="设置拷贝完成" width='400px'>
            <div>请按照下面的列表更改'src/store/PageStyleStore.js'文件中start下对应的值,以完成风格色设置</div>
            <el-descriptions  direction="vertical" :column="3" border style="overflow:auto">
                <el-descriptions-item min-width="110px" v-for="item in Styleused" :key='item.id' :label="item.key">{{item.value}}</el-descriptions-item>
            </el-descriptions>
        
        </el-dialog>
    </div>
</template>
<script setup>
    import { Setting , CloseBold , Check } from '@element-plus/icons-vue'
    import { ref , inject } from 'vue'
    // 国际化
    let language = inject('language')
    //store关于页面样式
    import { layoutshows } from "@/store/PageStyleStore.js";
    import { storeToRefs } from 'pinia'
    let layoutshow = layoutshows()

    //样式转化框是否弹出
    const drawer = ref(false)

    /**页面整体风格
     * 当前主题色
     * 全部主题色
     * 当前导航风格
     * 内容宽度样式
     * 是否固定顶部导航
     * 是否固定侧边菜单
     * 是否分割菜单
     * 各种导航风格及其可以设置的其他属性
     */
    let { overall , themecolors , themecolorarr , navigation , flowWidth , fixedHeader , fixedAside , Splitmenu , navigationAll } = storeToRefs(layoutshow)

    //切换整体风格
    let changeoverall = layoutshow.changeoverall
    function Bright(){
        overall.value = "Bright"
        changeoverall()
    }
    function Lright(){
        overall.value = "Lright"
        changeoverall()
    }
    import { ElMessage } from 'element-plus'
    //切换主题颜色
    let ChangeColor = layoutshow.ChangeColor
    let Styleused = ref(null)
    let Completesetup = ref(false)
    //保存配置
    function Saveconfiguration(){
        Styleused.value=[
            {key:'overall',value:`"${overall.value}"`},
            {key:'themecolors',value:`"${themecolors.value}"`},
            {key:'navigation',value:`"${navigation.value}"`},
            {key:'flowWidth',value:flowWidth.value},
            {key:'fixedHeader',value:fixedHeader.value},
            {key:'fixedAside',value:fixedAside.value},
            {key:'Splitmenu',value:Splitmenu.value},
        ]
        drawer.value=false
        Completesetup.value=true
    }
</script>

<script>
export default {
    name:"edit-style"
}
</script>

<style scoped>
    @import url('./EditStyle.css');
</style>
