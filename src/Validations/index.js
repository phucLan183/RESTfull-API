const yup = require('yup');

const userSchema = yup.object().shape({
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
  config_id: yup.string().required(),
  color_id: yup.string().required(),
  category_id: yup.string().required(),
})
module.exports = { userSchema, productSchema }