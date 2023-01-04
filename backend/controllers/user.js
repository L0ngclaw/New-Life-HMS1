import User from '../models/user'
import jwt from 'jsonwebtoken'

export const authUser = async (req, res) => {
    let {email, role} = req.body

    const user = await User.findOne({email})

    if (user) {
        return sendUserLoginSuccessResponse(res, user, 'loggedIn')
    } else {
        const newUser = new User({
            email: email,
            role: role,
        })

        await User.create(newUser)
            .then(createdUser => {
                sendUserLoginSuccessResponse(res, createdUser, 'registered')
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error creating user',
                    err,
                })
            })
    }


}

const sendUserLoginSuccessResponse = (res, user, fn) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    }, null)

    const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null)


    if (user._id.toString() === decoded._id) {
        return res.status(200).json({
            message: `${fn === 'registered' ? 'User registered successfully' : 'User logged in successfully'}`,
            login: fn !== 'registered',
            user:
                {
                    email: user.email,
                    role: user.role,
                },
            token,
        })
    } else {
        return res.status(500).json({
            message: 'Error creating user',
        })
    }
}


export const checkIfRegistered = (req, res) => {
    const {email} = req.body

    User.findOne({email})
        .then(user => {
            if (user) {
                return res.status(200).json({
                    message: 'User registered',
                    registered: true,
                })
            } else {
                return res.status(200).json({
                    message: 'User not registered',
                    registered: false,
                })
            }
        })
}

export const getUser = (req, res) => {
    const {userId} = req.body

    User.findOne({
        _id: userId,
    })
        .then(user => {
            if (user) {
                return res.status(200).json({
                    message: 'User found',
                    user,
                })
            } else {
                return res.status(200).json({
                    message: 'User not found',
                })
            }
        })
}
