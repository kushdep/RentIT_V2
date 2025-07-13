import Joi from 'joi'

export function newLocValidation(req, res, next) {
    const locSchema = Joi.object({
        locType: Joi.string().required(),
        locDtl: Joi.object({
            title: Joi.string().required(),
            images: Joi.array().items(
                Joi.object({
                    title: Joi.string().required(),
                    url: Joi.string().required(),
                    filename: Joi.string().required(),
                }),
            ),
            price: Joi.number().required(),
            description: Joi.string().required(),
            facilities: Joi.array().items(
                Joi.object({
                    title: Joi.string().required(),
                    ammenities: Joi.array().items(Joi.string())
                })    
            ).required(),
            location:Joi.string().required()
        }).required()
    })

    const result = locSchema.validate(req.body)
    if (result.error) {
        console.log(result.error)
        return res.status(400).send({
            success: false,
            errors: result.error.details
        })
    }
    next()
} 
