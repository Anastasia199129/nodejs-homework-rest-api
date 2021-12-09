const { User } = require('../../model')
const { Unauthorized, NotFound, BadRequest } = require('http-errors')
const bcript = require('bcryptjs')
const jvt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const loginController = async(req, res, next)=> {
    try {
        const { email, password } = req.body
         const compareResult = bcript.compareSync(password, user.password)
        const user = await User.findOne({ email })
        console.log(user.verify);
        if (!user || !user.verify || !compareResult) {
            throw new NotFound('Email or password is wrong')
        }
       
        const payload = {
            id: user._id
        }
        const token = jvt.sign(payload, SECRET_KEY, {expiresIn: '1h'} )
        await User.findByIdAndUpdate(user._id, {token})

        res.json({
        status: 'Ok',
        code: 200,
        data:  {
             token,
             user: {
               email,
               subscription: "starter" 
            }}
        })

     
    } catch (error) {
        next(error)
    }
}

module.exports = loginController