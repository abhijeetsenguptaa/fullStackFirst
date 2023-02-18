const express = require('express');
const {UsersModel} = require('../models/users.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const  {emailChecker} = require('../middlewares/emailChecker.middleware');
const { authentication } = require('../middlewares/authentication.middleware');

const usersRouter = express.Router();

usersRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await UsersModel.find({email});
        if(user.length==1){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jsonwebtoken.sign({userID:user[0]._id},process.env.key,{expiresIn:'1hr'});
                    res.send({'msg':'Login In','token':token})
                }else{
                    res.send({'msg':'Wrong Credentials'})
                }
            })
        }
    }catch{
        res.send({'msg':"User not found"})
    }
})

usersRouter.use(emailChecker);
usersRouter.post('/register',async(req,res)=>{
    const {name,email,password,dob} = req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Error while encrypting the password"})
            }else{
                const user = new UsersModel({name,email,password:hash,dob});
                await user.save();
                res.send({"msg":"New user has been registered"})
            }
        })
    }catch{
        res.send({'msg':'Error while registering the new user'})
    }
})

usersRouter.use(authentication);
usersRouter.get('/',async(req,res)=>{
    try{
        const data = await UsersModel.find();
        res.send(data);
    }catch{
        res.send({'msg':'Something went wrong'});
    }
})

module.exports = {usersRouter}