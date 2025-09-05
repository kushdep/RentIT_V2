import Joi from 'joi'

export function contactUsValidation(req, res, next) {
    try {
        const contactUsSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNo: Joi.number().integer().required(),
            message: Joi.string().required(),
            locAuthEmail:Joi.string(),
            locAuthName:Joi.string(),
            name:Joi.string(),
            prptrSpecific:Joi.boolean().required(),
            locName:Joi.string(),
            locId:Joi.string(),
            locAddress:Joi.string(),
        })
        const result = contactUsSchema.validate(req.body)
        if (result.error) {
            console.log(result.error)
            return res.status(400).send({
                success: false,
                errors: result.error.details
            })
        }
        next()
    } catch (error) {
        console.log("ERROR IN contactUsSchema()- " + error)
    }

} 
