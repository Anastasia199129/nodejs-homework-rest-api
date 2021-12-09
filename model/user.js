const { Schema, model, SchemaTypes } = require('mongoose')
const joi = require('joi')

const userSchema = Schema ({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  
  avatarURL:{
  type: String,
  
  },
   verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })

const joySchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()

})

const User = model('user', userSchema)

module.exports = {
    User,
    joySchema
}