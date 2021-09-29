const ProductsModel = require('../models/Products');

const getAllProducts = async (req, res) => {
  try {
    const productData = await ProductsModel.find()
      .populate([
        { path: 'cat_id', select: 'title _id' },
        { path: 'color_id', select: 'name _id' },
        { path: 'config_id', select: 'name _id' },
      ])
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
        select: 'title _id',
      })
      .populate({
        path: 'color_id',
        select: 'name _id',
      })
      .populate({
        path: 'config_id',
        select: 'name _id',
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

const createProduct = async (req, res) => {
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
      content: body.content,
      stock: body.stock,
      image: body.image,
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

const updateProduct = async (req, res) => {
  try {
    const {
      category,
      color,
      config,
      content,
      description,
      image,
      price,
      sale,
      stock,
      title,
    } = req.body
    const productId = req.params.id
    const changeProduct = await ProductsModel.findByIdAndUpdate({
      _id: productId
    }, {
      $set: {
        title,
        description,
        price,
        sale,
        color_id: color,
        config_id: config,
        cat_id: category,
        content,
        stock,
        image,
      }
    }, { new: true })
    res.status(200).json({
      status: 'success',
      message: changeProduct
    })
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
  updateProduct: updateProduct,
  removeProduct: removeProduct,
  createProduct: createProduct,
};
