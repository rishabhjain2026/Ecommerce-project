const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        minLength:10,
        required:true,
        unique:true,
        lowerCase:true
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]
    }
    
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("user",userschema)