
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

//将schema转换为Model
//该方法的第一个参数为ModelName，第二个参数为 要转换的schema
module.exports = mongoose.model('User',usersSchema);
