import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// verify user here using the token variable which was previously used for user

// api to verify user
const middleware =  async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success: false, message: "Wrong Token"})
        }

        const user = await User.findById({_id: decoded.id})

        if(!user){
            return res.status(401).json({success: false, message: "User Not Found"})
        }
        const newUser = {name: user.name, id: user._id}
        req.user = newUser
        next()
    } catch(error){
        return res.status(500).json({success: false, message: "Please Login"})
    }
}

export default middleware