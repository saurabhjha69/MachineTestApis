import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME,
    api_key:process.env.APIKEY, 
    api_secret: process.env.APISECRET
  });


export const cloudinaryImageUploader = async (imageUrl)=> {
    try {
        const result = await cloudinary.uploader.upload(imageUrl)
        return {result}
    } catch (error) {
        return {error: "Failed to Upload!",description: error.message}
    }

}