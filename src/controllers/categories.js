const CategoriesModel = require('../models/Categories');

const getAllCategories = async (req, res) => {
  try {
    const dataCategories = await CategoriesModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: dataCategories,
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const getOneCategories = async (req, res) => {
  try {
    const categoryId = req.params.id
    const findCategories = await CategoriesModel.findById({ _id: categoryId }).lean()
    res.status(200).json({
      status: 'success',
      message: findCategories
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

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const { title } = req.body
    const findCategories = await CategoriesModel.findByIdAndUpdate({
      _id: categoryId
    }, {
      $set: {
        title: title,
      }
    }, {
      new: true
    }).lean()
    res.status(200).json({
      status: 'success',
      message: findCategories
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const removeCategory = await CategoriesModel.findByIdAndRemove({ _id: categoryId }, { new: true }).lean()
    res.status(200).json({
      status: 'success',
      message: removeCategory
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

module.exports = {
  getAllCategories: getAllCategories,
  createCategory: createCategory,
  getOneCategories: getOneCategories,
  removeCategory: removeCategory,
  updateCategory: updateCategory
}