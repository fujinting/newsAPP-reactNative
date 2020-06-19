const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    categories:{type:String},
    website:{type:String},
    title:{type:String},
    image:{type:String},
    date:{type:String},
    body:{type:String},
    page:{type:Number},
    read:{type:Number},
    like:{type:Number},
    collect:{type:Number}
})

module.exports=mongoose.model('News',schema)