import jwt from "jsonwebtoken"


export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        return res.status(401).send({
            success: false,
            message: "User isn't logged in"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.Status(403).send({
                success: false,
                message: "Invalid user"
            })
        }

        req.user = user;
        next();
    });

}