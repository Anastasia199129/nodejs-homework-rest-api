const fs = require('fs/promises')
const { User } = require('../../model')
const { Conflict } = require('http-errors')
const bcript = require('bcryptjs')
const gravatar = require('gravatar')
const path = require('path')
const avatarDir = path.join(__dirname, "../../public/avatars")


// 
const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
          throw new Conflict({message: "Email in use"})
        }
        const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10))
        const avatar = gravatar.url(email)

        const newUser = await User.create({ email, password: hashPassword, avatarURL: avatar })
        const avatarFolder = path.join(avatarDir, String(newUser._id))
        console.log(avatarFolder);
        await fs.mkdir(avatarFolder)
        res.status(201).json({
            status: 'Created',
            code: 201,
            data: {
                user: {
                email,
                    subscription: "starter",
                    avatarURL: avatar
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = registerController