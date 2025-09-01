import Joi from 'joi'

export function contactUsValidation(req, res, next) {
    try {
        const contactUsSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.email().required(),
            contactNo: Joi.number().integer().required(),
            query: Joi.string().required()
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
