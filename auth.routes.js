//localhost:8888/ecomm/api/v1/auth/signup

const authcontroller=require("../controllers/auth.controller")

const authmiddleware=require("../middelware/auth.middleware")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authmiddleware.verifysignupbody],authcontroller.signup)


    app.post("/ecomm/api/v1/auth/signin",[authmiddleware.verifysiginpbody],authcontroller.signin)


}