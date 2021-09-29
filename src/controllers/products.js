const ProductsModel = require('../models/Products');

const getAllProducts = async (req, res) => {
  try {
    const productData = await ProductsModel.find()
      .populate({ path: 'cat_id', select: 'title -_id' })
      .populate({ path: 'color_id', select: 'name -_id' })
      .populate({ path: 'config_id', select: 'name -_id' })
      .lean();
    res.status(200).json({
      status: 'success',
      message: productData,
      total: productData.length,
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
        select: 'title -_id',
      })
      .populate({
        path: 'color_id',
        select: 'name -_id',
      })
      .populate({
        path: 'config_id',
        select: 'name -_id',
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
    const body = req.body;
    const newProduct = new ProductsModel({
      title: body.title,
      description: body.description,
      price: body.price,
      sale: body.sale,
      color_id: body.color,
      config_id: body.config,
      cat_id: body.category,
      is_New: body.isNew,
      content: body.content,
      stock: body.stock,
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
