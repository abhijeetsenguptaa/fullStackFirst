const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config()

const authentication = (req,res,next) => {
    const token = req.headers.authorization;

    if(token){
        jsonwebtoken.verify(token,process.env.key,(err,decode)=>{
            if(decode){
                const userID = decode.userID;
                req.body.userID = userID;
                next();
            }else{
                res.send({"msg":"Something went Wrong"});
            }
        })
    }else{
        res.send({'msg':'This is a protected Route'});
    }
}

module.exports = {authentication};