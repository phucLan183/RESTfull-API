const yup = require('yup');

const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).max(12).required()
})


const productSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  sale: yup.number().max(100).required(),
  content: yup.string().required(),
  stock: yup.number().required(),
})
module.exports = { userSchema, productSchema }