let Soliddara
export default (app,Mock,upload)=>{
  let datas=Mock.mock({
    "data|100":[
        {
        "disabled|1": true,
        "href": "https://ant.design",
        "avatar": "@image(50x50)",
        "name":"@cname",
        "rulename": "@ctitle",
        "describe": "@csentence()",
        "callNo": '@integer(10, 1000)',
        "status": '@integer(0, 4)',
        "updatedAt": '@datetime()',
        "createdAt": '@datetime()',
        "progress|1-100": 100 ,
      }
    ]
  })
  let templaet={
    disabled:false,
    href: "https://ant.design",
    avatar:null,
    name:null,
    rulename:null,
    describe:null,
    callNo:0,
    status:1,
    createdAt:null,
    updatedAt:null
  }
  Soliddara=datas.data
  app.post("/initial",async(rep,res,next) => {
    
    let params=rep.body
    let dataarr=Soliddara.slice((params.current-1)*params.pagesize,params.current*params.pagesize)
    res.status(200)
    res.json(
      { code:200,
        success:true,
        total:Soliddara.length,
        alllist:dataarr,
        onlyrule:templaet
    })
  }),
  app.post("/changesize",async(rep,res,next) => {
    
    let params=rep.body
    let dataarr=Soliddara.slice((params.current-1)*params.pagesize,params.current*params.pagesize)
    res.status(200)
    res.json(
      { code:200,
        success:true,
        total:Soliddara.length,
        alllist:dataarr,
    })
  })
  app.post("/tablelist/add",async(rep,res,next) => {
    let params=rep.body
    for (const key in Soliddara) {
      if(Soliddara[key].rulename===params.newrole.rulename){
        res.status(200)
        res.json(
          { code:200,
            success:false,
            error:'当前规则名已存在'
        })
      }
    }
    let newrole=templaet
    newrole.createdAt=new Date().toLocaleString()
    newrole.updatedAt=new Date().toLocaleString()
    newrole.name=params.username
    for (const key in params.newrole) {
        newrole[key]=params.newrole[key]
    }
    Soliddara.push(newrole)
    let currentinfo=Soliddara.slice((params.currentpage-1)*params.currentsize,params.currentpage*params.currentsize)
    res.status(200)
    res.json(
      { code:200,
        success:true,
        total:Soliddara.length,
        current:currentinfo
    })
  })
  app.post('/tablelist/allocation',async(rep,res,next) => {
    let params=rep.body
  })
}
//require()导出的形势
// exports.函数名=()=>{
//}