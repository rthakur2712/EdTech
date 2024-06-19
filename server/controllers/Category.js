const Category = require('../models/Category');

// create category handler function
exports.createCategory = async (req, res) => {
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        const categoryDetails = await Category.create({name:name,description:description});
        console.log(categoryDetails);
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }catch(error){
        console.log("Error occured while creating Category",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// get all category handler function
exports.showAllCategory = async(req,res) =>{
    try{
        const categories = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            categories:categories
        })
    }catch(error){
        console.log("Error occured while fetching categories",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}