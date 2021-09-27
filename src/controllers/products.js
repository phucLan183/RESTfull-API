const ProductsModel = require('../models/Products');

const getAllProducts = async (req, res) => {
  try {
    const productData = await ProductsModel.find()
      .populate({ path: 'cat_id' })
      .populate({ path: 'color_id' })
      .populate({ path: 'config_id' })
      .lean();
    res.status(200).json({
      status: 'success',
      message: productData,
      totalProducts: productData.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const findProduct = await ProductsModel.findById({
      _id: productId,
    })
      .populate({
        path: 'cat_id',
      })
      .populate({
        path: 'color_id',
      })
      .populate({
        path: 'config_id',
      })
      .lean();
    res.status(200).json({
      status: 'success',
      message: findProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const crateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      sale,
      color,
      config,
      category,
      isNew,
      content,
      stock,
    } = req.body;
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
      image: req.file.filename,
    });
    const saveProduct = await newProduct.save();
    res.status(200).json({
      status: 'success',
      message: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const removeProduct = await ProductsModel.deleteOne({
      _id: productId,
    }).lean();
    res.status(200).json({
      status: 'success',
      message: removeProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getOneProduct: getOneProduct,
  removeProduct: removeProduct,
  crateProduct: crateProduct,
};
