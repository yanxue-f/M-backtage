import shell from "shelljs"
import chokidar from "chokidar"
import {statSync,mkdir} from "node:fs"
import { argv } from 'node:process'
const port = argv[argv.indexOf("--port") + 1];
// 监控的目录
const watchDir = "./mock";
// 子进程
let childProcess;
// 是否已开启监控目录
let isStartWatch;
// 判断文件是否存在
const isHasMockDir = statSync(watchDir,{
  throwIfNoEntry:false
})
if(!isHasMockDir) {
  mkdir(watchDir,err => {
      startWatchDir()
  })
}else {
  if(!isStartWatch) {
    startWatchDir()
  }
}
function startWatchDir() {
    isStartWatch = chokidar.watch(watchDir).on('all', (event) => {
      childProcess && childProcess.kill()
      childProcess = shell.exec(`node server.js --port ${port}`,(error)=>{
        if(error) {
          shell.exit()
        }
      })
    })
}
// import shell from "shelljs"
// import chokidar from "chokidar"
// import { argv } from 'node:process'
// const port = argv[argv.indexOf("--port") + 1];
// // 监控的目录
// let childProcess
// chokidar.watch("./mock").on('all', (event) => {
//   childProcess && childProcess.kill()
//   childProcess = shell.exec(`node server.js --port ${port}`,(error)=>{
//     if(error) {
//       shell.exit()
//     }
//   })
// })