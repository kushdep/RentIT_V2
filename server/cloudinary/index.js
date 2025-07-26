import { v2 as cloudinary } from 'cloudinary'
import { request } from 'express';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


export async  function imageUpload(req, res, next) {
    try {
        const { imgTtlData:uploadImg } = req.body.locDtl 
        console.log(req.body)
        for (const e of uploadImg) {
            const uploadResults = await Promise.all(
                e.images.map(async (i) => {
                    const result = await cloudinary.uploader.upload(i,{
                        folder:"Rent-IT_V2"
                    });
                    const path = result.url.split('Rent-IT_V2/')
                    return {
                        url:result.url,
                        filename:'Rent-IT_V2/'+path[1],
                    };
                })
            );
            e.images=uploadResults
            console.log(e.title+" "+JSON.stringify(e.images))
        }
        console.log("uploadImg data "+JSON.stringify(uploadImg))
        req.body.locDtl.imgTtlData = uploadImg
        console.log("image title data "+JSON.stringify(req.body.locDtl.imgTtlData))
        console.log(req.body)
        next()
    } catch (error) {
        console.log("ERROR IN imageUpload()- " + error)
    }
}



