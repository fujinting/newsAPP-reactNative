const express=require("express")

const app=express()

app.use(require('cors')())      //允许跨域

app.use(express.json())         //使用await

app.use('/uploads',express.static(__dirname+'/uploads'))  //静态文件托管

require('./plugins/db')(app)      //引用  （连接并创建好了数据库）

require('./routes/admin')(app)      //引用路由

require('./routes/app')(app)

app.listen(3000,()=>{
    console.log( 'App Listening on port 3000');
 })