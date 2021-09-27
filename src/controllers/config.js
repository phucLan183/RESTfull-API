const ConfigModel = require('../models/Config');

const getAllConfig = async (req, res) => {
  try {
    const dataGetAllConfig = await ConfigModel.find().lean()
    res.status(200).json({
      status: 'success',
      message: dataGetAllConfig,
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const getOneConfig = async (req, res) => {
  try {
    const configId = req.params.id
    const dataGetOneConfig = await ConfigModel.findById({ _id: configId }).lean()
    res.status(200).json({
      status: 'success',
      message: dataGetOneConfig
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
  createConfig: createConfig,
  getAllConfig: getAllConfig,
  getOneConfig: getOneConfig
}