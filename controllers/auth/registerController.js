const fs = require('fs/promises')
const { User } = require('../../model')
const { Conflict } = require('http-errors')
const bcript = require('bcryptjs')
const gravatar = require('gravatar')
const path = require('path')
const avatarDir = path.join(__dirname, "../../public/avatars")
const { nanoid } = require('nanoid')
const { sendMail }= require('../../helpers')


// 
const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
          throw new Conflict({message: "Email in use"})
        }
        const verificationToken = nanoid()
        const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10))
        const avatar = gravatar.url(email)

        const newUser = await User.create({ email, password: hashPassword, avatarURL: avatar, verificationToken })
        const avatarFolder = path.join(avatarDir, String(newUser._id))
        await fs.mkdir(avatarFolder)

         const mail = {
              to: email,
              from: 'loseva1991@meta.ua',
              subject: "Confirmation of registration",
              text: `<a href="http://localhost:3000/api/auth/varify/${verificationToken}">click to confirm email</a>`,
        }
        
        await sendMail(mail)
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