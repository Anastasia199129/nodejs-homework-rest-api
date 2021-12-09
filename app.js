const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
//
const nodemailer = require('nodemailer')
// //require('dotenv').config()
// const { META_PASSWORD } = process.env
// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'loseva1991@meta.ua',
//     pass: META_PASSWORD
//   }
// }
 
// const transporter = nodemailer.createTransport(nodemailerConfig)


const { DB_HOST } = process.env
console.log(DB_HOST);

mongoose.connect(DB_HOST).then(() => {
  console.log("Database connection successful");
}).catch(err => {
console.log(err.message)
process.exit(1)
})

const { contactsRouter } = require('./routes/api')
const { authRouter } = require('./routes/api')


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter )
app.use('/api/contacts', contactsRouter)


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({message})
})

module.exports = app
