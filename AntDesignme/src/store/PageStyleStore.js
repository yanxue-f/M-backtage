import { defineStore } from 'pinia';
export const layoutshows=defineStore('layoutshow',{
    state:()=>{
        return{
            //页面风格
            //页面整体风格
            overall:"Lright",
            //当前主题色
            themecolors:"default",
            //当前导航风格 default top left
            navigation:"default",
            //内容宽度样式
            flowWidth:true,
            //是否固定顶部导航
            fixedHeader:false,
            //是否固定侧边菜单
            fixedAside:true,
            //是否分割菜单
            Splitmenu:false,
            
            //页面整体风格类型
            overallarr:["Bright","Lright"],
            //全部主题颜色
            themecolorarr:[
                {type:"default",color:"#1890ff",bg:"#e6f7ff",title:'blue'},
                {type:"dusk",color:'#f5222d',bg:'#fff1f0',title:'red'},
                {type:"volcano",color:'#fa541c',bg:'#fff2e8',title:'orange'},
                {type:"nightfall",color:'#faad14',bg:'#fffbe6',title:'yellow'},
                {type:"Mingqing",color:'#13c2c2',bg:'#e6fffb',title:'young'},
                {type:"Auroragreen",color:'#52c41a',bg:'#f6ffed',title:'green'},
                {type:"Geekblue",color:'#2f54eb',bg:'#f0f5ff',title:'darkblue'},
                {type:"Maozi",color:'#722ed1',bg:'#f9f0ff',title:'purple'},
            ],
            //各种导航风格及其可以设置的其他属性
            navigationAll:{
                default:{
                    flowWidth:[
                        {
                            value:true,
                            label:"move"
                        },
                        {
                            value:false,
                            label:"static"
                        }
                    ],
                    fixedHeader:true,
                    fixedAside:true,
                    Splitmenu:true,
                },
                top:{
                    flowWidth:[
                        {
                            value:true,
                            label:"move"
                        },
                        {
                            value:false,
                            label:"static"
                        }
                    ],
                    fixedHeader:true,
                    fixedAside:false,
                    Splitmenu:false,
                },
                top:{
                    flowWidth:[
                        {
                            value:true,
                            label:"move"
                        },
                        {
                            value:false,
                            label:"static"
                        }
                    ],
                    fixedHeader:true,
                    fixedAside:false,
                    Splitmenu:false,
                },
                left:{
                    flowWidth:[
                        {
                            value:true,
                            label:"move"
                        },
                    ],
                    fixedHeader:true,
                    fixedAside:true,
                    Splitmenu:false,
                }
            }
        }
    },
    getters:{
        
    },
    actions:{
        //页面风格切换
        changeoverall(){
            if(this.overall==="Lright"){
                document.documentElement.classList.remove("dark-mode")
            }else if(this.overall==="Bright"){
                document.documentElement.classList.add("dark-mode")
            }
        },
        //通过点击改变当前的主题色
        ChangeColor(themecolor){
            this.themecolors=themecolor
            let nowtheme=this.themecolorarr.filter((item)=>{
              return (item.type===this.themecolors)
            })[0]
            let root = document.querySelector(':root')
            root.style.setProperty('--m-text-color', nowtheme.color)
            root.style.setProperty('--m-bg-color', nowtheme.bg)
          }
    }
})