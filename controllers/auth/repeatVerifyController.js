const { User } = require('../../model')
const { sendMail } = require('../../helpers')
const {NotFound, BadRequest} = require('http-errors')

const repeatVerifyController = async (req, res, next) => {
   try {
      const { email } = req.body
    if (!email) {
       throw new NotFound("missing required field email")
    }
    const user = await User.findOne({ email })
    if (!user) {
           throw new NotFound("missing required field email");
    }
    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: "Confirmation of registration",
        text: `<a href="http://localhost:3000/api/auth/varify/${user.verificationToken}">Click to confirm email</a>`,
    }
    await sendMail(mail)
    res.json(
        {
        Status: 'Ok',
        code: 200,

      data: {
                message: "Verification email sent"
            }
        })  
   } catch (error) {
       next(error)
   }
}

module.exports = repeatVerifyController