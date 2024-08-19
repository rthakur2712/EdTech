const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file,folder,height,quality) => {
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.deleteResourcesFromCloudinary = async (url) => {
    console.log("url",url);
    if (!url) {
        return;
    }
    try {
        const result = await cloudinary.uploader.destroy(url);
        console.log("Image deleted from cloudinary", result);
        return result;
    } catch (error) {
        console.error("Error occurred while deleting image from cloudinary", error);
        throw error;
    }
}