import Location from '../models/location.js'

export const getAllLocs = async (req, res) => {
    try {
        const rentLocs = await Location.find()
        if(rentLocs.length===0){
            return res.status(204).send({
                success:false,
                message:"No Rent Locations Data"
            })
        }
        return res.status(200).send({
            success:true,
            data:rentLocs,
            message:'Rent Locations Data fetched'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}