
// post localhost:8888/ecomm/api/v1/auth/categories


category_controller=require("../controllers/category.controller")

auth_mw=require("../middelware/auth.middleware")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifytoken,auth_mw.isAdmin],category_controller.createnewcategory)
}