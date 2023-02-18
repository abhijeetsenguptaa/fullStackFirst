const mongoose = require('mongoose');



const usersSchema = mongoose.Schema({
    "name":String,
    "email":String,
    "password":String,
    "dob":String
},{
    versionKey : false
})


const UsersModel = mongoose.model('users',usersSchema);


module.exports = {UsersModel};