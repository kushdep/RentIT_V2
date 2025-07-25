import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Rent-IT_V2',
        allowedFormats: ['jpeg', 'png', 'jpg','svg']
    }
})

export function imageUpload(req,res,next){
    try {
        const upload = multer({ storage })
        const {imgTtlData} = req.body
        imgTtlData.map((e)=>{
            upload.array('images')
        })
        upload.array('images')
    } catch (error) {
        console.log("ERROR IN imageUpload()- "+error)
    }
}



