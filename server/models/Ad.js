const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    link: { type: String },
  }]
})

module.exports = mongoose.model('Ads', schema)