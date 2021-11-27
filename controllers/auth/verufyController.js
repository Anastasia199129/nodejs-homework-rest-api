const {User} = require('../../model')
const {NotFound}= require('http-errors')

const verufyController = async (req, res, next) => {
  try {
      const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    const id = user._id
    if (!user) {
        throw new NotFound('User not found')
    }
    await User.findByIdAndUpdate(id, { verificationToken: null, verify: true })
    res.status(200).json({
         status: 'Ok',
        code: 200,
        data: {
        message: 'Verification successful',
    }
    }
    )  
  } catch (error) {
      next(error)
  }
}

module.exports=verufyController