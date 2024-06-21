
const usermodel=require("../models/user.model")

const jwt=require("jsonwebtoken")

const auth_config=require("../config/auth.config")

const verifysignupbody=async(req,res,next)=>{
    try{

        if(!req.body.name){
            return res.status(400).send({
                message:"failes name was not provided"
            })
        }

        if(!req.body.email){
            return res.status(400).send({
                message:"failed email was not provided"
            })
        }

        if(!req.body.userId){
            return res.status(400).send({
                message:"failed : user id was not provided"
            })
        }

        const user=await usermodel.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message:"user already present with the same user id"
            })
        }

    }
    catch(err){
        console.log("failed to load")
        res.status(500).send({
            message:"errror occured"
        })
    }
}


const verifysiginpbody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"userid is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message:"password is not provided"
        })
    }
    next()

}


const verifytoken=(req,res,next)=>{
    const token=req.header("x-access-token")
    if(!token){
        return res.status(403).send({
            message:"no token found:unauthorized"
        })
    }

    jwt.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"UNAUTHORIZED"
            })
        }
        const user=await usermodel.findOne({userId:decoded.id})

        if(!user){
            return res.status(400).send({
                message:"UNAUTHORIZED,this user for this token does not exist"
            })
            req.user=user
            next()
        }
    })
}

const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"only admin user are allowed to access this endpoint"
        })
    }
}


module.exports={
    verifysignupbody:verifysignupbody,
    verifysiginpbody:verifysiginpbody,
    verifytoken:verifytoken,
    isAdmin:isAdmin
}