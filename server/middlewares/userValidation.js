import Joi from 'joi'

export function validateUser(req, res, next) {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        otp:Joi.number().required()
    })
    const result = userSchema.validate(req.body)
    console.log(result)
    if (result.error) {
        console.log(result.error)
        return res.status(400).send({
            success: false,
            errors: result.error.details
        })
    }
    next()
}

