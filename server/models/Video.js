const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    categories:{type:String},
    title:{type:String},
    date:{type:String},
    image:{type:String},
    link:{type:String},
    body:{type:String},
    page:{type:Number},
    play:{type:Number},
    like:{type:Number},
    collect:{type:Number}
})

module.exports=mongoose.model('Video',schema)