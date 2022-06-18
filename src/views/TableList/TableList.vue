<template>
    <section class="tableList-container">
        <div class="tableList-body">
            <div class="tableList-query" :class="{'is-close':ExpandQuery}">
                <div class="tableList-query-rule">
                    <label class="tableList-query-label">
                        <div class="tableList-query-label-content">
                            <span>{{language.querytable.rulename}}</span>
                            <el-tooltip :content="language.querytable.onlykey" placement="top">
                                <component :is="QuestionFilled"></component>
                            </el-tooltip>
                            <span>:</span>
                        </div>
                        <el-input v-model="Querybasis.rule" :placeholder="language.querytable.plasent" clearable class="m-input" />
                    </label>
                    
                </div>
                <div class="tableList-query-describe" >
                    <label class="tableList-query-label">
                        <div class="tableList-query-label-content">
                            <span>{{language.querytable.describe}} :</span>
                        </div>
                        <el-input v-model="Querybasis.describe" :placeholder="language.querytable.plasent" clearable />
                    </label>
                </div>
                <div class="tableList-query-calls" v-show="!ExpandQuery">
                    <label class="tableList-query-label">
                        <div class="tableList-query-label-content">
                            <span>{{language.querytable.calls}} :</span>
                        </div>
                        <el-input v-model="Querybasis.calls" :placeholder="language.querytable.plasent" clearable />
                    </label>
                </div>
                <div class="tableList-query-state" v-show="!ExpandQuery">
                    <label class="tableList-query-label">
                        <div class="tableList-query-label-content">
                            <span>{{language.querytable.state}}:</span>
                        </div>
                        <el-select v-model="Querybasis.state"  :placeholder="language.querytable.plasent" >
                            <el-option  :label="language.querytable.Online" value="1" />
                            <el-option  :label="language.querytable.operation" value="2" />
                            <el-option  :label="language.querytable.abnormal" value="3" />
                            <el-option  :label="language.querytable.close" value="4" />
                        </el-select>
                    </label>
                </div>
                <div class="tableList-query-time" v-show="!ExpandQuery">
                    <label class="tableList-query-label">
                        <div class="tableList-query-label-content">
                            <span>{{language.querytable.dispatchtime}} :</span>
                        </div>
                        <el-date-picker v-model="Querybasis.time" type="datetime" :placeholder="language.querytable.plasent"/>
                    </label>
                </div>
                <div class="tableList-query-btn">
                    <div class="tableList-query-btn-body">
                        <el-button >{{language.querytable.reset}}</el-button>
                        <el-button type="primary">{{language.querytable.query}}</el-button>
                        <div class="Putaway" @click="ExpandQuery=!ExpandQuery" :class="{'tobuttom':ExpandQuery===true}">
                            <span v-if="ExpandQuery">{{language.querytable.launch}}</span>
                            <span v-else>{{language.querytable.stow}}</span>
                            <component :is="ArrowUpBold"></component>
                        </div>
                    </div>
                </div>
            </div>
            <div class='tableList-show'>
                <div class="tableList-show-body">
                    <div class="tableList-show-header">
                        <div class="tableList-show-header-title">
                            {{language.querytable.querytable}}
                        </div>
                        <div class="tableList-show-header-operation">
                            <el-button type="primary" @click="opennewlybuild=true" v-if="Editpermissions">
                                {{language.querytable.new}}<el-icon class="el-icon--right"><Plus /></el-icon>
                            </el-button>
                            
                            <el-tooltip effect="dark" :content="language.querytable.refresh" placement="top" >
                                <div class="setupList">
                                    <component :is="RefreshRight"></component>
                                </div>
                            </el-tooltip>
                            <el-dropdown trigger="click">
                                <el-tooltip effect="dark" :content="language.querytable.density" placement="top" >
                                    <div class="setupList">
                                        <component :is="Sort"></component>
                                    </div>
                                </el-tooltip>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :class="{'is-focus':Tabledensity==='large'}" @click="Tabledensity='large'">{{language.querytable.default}}</el-dropdown-item>
                                    <el-dropdown-item :class="{'is-focus':Tabledensity==='default'}" @click="Tabledensity='default'">{{language.querytable.medium}}</el-dropdown-item>
                                    <el-dropdown-item :class="{'is-focus':Tabledensity==='small'}" @click="Tabledensity='small'">{{language.querytable.compact}}</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-popover trigger="click" placement="bottom" :width="300" class="table-popover">
                                <template #reference>
                                    <button class="setupList-btn">
                                        <el-tooltip effect="dark" :content="language.querytable.column" placement="top" >
                                            <div class="setupList">
                                                <component :is="Tools"></component>
                                            </div>
                                        </el-tooltip>
                                    </button>
                                </template>
                                <div class="colsetup">
                                    <div class="colsetup-header">
                                        <el-checkbox v-model="allcolsetup" @change="selectall" :indeterminate="Semiselective">{{language.querytable.column}}</el-checkbox>
                                        <el-button text type="primary" @click="chongzhi">{{language.querytable.reset}}</el-button>
                                    </div>
                                    <div class="colsetup-main">
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.rulename" @change=" selectitem">{{language.querytable.rulename}}</el-checkbox>
                                        </div>
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.describe" @change=" selectitem">{{language.querytable.describe}}</el-checkbox>
                                        </div>
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.servicecalls" @change=" selectitem">{{language.querytable.calls}}</el-checkbox>
                                        </div>
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.state" @change=" selectitem">{{language.querytable.state}}</el-checkbox>
                                        </div>
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.Updatetime" @change=" selectitem">{{language.querytable.dispatchtime}}</el-checkbox>
                                        </div>
                                        <div class="colsetup-main-item">
                                            <el-checkbox v-model="colsetup.operation" @change=" selectitem">{{language.querytable.operation}}</el-checkbox>
                                        </div>
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                    </div>
                    <div class="tableList-show-chioce" v-if="tebleseletion.length">
                        <div class="tableList-show-chioce-num">
                            {{language.querytable.selected}}  {{tebleseletion.length}} {{language.querytable.item}}
                        </div>
                        <div class="tableList-show-chioce-cancel">
                            <el-button text type="primary" size="small" @click="cancelchioceall">{{language.querytable.deselect}}</el-button>
                        </div>
                    </div>
                    <div class="tableList-show-main">
                        <div class="tableList-show-main-table">
                            <el-table ref="tableref"  :size="Tabledensity" table-layout='auto' :data="currentList" style="width: 100%"  @selection-change="tableseletionchange" @select="choiceonly" @select-all="choiceAll" :row-class-name="changechoice">
                                <el-table-column type="selection" width="50" />
                                <el-table-column property="rulename" :label="language.querytable.rulename"  v-if="colsetup.rulename" />
                                <el-table-column property="describe" :label="language.querytable.describe"  v-if="colsetup.describe">
                                    <template #default="scope">
                                        <div class="describe">
                                            {{scope.row.describe}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column property="callNo" :label="language.querytable.calls"  sortable  v-if="colsetup.servicecalls">
                                    <template #default="scope">{{ scope.row.callNo}}万</template>
                                </el-table-column>
                                <el-table-column property="status" :label="language.querytable.state"  v-if="colsetup.state" >
                                    <template #default="scope">
                                        <div class="status-body" v-if="scope.row.status===1">
                                            <div class="status-img" style="background-color:green"></div>
                                            <div>{{language.querytable.Online}}</div>
                                        </div>
                                        <div class="status-body" v-else-if="scope.row.status===2">
                                            <div class="status-img status-loading"  style="background-color:#1890ff"></div>
                                            <div>{{language.querytable.operation}}</div>
                                        </div>
                                        <div class="status-body" v-else-if="scope.row.status===3">
                                            <div class="status-img "  style="background-color:red"></div>
                                            <div>{{language.querytable.abnormal}}</div>
                                        </div>
                                        <div class="status-body" v-else>
                                            <div class="status-img"  style="background-color:#d9d9d9"></div>
                                            <div>{{language.querytable.close}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column property="updatedAt" :label="language.querytable.dispatchtime"  sortable  v-if="colsetup.Updatetime" />
                                <el-table-column  :label="language.querytable.operation"  v-if="colsetup.operation">
                                    <template #default="scope">
                                        <div class="operation">
                                            <el-button size="small" type="primary" text @click="openallocations(scope.row)">{{language.querytable.allocation}}</el-button>
                                            <el-button size="small" type="primary" text><a :href="scope.row.href" class="a-btn">{{language.querytable.subscribe}}</a></el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </div>
                    </div>
                    <div class="pagination-container">
                        <div class="currentinfo"> {{(current-1)*pagesize}}~{{current*pagesize}} /</div>
                        <el-pagination small v-model:currentPage="current" v-model:page-size="pagesize" :page-sizes="[20, 30, 40, 50]"   :layout="paginationitem"  :total="totals"  @size-change="changesize"  @current-change="changepage"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="tableList-handle-chioce"  v-if="tebleseletion.length" :class="{'is-open':navigation!=='top' && !allinfo.iscollapse,'is-close':navigation!=='top' && allinfo.iscollapse}">
            <div class="tableList-handle-chioce-content">
                <div>{{language.querytable.selected}} {{tebleseletion.length}} {{language.querytable.item}}</div>
                <div>{{language.querytable.totalnumbercall}} {{Numberofcalls}} {{language.querytable.thousand}}</div>
            </div>
            <div class="tableList-handle-chioce-btn">
                <el-button>{{language.querytable.moredelete}}</el-button>
                <el-button type="primary">{{language.querytable.moreapproval}}</el-button>
            </div>
        </div>
        <!-- 打开新建 -->
        <el-dialog v-model="opennewlybuild" :title="language.querytable.addrule" width="50%" :before-close="Cancelnew"> 
            <el-form :model="Newrule" :rules="ValidationRules" status-icon :ref="ruleFormRef">
                <el-form-item  prop="rulename">
                    <el-input v-model="Newrule.rulename" />
                </el-form-item>
                <el-form-item prop="describe">
                    <el-input v-model="Newrule.describe" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="margin-right: 15px">
                    <el-button  @click="Cancelnew">{{language.querytable.cancel}}</el-button>
                    <el-button type="primary" @click="Confirmnew">{{language.querytable.confirm}}</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 打开配置面板 -->
        <el-dialog v-model="allocations" :title="language.querytable.configuration" width="50%">
            <el-steps :active="active" align-center>
                <el-step :title="language.querytable.basicinfo" />
                <el-step :title="language.querytable.configurerule" />
                <el-step :title="language.querytable.setcalls" />
            </el-steps>
             <el-form :model="allocation" label-width="auto" :rules=" validateallocations" status-icon>
                 <el-form-item  prop="rulename" :label='language.querytable.rulename' v-if="active===0">
                    <el-input v-model="allocation.rulename" />
                </el-form-item>
                <el-form-item prop="describe" :label='language.querytable.describe' v-if="active===0">
                    <el-input v-model="allocation.describe" type="textarea" />
                </el-form-item>
                <el-form-item :label='language.querytable.monitoringobj' v-if="active===1">
                     <el-select v-model="monitor.Monitorobj" placeholder="Monitorobj">
                        <el-option  :label='language.querytable.listone' value="1"/>
                        <el-option  :label='language.querytable.listtwo' value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item :label='language.querytable.ruletemp' v-if="active===1">
                     <el-select v-model="monitor.Ruletemplate" placeholder="Ruletemplate">
                        <el-option  :label='language.querytable.ruletempone' value="1"/>
                        <el-option  :label='language.querytable.ruletemptwo' value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item :label='language.querytable.ruletype' v-if="active===1">
                    <el-radio-group v-model="monitor.Ruletype">
                        <el-radio :label="1">{{language.querytable.strong}}</el-radio>
                        <el-radio :label="0">{{language.querytable.weak}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label='language.querytable.configtime' v-if="allocation.createdAt && active===2">
                    <el-date-picker v-model="allocation.updatedAt" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts" />
                </el-form-item>
                <el-form-item :label='language.querytable.starttime' v-if="!allocation.createdAt && active===2">
                    <el-date-picker v-model="allocation.createdAt" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts" />
                </el-form-item>
                <el-form-item :label='language.querytable.monitortime' v-if="active===2">
                    <el-radio-group v-model="monitor.Monitortime">
                        <el-radio :label="1">{{language.querytable.month}}</el-radio>
                        <el-radio :label="0">{{language.querytable.week}}</el-radio>
                    </el-radio-group>
                </el-form-item>
             </el-form>
             <template #footer>
                <div style="margin-right: 15px">
                    <el-button v-if="active>0" @click="activelast">{{language.querytable.last}}</el-button>
                    <el-button type="primary" v-if="active<2" @click="activenext">{{language.querytable.next}}</el-button>
                    <el-button type="primary" v-if="active===2" @click="Submit">{{language.querytable.submit}}</el-button>
                </div>
            </template>
        </el-dialog>
    </section>
</template>
<script setup>
import { ref,onBeforeMount,reactive,inject,watchEffect} from 'vue'
import {QuestionFilled,ArrowUpBold,Plus,RefreshRight,Tools,Sort} from '@element-plus/icons-vue'
// import axios from '@/ToolPackage/axiosp'
import {tablelist} from '@/store/TablelistStore'
import { storeToRefs } from 'pinia'

// 国际化
let language=inject('language')
//获取当前用户及权限
let userpower=JSON.parse(localStorage.getItem('jurisdiction'))
let currentusername=localStorage.getItem('user')


let querytable=tablelist()
//总条数 , 当前页 , 每页条数 , 当前页的列表 , 配置规则 , 监控 , 分页组件显示的元素 , 列设置中允许展示的列
let { totals , current , pagesize , currentList , allocation , monitor , paginationitem , colsetup}=storeToRefs(querytable)

//当前的分页控件
//设备名称 js媒体查询
import {useResize} from '@/ToolPackage/equipment.js'
let equipment=useResize().device
watchEffect(()=>{
    if(equipment.value==='desktop'){
      paginationitem.value='total, sizes, prev, pager, next, jumper'
    }else if(equipment.value==='tablet'){
      paginationitem.value='total, sizes, prev, pager, next'
    }else if(equipment.value==='mobile'){
      paginationitem.value='total, prev, pager, next'
    }
})
//更新页数
let updateList=querytable.updateList
//不同环境下（生产环境，开发环境）请求网址节点名
onBeforeMount(() => {
    updateList()
})
//页数变化
let changepage=querytable.changepage
//每页信息条数变化
let changesize=querytable.changesize

let {Querybasis}=storeToRefs(querytable)
//查询表单是否关闭
let ExpandQuery=ref(true)
//是否打开新建规则框
let opennewlybuild=ref(false)
//新建规则
let {Newrule}=storeToRefs(querytable)
let ruleFormRef=ref(null)
//新建规则时规则名的验证值
const ValidationRuleName=(rule,value,callback)=>{
     if (value===null || value===" " ||  value==="") {
        callback(new Error('规则名称为必填项'))
     }
}
const ValidationRuledescribe=(rule,value,callback)=>{
     if (value===null || value===" " ||  value==="") {
        callback(new Error('规则描述需要写'))
     }else{
         if(value.length<5){
             callback(new Error('描述长度至少为五个字符'))
         }else{
             callback()
         }
     }
}
const ValidationRules = reactive({
  rulename: { validator: ValidationRuleName, trigger: 'blur' },
  describe: { validator: ValidationRuledescribe, trigger: 'blur' }
})
//取消新建规则
function Cancelnew(){
    for (const key in Newrule.value) {
        Newrule.value[key]=null
    }
    opennewlybuild.value=false
}
let establishrule=querytable.establishrule
//确认新建
function Confirmnew(){
    let oknext=true
    for (const key in Newrule.value) {
        if(!Newrule.value[key]){
            oknext=false
        }
    }
    if(oknext){
        opennewlybuild.value=false
        establishrule(currentusername)
    }
    
}


let Editpermissions=JSON.parse(localStorage.getItem('jurisdiction')).edit
//表格密度
let Tabledensity=ref('large')
//打开表格列设置
let allcolsetup=ref(true)

//半选状态
let Semiselective=ref(false)
//选中的内容的长度
let selected=ref(Object.keys(colsetup.value).length)
function selectall(value){
    allcolsetup.value=value;
    if(allcolsetup.value===true){
        selected.value=0
        for (const key in colsetup.value) {
            colsetup.value[key]=value
            selected.value++
        }
    }else{
        selected.value=0
        for (const key in colsetup.value) {
            colsetup.value[key]=value
        }
    }
    Semiselective.value=false
}
function selectitem(value){
    if(value){
        selected.value++
    }else{
        selected.value--
    }
    let allsetup=Object.keys(colsetup.value).length
    if(allsetup===selected.value){
        allcolsetup.value=true
        Semiselective.value=false
    }else if(selected.value===0){
        allcolsetup.value=false
        Semiselective.value=false
    }else{
        allcolsetup.value=false
        Semiselective.value=true
    }
}
function chongzhi(){
    allcolsetup.value=true
    selected.value=0
    for (const key in colsetup.value) {
        colsetup.value[key]=true
        selected.value++
    }
}

//表格的ref
let tableref=ref(null)
//被选中的内容
let tebleseletion=ref([])
//被选中的内容全部的调用次数
let Numberofcalls=ref(0)
//选择项方式变化时触发的事件
let tableseletionchange=(value)=>{
    Numberofcalls.value=0
    tebleseletion.value=value
    for (let i = 0; i < tebleseletion.value.length; i++) {
        Numberofcalls.value+=tebleseletion.value[i].callNo
    }
}
//点击单选时触发的事项
let choiceonly=(session,row)=>{
    if(row.Selected){
        row.Selected=false
    }else{
        row.Selected=true
    }
}
//点击全选时状态
let choiceAll=(session)=>{
    if(session.length!==0){
        for (let i = 0; i < currentList.value.length; i++) {
            currentList.value[i].Selected=true
        }
    }else{
        for (let j = 0; j < currentList.value.length; j++) {
            currentList.value[j].Selected=false
        }
    }
}
//取消全选
function cancelchioceall(){
    for (let j = 0; j < currentList.value.length; j++) {
        currentList.value[j].Selected=false
    }
    tableref.value.clearSelection()
}
//改变选中行的状态
let changechoice=({row,rowindex})=>{
    if(row.Selected){
        return 'is-selected'
    }
}

//面板配置部分
//步骤条
let active=ref(0)
//步骤下一步
function activenext(){
    if(allocation.value.rulename && allocation.value.describe.length>=5){
        if (active.value++ > 2) active.value = 0
    }
}
//步骤上一步
function activelast(){
    if(active.value <= 2){
        active.value--
    }
}

//打开配置面版
let  allocations=ref(false)
let  oldrulename=ref(null)
function  openallocations(info){
    oldrulename.value=info.rulename
    allocations.value=true
    for (const key in allocation.value) {
        allocation.value[key]=info[key]
    }
    active.value=0
}

//配置面板时的验证
const validateallocations= reactive({
  rulename: { validator: ValidationRuleName, trigger: 'blur' },
  describe: { validator: ValidationRuledescribe, trigger: 'blur' }
})

//开始时间的确定
const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '明天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '上周',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
  {
    text: '下周',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return date
    },
  },
  {
    text: '上月',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 30 * 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '下月',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 30 * 3600 * 1000 * 24)
      return date
    },
  },
]

//取消配置
let resetallocation=querytable.resetallocation
function cancelSubmit(){
    allocations.value=false
    resetallocation()
}
//提交配置
function Submit(){
    if(allocation.updatedAt&&allocation.createdAt){
        console.log(active.value);
        console.log(allocation.value);
        // oldrulename
        // allocations.value=false
    }
}

//调整最下面群体配置的宽度
import { allpageinfo } from "@/store/AllLayoutStore.js";
let allinfo = allpageinfo()
import { layoutshows } from "@/store/PageStyleStore.js";
let {navigation} = layoutshows()
</script>
<style scoped>
    @import url('./TableList.css');
</style>
<style>
    /* .el-table .is-selected{
        background-color: var(--el-color-primary-light-9);
    } */
</style>