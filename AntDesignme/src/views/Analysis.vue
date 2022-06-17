<template>
    <div class="analysis-container">
        <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">
                        这
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    是
                    <div class="analysis-card-body"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">首</div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" class="analysis-card">
                <el-card class="box-card"  :body-style="{padding: '20px 24px 8px'}">
                    <div class="analysis-card-body">页</div>
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
</style>
