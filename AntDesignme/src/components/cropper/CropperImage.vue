<template>
    <div  class="cropper-body">

        <div  class="cropper-body-item">

            <div  class="cropper-body-left">

                <canvas  ref="canvas"  width = "300"  height = "300"  @mousedown = "Moveviewport($event)" ></canvas>

            </div>

        </div>

        <div  class="cropper-body-item" >
            <div  class="cropper-body-right" >

                <div  class="cropper-body-preview"  :style='{ "width" : `${shearW}px` , "height" : `${shearH}px` }'>
                    <canvas  ref="newpaper"  :width="shearW"  :height="shearH" ></canvas>
                </div>

                <el-button  type="primary"  class="colour"  @click="submitimage" >提交</el-button>
            
            </div>
            
            <label  class="file">
                <span>选择</span>
                <el-icon  class="file-icon"><Lightning/></el-icon>
                <div  class="file-info">
                    {{nowimage}}
                </div>
                <input  ref='fileobj'  type="file"  accept="image/*"  @change='fileto'  hidden>
            </label>
            <div  class="cropper-body-btn">
                
                <el-button  type="primary"  plain  @click="proportionmore">
                    <el-icon><Plus/></el-icon>
                </el-button>

                <el-button  type="primary"  plain  :disabled="proportion<=minproportion"  @click="proportionsmall">
                    <el-icon><Minus /></el-icon>
                </el-button>

                <el-button  type="primary"  plain  @click="Rotationleft">
                    <el-icon><RefreshLeft /></el-icon>
                </el-button>

                <el-button  type="primary"  plain  @click="Rotationright">
                    <el-icon><RefreshRight /></el-icon>
                </el-button>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref , onMounted , defineProps , defineEmits ,  watch , toRef} from 'vue'
    import { Plus , Minus , RefreshLeft , RefreshRight , Lightning } from '@element-plus/icons-vue'
    import axios from "@/ToolPackage/axiosp";
    let props = defineProps(['imageurl','Swidth','Sheight','active','open'])
    /**提交后需要执行的事件 */
    let emit = defineEmits(['submit'])
    /**当前头像图片url，想要裁剪到的宽，高，修改后的图片上传时的请求地址*/
    let {imageurl,Swidth,Sheight,active} = props
    //判断是否打开当前编辑页面
    let open=toRef(props, "open")
    watch(open,(newvalue,oldvalue)=>{
        if(!newvalue){
            proportion.value=1
            nowimage.value = null;
            ctx.clearRect(0,0,width,height)
        }else{
            image.src = imageurl;
            imagewidth.value = image.width
            imageheight.value = image.height
            if(proportion.value < minproportion.value){
                proportion.value = minproportion.value
            }
        }
    })
    //图片编辑画板
    let canvas = ref(null)
    //编辑后新的画板
    let newpaper = ref(null)
    //图片上传input
    let fileobj = ref(null)
    let ctx,newctx,width,height
    const image  = new Image();
    // image.crossOrigin = 'anonymous';
    let reader = new FileReader();
    let nowimage = ref(null)
    //上传图片文件
    function fileto(){
        if (fileobj.value.files) {
            nowimage.value = fileobj.value.files[0].name
            reader.readAsDataURL(fileobj.value.files[0])
        }
    }
    //读取图片文件成功后加载图片
    reader.onload = function(e){
        image.src = e.target.result;
    }
    //初始化编辑和预览画板
    onMounted(()=>{
        ctx = canvas.value.getContext("2d");
        newctx = newpaper.value.getContext('2d')
        width = canvas.value.width;
        height = canvas.value.height;
        image.src = imageurl;
        imagewidth.value = image.width
        imageheight.value = image.height
        shearW.value = Swidth
        shearH.value = Sheight
        //最小缩放比
        minproportion.value = Math.min(shearW.value/imagewidth.value,shearH.value/imageheight.value)
        if(proportion.value < minproportion.value){
            proportion.value = minproportion.value
        }
    })
    //图片高度和宽度
    let imagewidth = ref(null)
    let imageheight = ref(null)
    //图片左上角的坐标
    let imageleft = ref({x:null,y:null})
    //旋转角度
    let Rotation = ref(0)
    //选装中心点
    let potationcenter = ref({x:imageleft.value.x+imagewidth.vaue/2,y:imageleft.value.y+imageheight.vaue/2})
    //左旋
    function Rotationleft(){
        Rotation.value = Rotation.value-90
        uniquecanvas()
    }
    //右旋
    function Rotationright(){
        Rotation.value = Rotation.value+90
        uniquecanvas()
    }
    //选中框左上角坐标
    let Viewport = ref({x:null,y:null})
    //放大或缩小比例
    let proportion = ref(1)
    //最小缩放比
    let minproportion = ref(1)
    //放大
    function proportionmore(){
        imagewidth.value = imagewidth.value/proportion.value;
        imageheight.value =  imageheight.value/proportion.value;
        proportion.value = proportion.value+0.2
        moreorsmall()
        uniquecanvas()
    }
    //缩小
    function proportionsmall(){
        imagewidth.value = imagewidth.value/proportion.value;
        imageheight.value =  imageheight.value/proportion.value;
        proportion.value = proportion.value-0.2
        if(proportion.value < minproportion.value){
            proportion.value = minproportion.value
        }
        moreorsmall()
        uniquecanvas()
    }
    //选中框的宽高
    let shearW = ref(null)
    let shearH = ref(null)
    //选中框内部的像素信息
    let preview
    //初始创建
    image.onload = function(){
        //最小缩放比
        minproportion.value = Math.min(shearW.value/image.width,shearH.value/image.height)
        if(proportion.value < minproportion.value){
            proportion.value = minproportion.value
        }
        //引入后图片的宽高
        imagewidth.value = image.width*proportion.value;
        imageheight.value =  image.height*proportion.value;
        ///引入后图片的左上角
        imageleft.value.x = width/2-imagewidth.value/2
        imageleft.value.y = height/2-imageheight.value/2
        //旋转中心点坐标
        potationcenter.value = {x:imageleft.value.x+imagewidth.value/2,y:imageleft.value.y+imageheight.value/2}
        //选中框左上角坐标
        Viewport.value.x = width/2-shearW.value/2;
        Viewport.value.y = height/2-shearH.value/2;
        //绘制图片
        ctx.translate(potationcenter.value.x,potationcenter.value.y)
        ctx.rotate(Math.PI * Rotation.value / 180)
        ctx.translate(-potationcenter.value.x,-potationcenter.value.y)
        ctx.drawImage(image,imageleft.value.x,imageleft.value.y,imagewidth.value,imageheight.value)
        ctx.beginPath();
        ctx.translate(potationcenter.value.x,potationcenter.value.y)
        ctx.rotate(Math.PI * -Rotation.value / 180)
        ctx.translate(-potationcenter.value.x,-potationcenter.value.y)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1
        preview = ctx.getImageData(Viewport.value.x,Viewport.value.y,shearW.value,shearH.value);
        ctx.globalCompositeOperation  =  "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.fillRect(0,0,300,300);
        ctx.putImageData(preview,Viewport.value.x,Viewport.value.y)
        ctx.translate(0.5,0.5)
        ctx.strokeRect(Viewport.value.x,Viewport.value.y,shearW.value,shearH.value);
        ctx.translate(-0.5,-0.5)
        newctx.clearRect(0,0,width,height)
        newctx.beginPath();
        newctx.putImageData(preview,0,0);
    }
    //移动选择框
    function Moveviewport(event){
        //当前鼠标在canvas中的相对坐标
        const clickX = event.clientX-event.target.getBoundingClientRect().x;
        const clickY = event.clientY-event.target.getBoundingClientRect().y;
        //判断是否捕获到
        let drag = captureR(clickX,clickY,Viewport.value.x,Viewport.value.y,shearW.value,shearH.value)
        //点击后触发的移动时间
        let oldVx = Viewport.value.x
        let oldVy = Viewport.value.y
        let oldIx = imageleft.value.x
        let oldIy = imageleft.value.y
        function move(event){
            let moveX = event.clientX-event.target.getBoundingClientRect().x;
            let moveY = event.clientY-event.target.getBoundingClientRect().y; 
            let postionX = moveX-clickX;
            let postionY = moveY-clickY;
            if(drag){
                Viewport.value.x = oldVx+postionX;
                Viewport.value.y = oldVy+postionY;
                if (Viewport.value.x <= imageleft.value.x) {
                    Viewport.value.x = imageleft.value.x
                }else if(Viewport.value.x+shearW.value >= imageleft.value.x+imagewidth.value){
                    Viewport.value.x = imageleft.value.x+imagewidth.value-shearW.value
                };
                if (Viewport.value.y <= imageleft.value.y) {
                    Viewport.value.y = imageleft.value.y
                }else if(Viewport.value.y+shearH.value > imageleft.value.y+imageheight.value){
                    Viewport.value.y = imageleft.value.y+imageheight.value-shearH.value
                };
                
            }else{
                imageleft.value.x = oldIx+postionX;
                imageleft.value.y = oldIy+postionY;
                if (Viewport.value.x <= imageleft.value.x) {
                    imageleft.value.x = Viewport.value.x
                }else if(Viewport.value.x+shearW.value >= imageleft.value.x+imagewidth.value){
                    imageleft.value.x = Viewport.value.x+shearW.value-imagewidth.value
                };
                if (Viewport.value.y <= imageleft.value.y) {
                    imageleft.value.y = Viewport.value.y
                }else if(Viewport.value.y+shearH.value > imageleft.value.y+imageheight.value){
                    imageleft.value.y = Viewport.value.y+shearH.value-imageheight.value
                };
            }
            uniquecanvas()
        }
        function up(event) {
            uniquecanvas()
            canvas.value.removeEventListener("mousemove",move)
            document.removeEventListener("mouseup",up);
        };
        if(!(imageleft.value.x===Viewport.value.x && imageleft.value.y===Viewport.value.y && imagewidth.value===shearW.value && imageheight.value===shearH.value)){
            canvas.value.addEventListener("mousemove",move);
            document.addEventListener("mouseup",up);
        }
    }
    //图片放大缩小
    function moreorsmall(){
        imagewidth.value = imagewidth.value*proportion.value;
        imageheight.value =  imageheight.value*proportion.value;
        ///引入后图片的左上角
        imageleft.value.x = width/2-imagewidth.value/2
        imageleft.value.y = height/2-imageheight.value/2
    }
    //更新图片绘制带有需要的旋转
    function uniquecanvas(){
        potationcenter.value = {x:imageleft.value.x+imagewidth.value/2,y:imageleft.value.y+imageheight.value/2}
        ctx.clearRect(0,0,width,height)
        ctx.beginPath();
        ctx.translate(potationcenter.value.x,potationcenter.value.y)
        ctx.rotate(Math.PI * Rotation.value / 180)
        ctx.translate(-potationcenter.value.x,-potationcenter.value.y)
        ctx.drawImage(image,imageleft.value.x,imageleft.value.y,imagewidth.value,imageheight.value)
        ctx.beginPath();
        ctx.translate(potationcenter.value.x,potationcenter.value.y)
        ctx.rotate(Math.PI * -Rotation.value / 180)
        ctx.translate(-potationcenter.value.x,-potationcenter.value.y)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1
        preview = ctx.getImageData(Viewport.value.x,Viewport.value.y,shearW.value,shearH.value);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.fillRect(0,0,300,300);
        ctx.putImageData(preview,Viewport.value.x,Viewport.value.y)
        ctx.translate(0.5,0.5)
        ctx.strokeRect(Viewport.value.x,Viewport.value.y,shearW.value,shearH.value);
        ctx.translate(-0.5,-0.5)
        newctx.clearRect(0,0,width,height)
        newctx.beginPath();
        newctx.putImageData(preview,0,0);
    }
    //判断是否捕获
    function captureR(cx,cy,x,y,w,h) {
        return cx>x&&cx<x+w&&cy>y&&cy<y+h
    }
    //提交文件
    async function submitimage(){
        console.log(reader);
        let newimage = newpaper.value.toDataURL()
        let imgdata = new FormData()
        // Downloadtolocal(newimage,'newpersonal')
        imgdata.append('image',newimage);
        let changeimgok = await axios.post(`/cropperimage/${active}`,imgdata)
        if(changeimgok.data.success){
            emit('submit')
        }
    }
    //将修改后的图片保存到本地
    import * as fs from "fs"
    function Downloadtolocal(data,name){
        let filetype = data.match(/^data:image\/(\w+);base64,/)[1]
        // 创建一个 a 标签，并设置 href 和 download 属性
        const el  =  document.createElement('a');
        // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
        el.href  =  data;
        el.download  =  `${name}.${filetype}`;
        
        // 创建一个点击事件并对 a 标签进行触发
        const event  =  new MouseEvent('click');
        el.dispatchEvent(event)
    }
</script>
<script>
export default {
    name:"cropper-image"
}
</script>
<style scoped>
    @import url('./CropperImage.css');
    
</style>