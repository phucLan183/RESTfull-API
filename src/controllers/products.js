const ProductsModel = require('../models/Products');
const ColorModel = require('../models/Color');
const ConfigModel = require('../models/Config');
const CategoriesModel = require('../models/Categories')

const getAllProducts = async (req, res) => {
  try {
    const productData = await ProductsModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: productData
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const crateProduct = async (req, res) => {
  try {
    const { title, description, price, sale, image, color, config, category, isNew, content, stock } = req.body
    const newProduct = new ProductsModel({
      title: title,
      description: description,
      price: price,
      sale: sale,
      color_id: color,
      config_id: config,
      cat_id: category,
      is_New: isNew,
      content: content,
      stock: stock,
    })
    const saveProduct = await newProduct.save()
    res.status(200).json({
      status: 'success',
      message: saveProduct
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const createColor = async (req, res) => {
  try {
    const newColor = new ColorModel({
      name: req.body.nameColor
    })
    const saveColor = await newColor.save()
    res.status(200).json({
      status: 'success',
      message: saveColor
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const createConfig = async (req, res) => {
  try {
    const newConfig = new ConfigModel({
      name: req.body.nameConfig
    })
    const saveConfig = await newConfig.save()
    res.status(200).json({
      status: 'success',
      message: saveConfig
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const createCategory = async (req, res) => {
  try {
    const newCategory = new CategoriesModel({
      title: req.body.title,
    })
    const saveCategory = await newCategory.save()
    res.status(200).json({
      status: 'success',
      message: saveCategory
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  createColor: createColor,
  createConfig: createConfig,
  createCategory: createCategory,
  crateProduct: crateProduct,
}