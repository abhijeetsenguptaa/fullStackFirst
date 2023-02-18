const {UsersModel} = require('../models/users.model');


const emailChecker = async(req,res,next) => {
    const {email} = req.body;

    try{
        const data = await UsersModel.find({email});
        if(data.length == 0){
            next();
        }else{
            res.send({"msg":"Email-id already registered"});
        }
    }catch{
        res.send({"msg":"Error while checking Users..."})
    }
}

module.exports = {emailChecker};