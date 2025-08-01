import Joi from 'joi'

export function newLocValidation(req, res, next) {
    try {
        const locSchema = Joi.object({
            locType: Joi.string().required(),
            locDtl: Joi.object({
                title: Joi.string().required(),
                imgTtlData: Joi.array().items(Joi.object({
                    title:Joi.string(),
                    images:Joi.array()
                })).required(),
                price: Joi.number().required(),
                description: Joi.string().required(),
                facilities: Joi.array().items(
                    Joi.object({
                        id: Joi.number().required(),
                        title: Joi.string().required(),
                        ammenities: Joi.array().items(Joi.object({
                            id: Joi.number().required(),
                            name: Joi.string()
                        }))
                    })
                ).required(),
                location: Joi.object({
                    address:Joi.string().required(),
                    coordinates:Joi.object({
                        longitude:Joi.number(),
                        latitude:Joi.number()
                    }).required()
                }).required()
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
    } catch (error) {
        console.log("ERROR IN newLocValidation()- "+error)
    }

} 
