const ColorModel = require('../models/Color');

const getAllColor = async (req, res) => {
  try {
    const dataColor = await ColorModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: dataColor,
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const getOneColor = async (req, res) => {
  try {
    const colorId = req.params.id
    const findColor = await ColorModel.findById({ _id: colorId }).lean()
    res.status(200).json({
      status: 'success',
      message: findColor
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


module.exports = {
  createColor: createColor,
  getOneColor: getOneColor,
  getAllColor: getAllColor
}