const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    account:{type:String},
    password:{type:String},
    username:{type:String},
    avatar:{type:String},
    QR:{type:String}
})

module.exports=mongoose.model('Users',schema)