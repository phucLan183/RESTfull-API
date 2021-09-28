const UsersModel = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const dataCategories = await UsersModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: dataCategories,
      totalProducts: dataCategories.length,
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const getOneUser = async (req, res) => {
  try {
    const categoryId = req.params.id
    const findCategories = await UsersModel.findById({ _id: categoryId }).lean()
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const levelUpUser = await UsersModel.findByIdAndUpdate({
      _id: userId
    }, {
      $set: {
        is_Admin: true,
      }
    }, { new: true })
    res.status(200).json({
      status: 'success',
      message: levelUpUser
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const removeUser = async (req, res) => {
  try {
    const categoryId = req.params.id
    const removeCategory = await UsersModel.findByIdAndRemove({ _id: categoryId }, { new: true }).lean()
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
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  updateUser: updateUser,
  removeUser: removeUser
}