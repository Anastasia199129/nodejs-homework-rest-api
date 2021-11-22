const fs = require('fs/promises')
const path = require('path')
const Unauthorized = require('http-errors')
const { User } = require('../../model')

const avatarDir = path.join(__dirname, "../../public/avatars")

const updateAvatarController = async (req, res) => {
  const { _id } = req.user
  const strId = String(_id)
    const { path: tempUpload, originalname } = req.file
  try {
    const resultUpload = path.join(avatarDir, strId, `${strId}_${originalname}`)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join("/avatars", strId, `${strId}_${originalname}`)
    const user = await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
    if (!user) {
      throw new Unauthorized('Not authorized')
    }
    const {avatarURL} = user
    res.status(200).json({avatarURL})
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}



module.exports = updateAvatarController
