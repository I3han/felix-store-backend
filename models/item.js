const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type:String, required: true},
  des: { type:String, required: true},
  price: {  type:String, required: true },
  stock: {  type:String, required: true },
});

//creating a model
module.exports = mongoose.model('Item', itemSchema);
