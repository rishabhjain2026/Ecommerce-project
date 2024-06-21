const bcrypt=require("bcryptjs")

const userModel=require("../models/user.model")

const jwt=require("jsonwebtoken")

const secret=require("../config/auth.config")

exports.signup=async(req,res)=>{

    const request_body=req.body

    const userobj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created=await userModel.create(userobj)

        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }

        res.status(201).send(res_obj)
    }
    catch(err){
        console.log("error while registering the user",err)
        res.status(500).send({
            message:"some error occure while registering the user"
        })
    }

}




exports.signin=async(req,res)=>{
    const user=await userModel.findOne({userId:req.body.userId})
    if(user==null){
        return res.status(400).send({
            message:"user id is not valid"
        })
    }

    const isvalidpassword=bcrypt.compareSync(req.body.password,user.password)
    if(!isvalidpassword){
        res.status(401).send({
            message:"password is incorrect"
        })
    }

    const token=jwt.sign({id:user.userId},secret.secret,{
        expiresIn:120
    })

    res.status(200).send({
        name:user.name,
        userId:user.userId,
        emsil:user.email,
        userType:user.userType,
        accesstoken:token
    })

}

