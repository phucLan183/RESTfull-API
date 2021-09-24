const yup = require('yup');

const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).max(12).required()
})

module.exports = { userSchema }