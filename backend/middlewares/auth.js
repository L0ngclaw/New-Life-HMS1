import jwt from 'jsonwebtoken'
import User from "../models/user";

export const checkUser = (req, res, next) => {
    if (req.body.userId) {
        return res.status(401).json({
            message: 'I can see you.',
        })
    }

    const tokenString = req.headers.authorization

    if (!tokenString) {
        return res.status(401).json({
            message: 'No token provided Please login again',
        })
    }

    const token = tokenString.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'No token provided Please login again',
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null)

    if (decoded) {
        User.findOne({
            _id: decoded._id,
        })
            .then(user => {
                if (user) {
                    req.body.userId = decoded._id
                    req.body.user = user
                    next()

                } else {
                    return res.status(200).json({
                        message: 'User not found',
                    })
                }
            })


    } else {
        return res.status(500).json({
            message: 'Authorization failed',
        })
    }
}

