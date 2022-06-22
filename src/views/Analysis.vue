<template>
    <div class="analysis-container">
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">
                        <h2>Vue-admin-frame</h2>
                        <div>
                            一直想做一款后台管理系统框架，看了很多优秀的开源项目但是发现没有合适自己的。于是利用空闲休息时间开始自己写一套后台管理系统框架。此后台管理系统基于vue3于element-ui构建的后台管理系统框架，可在此基础上按照
                            自身的需求配置自己的后台管理系统。
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">
                        <div class="technology">
                            <div>
                                <h2>前端技术</h2>
                                <div class="fb-end-technology">
                                    <span>Vue3</span>
                                    <span>Element-ui</span>
                                    <span>Pinia</span>
                                    <span>Vue-router</span>
                                    <span>vite</span>
                                    <span>...</span>
                                </div>
                            </div>
                            <div>
                                <h2>后端技术</h2>
                                <div class="fb-end-technology">
                                    <span>node</span>
                                    <span>mockjs</span>
                                    <span>...</span>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">
                        此系统前后端分离时模拟数据请求使用的Mockjs进行数据模拟与请求拦截。(详细可查看<el-link href="http://mockjs.com/" target="_blank">Mockjs</el-link>与/src/mock/下的文件)
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">
                         <el-descriptions title="作者信息" :column='2'>
                            <el-descriptions-item label="Net name">焱雪</el-descriptions-item>
                            <el-descriptions-item label="email">15735217053@163.com</el-descriptions-item>
                            <el-descriptions-item label="GitHub">https://github.com/yanxue-f/Vue-admin-frame.git</el-descriptions-item>
                            <el-descriptions-item label="Gitee">https://gitee.com/fan-aoqiang/m-backstage</el-descriptions-item>
                         </el-descriptions>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
  
</script>
<style scoped>
    .analysis-container{
        width: 100%;
    }
    .grid-content{
        background-color: aqua;
        height: 100px;
    }
    .analysis-card{
        margin-bottom: 24px;
    }
    /**卡片 */
    .box-card{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        position: relative;
        background: #fff;
        border-radius: 2px;
    }
    .technology{
        display: flex;
    }
    .technology>div{
        width: 50%;
    }
    .fb-end-technology{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>
