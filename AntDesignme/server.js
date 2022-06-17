import express from "express"
import {createServer as createViteServer} from "vite"
import glob from "glob"
import Mock from "mockjs"
import bodyParse from "body-parser"
import multer from "multer"
import { argv } from 'node:process'
import chalk from "chalk"
//它主要用于上传文件
const upload = multer({dest:"uploads/",limits:{
  //限制文件大小10kb
  fileSize: 20 * 1024 * 1024,
  //限制文件数量
  files: 5
}})
//k开启的端口名称
const port = argv[argv.indexOf("--port") + 1]
// const express=require("express")
// const createViteServer=require("vite").createServer
// const glob=require("glob")
// const Mock=require("mockjs")
async function createServer() {
    const app = express();
    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({extended:true}))
    //glob到处mock文件夹下所有文件的方法app. ....
    await new Promise((resolve,rejected) => {
        glob("./mock/*.js",(error, files)=> {
          if(error) rejected()
          files.forEach(async item => {
            // console.log(require(item));
            // for (const key in require(item)) {
            //     require(item)[key](app,Mock)
            if(item!=='./mock/app.js'){
              if(item === "unlink" || item === "unlinkDir") return
              const {default:fn = (() =>{})} = await import(`${item}`);
              fn(app,Mock,upload)
            }
          })
          
          resolve()
        })
      })

    // 以中间件模式创建 Vite 服务器
    const vite = await createViteServer({
        server: { middlewareMode: 'html'}
    })
    // 将 vite 的 connect 实例作中间件使用
    app.use(vite.middlewares)
    app.listen(`${port}`,()=>{
        console.log(chalk.blue("请使用以下地址来访问网站"));
        console.log(chalk.green(`http://localhost:${port}`));
        console.log(chalk.green(`http://127.0.0.1:${port}`));
    })
}
createServer()