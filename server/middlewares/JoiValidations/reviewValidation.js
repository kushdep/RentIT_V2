import Joi from 'joi'

export function newReviewValidation(req, res, next) {
    try {
        const reviewSchema = Joi.object({
            locId: Joi.string().required(),
            stars: Joi.number().min(0).max(5),
            review: Joi.string().required()
        })
        const result = reviewSchema.validate(req.body)
        if (result.error) {
            console.log(result.error)
            return res.status(400).send({
                success: false,
                errors: result.error.details
            })
        }
        next()
    } catch (error) {
        console.log("ERROR IN newReviewValidation()- " + error)
    }

} 
