import User from '../models/user.js'

export const addLocation = async(req,res) => {
    console.log(req.body)
    const user = User.findOne({})
    res.send("DONE")
}


