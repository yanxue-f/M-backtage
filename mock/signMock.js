import Mock from "mockjs"
    
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
    1:{
        all:true,
        manageall:true,
        edit:true,
        delete:true,
        view:true,
    },
    2:{
        all:false,
        manageall:false,
        view:true,
        edit:true,
        delete:true,
    },
    10:{
        all:false,
        manageall:false,
        edit:false,
        delete:false,
        view:false,
    }
}
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
    userinfos[item.username].image=`./src/static/asadsa.png`
    i++
});
console.log();
Mock.mock(RegExp('/Publickey' + ".*"), {
    code:200,
    success:true,
    Publickey:'asdasdasd'
})
Mock.mock("/login",'post', function (options){
    let userinfo=JSON.parse(options.body)
    
    let cunz= userList.filter((item)=>{
        return item.username===userinfo.username && item.password===userinfo.userpassword
    })[0]
    if(cunz){
        return {
            code:200,
            success:true,
            result:{
                token:'asdasdsad',
                jurisdiction:RoleJurisdiction[cunz.role],
            }
        }
    }else{
        return {
            code:200,
            success:false,
            error:'密码错误'
        }
    }
})
Mock.mock('/getusers', {
    code:200,
    success:true,
    list:userList,
    usermould:usertemplate,
    roles:rolename,
    roleJurisdiction:RoleJurisdiction
})
//获取要编辑的用户
Mock.mock(RegExp('/useList' + ".*"),function (options){
    let username=options.url.split('/')[2]
    let cunz= userList.filter(item=>{
        return item.username===username
    })[0]
    return {
        code:200,
        success:true,
        currentuser:cunz
    }

})
Mock.mock(RegExp('/judge' + ".*"),function (options){
    let username=options.url.split('/')[2]
    let cunz= userList.filter(item=>{
        return item.username===username
    })[0]
    if(!cunz){
        //要添加的用户名不存在
        /**
         * 获取用户名，
         *  采用非对称加密生成公钥和私钥
         * 并采用hash加密后的用户名为文件名将公钥私钥保存起来
         * 将公钥发送回去
         */
        return {
            code:200,
            success:true,
            Publickey:'qqwweqweasd'
        }
    }else{
        return {
            code:200,
            success:false,
            error:'当前用户名已存在请重新输入'
        }
    }

})
Mock.mock("/userList/add",'post', function (options){
    let newuser=JSON.parse(options.body)
    let pushuser={}
    for (const key in usertemplate) {
        pushuser[key]=newuser[key]
    }
    //从以hash加密后的用户名为文件名的文件内获取私密将密码加密....省略
    userList.push(pushuser)
    return {
        code:200,
        success:true,
        list:userList,
    }
    
})
Mock.mock("/userList/edit",'post', function (options){
    let edituser=JSON.parse(options.body)
    for (let i = 0; i < userList.length; i++) {
        if(userList[i].username===edituser.oldname){
            userList[i]=edituser.newuser
            break
        }
    }
    return {
        code:200,
        success:true,
        userlist:userList
    }
    
})
Mock.mock(RegExp('/userList/delete' + ".*"),function (options){
    let deleteuser=options.url.split('/')[3]
    let cunz= userList.some((item)=>{
        return item.username===deleteuser
    })
    if(cunz){
        for (let i = 0; i < userList.length; i++) {
            if(userList[i].username===deleteuser){
                userList.splice(i,1)
            }
        }
        return {
            code:200,
            success:true,
            userlist:userList
        }
    }else{
        return {
            code:200,
            success:false,
            error:'当前用户名不存在'
        }
    }
})

Mock.mock(RegExp('/role/info' + ".*"),function (options){
    let currentusername=options.url.split('/')[3]
    let currentuser=userList.filter(item=>{
        return item.username===currentusername
    })[0]
    if(currentuser){
        
        return {
            code:200,
            success:true,
            rolelist:RoleJurisdiction,
            current:currentuser,
            rolename:rolename,
            role:{
                all:false,
                manageall:false,
                edit:false,
                delete:false,
                view:false,}
        }
    }else{
        return {
            code:200,
            success:false,
            error:'当前用户名不存在'
        }
    }
})
Mock.mock("/role/add",'post', function (options){
    let roleobj=JSON.parse(options.body)
    let Lowername=roleobj.key.slice(1).toLowerCase()
    let uppername=roleobj.key[0].toUpperCase()
    rolename.push([roleobj.value,uppername+Lowername])
    rolename.sort((a,b)=>{
        return a[0]-b[0]
    })
    RoleJurisdiction[roleobj.value]=roleobj.jurisdiction
    return {
        code:200,
        success:true,
        rolelist:RoleJurisdiction,
        rolename:rolename,
    }
    
})
Mock.mock("/role/edit",'post', function (options){
    let rolechange=JSON.parse(options.body)
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
    return {
        code:200,
        success:true,
        rolelist:RoleJurisdiction,
        rolename:rolename,
        currentuser:currentuser
    }
    
})
Mock.mock("/role/delete",'post', function (options){
    let deleterole=JSON.parse(options.body.value)
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
    return {
        code:200,
        success:true,
        rolelist:RoleJurisdiction,
        rolename:rolename
    }
    
})

Mock.mock(RegExp('/personal' + ".*"),function (options){
    let username=options.url.split('/')[2]
    //使用用户名获取密码和职业
    let userPNR=userList.filter(item =>{
        return item.username===username
    })[0]
    //获取角色映射信息
    let rolenames=rolename
    //获取用户手机号等信息
    let userinfo=userinfos[username]
    return {
        code:200,
        success:true,
        userPNRs:userPNR,
        rolenames:rolename,
        userinfo:userinfo,
    }
})
Mock.mock("/personal/changeinfo",'post', function (options){
    let allinfo=JSON.parse(options.body)
    for (const key in allinfo.info) {
        userinfos[allinfo.name][key]=allinfo.info[key]
    }
    let userinfo=userinfos[allinfo.name]
    return {
        code:200,
        success:true,
        userinfo:userinfo,
    }
    
})
Mock.mock("/personal/changepass",'post', function (options){
    let namepass=JSON.parse(options.body)
    let newuserNPR
    for (const key in userList) {
        if (userList[key].username===namepass.username) {
            userList[key].password=namepass.newpassword
            newuserNPR=userList[key]
            break;
        }
    }
    return {
        code:200,
        success:true,
        userPNRs:newuserNPR,
    }
    
})
Mock.mock(RegExp('/global' + ".*"),function (options){
    let username=options.url.split('/')[2]
    //获取用户手机号等信息
    let userinfo=userinfos[username];
    return {
        code:200,
        success:true,
        userinfo:userinfo,
    }
})

Mock.mock(RegExp('/cropperimage' + ".*"),'post', function (options){
    let username=options.url.split('/')[2]
    let newimage=options.body.get('image')
    userinfos[username].image=newimage
    return {
        code:200,
        success:true,
    }
})
Mock.mock("/customUpload/image",'post', function (options){
    if(options.body.get('image')){
        return {
            code:200,
            errno: 0, // 注意：值是数字，不能是字符串
            data: {
                url: options.body.get('image'), // 图片 src ，必须
                alt: "yyy", // 图片描述文字，非必须
                href: "", // 图片的链接，非必须
            }
        }
    } 
})
Mock.mock("/customUpload/video",'post', function (options){
    if(options.body.get('video')){
        return {
            code:200,
            errno: 0, // 注意：值是数字，不能是字符串
            data: {
                url: options.body.get('video'), // 图片 src ，必须
            }
        }
    }else{
        return {
            code:200,
            errno: 1, // 只要不等于 0 就行
            message: "失败信息",
        }
    }
})
