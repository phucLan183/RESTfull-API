const ProductsModel = require('../models/Products');
const ColorModel = require('../models/Color');
const ConfigModel = require('../models/Config');
const CategoriesModel = require('../models/Categories')

const getAllProducts = async (req, res) => {
  try {
    const productData = await ProductsModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: productData,
      totalProducts: productData.length,
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const findProduct = await ProductsModel.findById({ _id: productId }).lean()
    res.status(200).json({
      status: 'success',
      message: findProduct
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
    const { title, description, price, sale, color, config, category, isNew, content, stock } = req.body
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
      image: req.file.filename
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

const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const removeProduct = await ProductsModel.deleteOne({ _id: productId }).lean()
    res.status(200).json({
      status: 'success',
      message: removeProduct
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


module.exports = {
  getAllProducts: getAllProducts,
  getOneProduct: getOneProduct,
  createColor: createColor,
  removeProduct: removeProduct,
  createConfig: createConfig,
  crateProduct: crateProduct
}