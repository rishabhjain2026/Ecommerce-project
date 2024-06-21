const mongoose=require("mongoose")
const express=require("express")

const app=express()

const server_config=require("./config/server_congig")

const db_config=require("./config/db_config")
const userModel = require("./models/user.model")


const bcrypt=require("bcryptjs")

app.use(express.json())


mongoose.connect(db_config.DB_URL)
const db=mongoose.connection

db.on("error",()=>{
    console.log("error while connecting to mongodb")
})
db.once("open",()=>{
    console.log("connected to mongodb")
    init()
})


async function init(){
    let user=await userModel.findOne({userId:"admin"})

    if(user){
        console.log("admin is already present")
        return
    }

    try{
        user=await userModel.create({
            name:"ashmita",
            userId:"admin",
            email:"ashmita@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("welcome1",8)
        })
        console.log("admin created",user)
    }
    catch(err){
        console.log(err)
    }
}

require("./routers/auth.routes")(app)
require("./routers/category.routers")(app)


app.listen(server_config.PORT,()=>{
    console.log("server started at port:",server_config.PORT)
})

