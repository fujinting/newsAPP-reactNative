const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  website:{type:String},
  title: { type: String },
  date:{ type:String},
  items: [{
    image: { type: String },
    text: { type: String },
    page:{type:Number},
    read:{type:Number},
    like:{type:Number},
    collect:{type:Number},
    
  }],
  page:{type:Number},
  read:{type:Number},
  like:{type:Number},
  collect:{type:Number}
})

module.exports = mongoose.model('Atlas', schema)