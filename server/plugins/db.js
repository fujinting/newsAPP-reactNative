module.exports=app=>{

    const mongoose=require("mongoose")      //引用mongoose

    mongoose.connect('mongodb://127.0.0.1:27017/rn-news-app',{        //连接了芒果，创建了node-vue-moba数据库
        useNewUrlParser:true,
        useUnifiedTopology:true
    })




}