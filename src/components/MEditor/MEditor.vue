<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>
<script setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref , shallowRef , onMounted , defineProps , defineEmits } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import axios from "@/ToolPackage/axiosp";
    let props = defineProps(['valueHtml','Imageactive','Videoactive'])
    let emit = defineEmits(['update:valueHtml'])
    let valueHtml = ref(props.valueHtml)
    let { Imageactive , Videoactive } = props
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef(null)
    //编辑器模式
    let mode='default'

    // 内容 HTML
    // const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        
    })

    const toolbarConfig = {excludeKeys: 'fullScreen'}
    const editorConfig = { placeholder: '请输入内容...',MENU_CONF: {}}
    //上传图片配置
    editorConfig.MENU_CONF['uploadImage'] = {
      server: '/customUpload/image',
      fieldName: 'your-pictures',
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 10 * 1024 * 1024, // 1M
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,
      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,
      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // meta: {
      //     token: 'xxx',
      //     otherKey: 'yyy'
      // },
      // 自定义增加 http  header
      // headers: {
      //     Accept: 'text/x-json',
      //     otherKey: 'xxx'
      // },

      // 上传之前触发
      onBeforeUpload(file) {
      // file 选中的文件，格式如 { key: file }
      return file
      // 可以 return
      // 1. return file 或者 new 一个 file ，接下来将上传
      // 2. return false ，不上传这个 file
      },
      // 自定义上传
      async customUpload(file, insertFn) {
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = async (e)=>{
            let imageUpload = new FormData()
            imageUpload.append('image',e.target.result);
            let customimgok = await axios.post('/customUpload/image',imageUpload)
            let image = customimgok.data
            if(image.errno===0){
              insertFn(image.data.url,image.data.src,image.data.href)
            }
            
          }
          
      },
      // 上传进度的回调函数
      onProgress(progress) {
          // progress 是 0-100 的数字
          console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file, res) {
          console.log(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file, res) {
          console.log(`${file.name} 上传失败`, res)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file, err, res) {
          console.log(`${file.name} 上传出错`, err, res)
      },
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
    editorConfig.MENU_CONF['uploadVideo'] = {
      server: '/customUpload/video',
      // form-data fieldName ，默认值 'wangeditor-uploaded-video'
      fieldName: 'your-video',

      // 单个文件的最大体积限制，默认为 10M
      maxFileSize: 10 * 1024 * 1024, // 5M

      // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['video/*'],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // meta: {
      //     token: 'xxx',
      //     otherKey: 'yyy'
      // },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      // headers: {
      //     Accept: 'text/x-json',
      //     otherKey: 'xxx'
      // },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 30 秒
      timeout: 15 * 1000, // 15 秒

      // 视频不支持 base64 格式插入


      // 自定义上传视频
      async customUpload(file, insertFn) {
          // file 即选中的文件
          // 自己实现上传，并得到视频 url
          // 最后插入视频
          let videoUpload=new FormData()
          videoUpload.append('video',file);
          let customvideook=await axios.post('/customUpload/video',videoUpload)
          let video=customvideook.data
          if(video.errno===0){
            let reader=new FileReader()
            reader.readAsDataURL(file)
            reader.onload=(e)=>{
              insertFn(e.target.result)
            }
            
          }
      },
      // 上传之前触发
      onBeforeUpload(file) {
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },
      // 上传进度的回调函数
      onProgress(progress) {
          // progress 是 0-100 的数字
          console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file, res) {
          console.log(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file, res) {
          console.log(`${file.name} 上传失败`, res)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file, err, res) {
          console.log(`${file.name} 上传出错`, err, res)
      },
    }



    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    function handleChange(editor){
      emit('update:valueHtml', valueHtml.value)
    }
</script>
<style>
  .w-e-select-list ul{
    height: 200px;
  }
</style>