const category_model=require("../models/category.model")

exports.createnewcategory=async (req,res)=>{
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }

    try{
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }
    catch(err){
        console.log("error while creating the category",err)
        return res.status(500).send({
            message:"error while creating the category"
        })
    }
}
