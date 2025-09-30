const mongoose = require('mongoose');
const AppSchema = new mongoose.Schema({
  title:{ type:String, required:true },
  description:String,
  category:String,
  iconUrl:String,
  apkUrl:String,
  screenshots:[String],
  downloads:{ type:Number, default:0 },
  createdAt:{ type:Date, default:Date.now }
});
module.exports = mongoose.model('App', AppSchema);
