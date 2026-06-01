import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Chat from '../models/Chat.js'



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// SignUp User 
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const normalizedEmail = email.trim().toLowerCase()
        const userExists = await User.findOne({email: normalizedEmail})

        if (userExists) {
            return res.json({success: false, message: "User already exists"})
        }

        const user = await User.create({name, email: normalizedEmail, password})
        const token = generateToken(user._id)
        return res.json({success: true, token})

    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({email: email.trim().toLowerCase()})

        if (!user) {
            return res.json({success: false, message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success: false, message: "Invalid email or password"})
        }

        const token = generateToken(user._id)

        return res.json({success: true, token})

    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}


// Get user data
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.json({success: true, user})
    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}



// Get the Publised Images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            {$unwind : "$messages"},
            {
                $match : {
                    "messages.isImage" : true,
                    "messages.isPublished" : true
                }
            },
            {
                $project : {
                    _id : 0,
                    imageUrl : '$messages.content',
                    userName : '$userName'
                }
            }
        ])

        res.json({ success: true, images: publishedImageMessages.reverse() })

    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}