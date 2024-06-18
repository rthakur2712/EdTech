const Tag = require("../models/Tags");

// create tag handler function
exports.createTag = async (req, res) => {
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        const tagDetails = await Tag.create({name:name,description:description});
        console.log(tagDetails);
        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    }catch(error){
        console.log("Error occured while creating tag",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// get all tags handler function
exports.showAllTags = async(req,res) =>{
    try{
        const tags = await Tag.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            tags:tags
        })
    }catch(error){
        console.log("Error occured while fetching tags",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}