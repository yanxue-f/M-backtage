export default (app,Mock,upload)=>{
    let mockinfo=Mock.mock({
        "user|100":[
            {
                "createdAt": '@datetime()',
                "name":'@first()',
                'email':'@email()',
                'city':'@county(true)',
                'template': /\d{5,11}/,
                'gender':'@integer(0, 1)',
            }
        ]
    })
    let RoleJurisdiction={
        1:['User','UserA','UserD','UserC','UserV','Role','RoleA','RoleD','RoleC','RoleV','Menu','MenuA','MenuD','MenuC','MenuV'],
        2:['User','UserA','UserD','UserC','UserV','RoleV','Menu','MenuA','MenuD','MenuC','MenuV'],
        10:['UserV','RoleV','MenuV'],
    }
    let RoleJurisdictiontem=[{
                id: 'User',
                label: 'UserManage',
                children: [
                    {
                        id:'UserA',
                        label:'add',
                    },
                    {
                        id:'UserD',
                        label:'delete',
                    },
                    {
                        id:'UserC',
                        label:'change',
                    },
                    {
                        id:'UserV',
                        label:'view',
                    },
                ],
            },
            {
                id: 'Role',
                label: 'RoleManage',
                children: [
                    {
                        id:'RoleA',
                        label:'add',
                    },
                    {
                        id:'RoleD',
                        label:'delete',
                    },
                    {
                        id:'RoleC',
                        label:'change',
                    },
                    {
                        id:'RoleV',
                        label:'view',
                    },
                ],
            },
            {
                id: 'Menu',
                label: 'menumanagement',
                children: [
                    {
                        id:'MenuA',
                        label:'add',
                    },
                    {
                        id:'MenuD',
                        label:'delete',
                    },
                    {
                        id:'MenuC',
                        label:'change',
                    },
                    {
                        id:'MenuV',
                        label:'view',
                    },
                ],
            },
        ]
    let rolename=[[1,'Boss'],[2,"ViceBoss"],[10,'Staff']]
    let usertemplate={
        username:null,
        password:null,
        role:null,
    }
    let userList=[
        {
            username:'admin',
            password:'vue.login',
            role:1,
        },
        {
            username:'yanxue',
            password:'vue.login',
            role:2,
        },
        {
            username:'qwer',
            password:'vue.login',
            role:10,
        }
    ]
    let userinfos={}
    let i=0
    userList.forEach(item => {
        userinfos[item.username]=mockinfo.user[i]
        userinfos[item.username].image=`../src/static/asadsa.png`
        i++
    });
    app.get("/Publickey/:user",async(rep,res,next) => {
        let username=rep.params.user;
        let cunz= userList.some((item)=>{
            return item.username===username
        })
        if(cunz){
            let falsePublickey=Mock.mock('@string("upper", 10)')
            res.status(200)
            res.json({
                code:200,
                success:true,
                Publickey:falsePublickey
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                success:false,
                error:'不存在此用户'
            })
        }
        
    }),
    
    app.post('/login',async(rep,res,next) => {
        let userinfo=rep.body
        let cunz= userList.filter((item)=>{
            return item.username===userinfo.username && item.password===userinfo.userpassword
        })[0]
        if(cunz){
            res.status(200)
            res.json({
                code:200,
                success:true,
                result:{
                    token:Mock.mock('@string(20)'),
                    jurisdiction:RoleJurisdiction[cunz.role],
                }
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                success:false,
                error:'密码错误'
            })
        }
    })
    app.get('/getusers',async(rep,res,next) => {
        res.status(200)
        res.json({
            code:200,
            success:true,
            list:userList,
            usermould:usertemplate,
            roles:rolename,
            roleJurisdiction:RoleJurisdiction
        })
    })
    //获取要编辑的用户
    app.get('/useList/:user',async(rep,res,next) => {
        let username=rep.params.user;
        let cunz= userList.filter(item=>{
            return item.username===username
        })[0]
        res.status(200)
        res.json({
            code:200,
            success:true,
            currentuser:cunz
        })
    })
    app.get('/judge/:user',async(rep,res,next) => {
        let username=rep.params.user;
        let cunz= userList.some((item)=>{
            return item.username===username
        })
        if(!cunz){
            //要添加的用户名不存在
            /**
             * 获取用户名，
             *  采用非对称加密生成公钥和私钥
             * 并采用hash加密后的用户名为文件名将公钥私钥保存起来
             * 将公钥发送回去
             */
            res.status(200)
            res.json({
                code:200,
                success:true,
                Publickey:Mock.mock('@string("upper", 10)')
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                success:false,
                error:'当前用户名已存在请重新输入'
            })
        }
    })
    app.post('/userList/add',async(rep,res,next) => {
        let newuser=rep.body
        let pushuser={}
        for (const key in usertemplate) {
            pushuser[key]=newuser[key]
        }
        //从以hash加密后的用户名为文件名的文件内获取私密将密码加密....省略
        userList.push(pushuser)
        res.status(200)
        res.json({
            code:200,
            success:true,
            list:userList,
        })
    })
    app.post('/userList/edit',async(rep,res,next) => {
        let edituser=rep.body
        for (let i = 0; i < userList.length; i++) {
            if(userList[i].username===edituser.oldname){
                userList[i]=edituser.newuser
                break
            }
        }
        res.status(200)
        res.json({
            code:200,
            success:true,
            userlist:userList
        })
    })
    app.get('/userList/delete/:user',async(rep,res,next) => {
        let deleteuser=rep.params.user;
        let cunz= userList.some((item)=>{
            return item.username===deleteuser
        })
        if(cunz){
            for (let i = 0; i < userList.length; i++) {
                if(userList[i].username===deleteuser){
                    userList.splice(i,1)
                }
            }
            res.status(200)
            res.json({
                code:200,
                success:true,
                userlist:userList
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                success:false,
                error:'当前用户名不存在'
            })
        }
    })
    app.get('/role/info/:user',async(rep,res,next) => {
        let currentusername=rep.params.user;
        let currentuser=userList.filter(item=>{
            return item.username===currentusername
        })[0]
        if(currentuser){
            res.status(200)
            res.json({
                code:200,
                success:true,
                rolelist:RoleJurisdictiontem,
                current:currentuser,
                rolename:rolename,
                RoleJurisdiction:RoleJurisdiction
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                success:false,
                error:'当前用户名不存在'
            })
        }
    })
    app.post('/role/add',async(rep,res,next)=>{
        let roleobj=rep.body
        let Lowername=roleobj.key.slice(1).toLowerCase()
        let uppername=roleobj.key[0].toUpperCase()
        rolename.push([roleobj.value,uppername+Lowername])
        rolename.sort((a,b)=>{
            return a[0]-b[0]
        })
        RoleJurisdiction[roleobj.value]=roleobj.jurisdiction
        res.status(200)
        res.json({
            code:200,
            success:true,
            RoleJurisdiction:RoleJurisdiction,
            rolename:rolename,
        })
    })
    app.post('/role/edit',async(rep,res,next)=>{
        let rolechange=rep.body
        let oldvalue=rolechange.olduser
        delete RoleJurisdiction[oldvalue];
        for (let i = 0; i < rolename.length; i++) {
            if(rolename[i][0]===oldvalue){
                rolename.splice(i,1)
            }
        }
        let Lowername=rolechange.newuser.key.slice(1).toLowerCase()
        let uppername=rolechange.newuser.key[0].toUpperCase()
        rolename.push([rolechange.newuser.value,uppername+Lowername])
        rolename.sort((a,b)=>{
            return a[0]-b[0]
        })
        userList.forEach(item=>{
            if (item.role===oldvalue) {
                item.role=rolechange.newuser.value
            }
        })
        RoleJurisdiction[rolechange.newuser.value]=rolechange.newuser.jurisdiction;
        let currentuser=userList.filter(item=>{
            return item.username===rolechange.currentuser.username
        })[0]
        res.status(200)
        res.json({
            code:200,
            success:true,
            RoleJurisdiction:RoleJurisdiction,
            rolename:rolename,
            currentuser:currentuser
        })
    })
    app.post('/role/delete',async(rep,res,next)=>{
        let deleterole=rep.body.value
        delete RoleJurisdiction[deleterole];
        for (let i = 0; i < rolename.length; i++) {
            if(rolename[i][0]===deleterole){
                rolename.splice(i,1)
            }
        }
        for (let j = 0; j < userList.length; j++) {
            if(userList[j].role===deleterole){
                userList.splice(j,1)
            }
        }
        res.status(200)
        res.json({
            code:200,
            success:true,
            RoleJurisdiction:RoleJurisdiction,
            rolename:rolename
        })
    })
    app.get('/personal/:user',async(rep,res,next)=>{
        let username=rep.params.user
        //使用用户名获取密码和职业
        let userPNR=userList.filter(item =>{
            return item.username===username
        })[0]
        //获取角色映射信息
        let rolenames=rolename
        //获取用户手机号等信息
        let userinfo=userinfos[username]
        res.status(200)
        res.json({
            code:200,
            success:true,
            userPNRs:userPNR,
            rolenames:rolename,
            userinfo:userinfo,
        })
    })
    app.post('/personal/changeinfo',async(rep,res,next)=>{
        let allinfo=rep.body
        for (const key in allinfo.info) {
            userinfos[allinfo.name][key]=allinfo.info[key]
        }
        let userinfo=userinfos[allinfo.name]
        res.status(200)
        res.json({
            code:200,
            success:true,
            userinfo:userinfo,
        })
    })
    app.post('/personal/changepass',async(rep,res,next)=>{
        let namepass=rep.body
        let newuserNPR
        for (const key in userList) {
            if (userList[key].username===namepass.username) {
                userList[key].password=namepass.newpassword
                newuserNPR=userList[key]
                break;
            }
        }
        res.status(200)
        res.json({
            code:200,
            success:true,
            userPNRs:newuserNPR,
        })
    })
    app.get('/global/:user',async(rep,res,next)=>{
        let username=rep.params.user
        //获取用户手机号等信息
        let userinfo=userinfos[username];
        res.status(200)
        res.json({
            code:200,
            success:true,
            userinfo:userinfo,
        })
    })
    
    app.post('/cropperimage/:user',upload.single ( 'avatar' ),async(rep,res,next)=>{
        let username=rep.params.user
        let newimage=rep.body.image
        userinfos[username].image=newimage
        res.status(200)
        res.json({
            code:200,
            success:true,
        })
     })
     app.post('/customUpload/image',upload.array( 'images' ),async(rep,res,next)=>{
        if(rep.body.image){
            res.status(200)
            res.json({
                code:200,
                errno: 0, // 注意：值是数字，不能是字符串
                data: {
                    url: rep.body.image, // 图片 src ，必须
                    alt: "yyy", // 图片描述文字，非必须
                    href: "", // 图片的链接，非必须
                }
            })
        }
     })
     app.post('/customUpload/video',upload.array('video'),async(rep,res,next)=>{
        console.log(rep.files[0]);
        if(rep.files[0]){
            res.status(200)
            res.json({
                code:200,
                errno: 0, // 注意：值是数字，不能是字符串
                data: {
                    url: rep.files[0], // 图片 src ，必须
                }
            })
        }else{
            res.status(200)
            res.json({
                code:200,
                errno: 1, // 只要不等于 0 就行
                message: "失败信息",
            })
        }
     })
}