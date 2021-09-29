const OrderModel = require('../models/Order');

const getAllOrder = async (req, res) => {
  try {
    const dataOrder = await OrderModel.find().lean();
    res.status(200).json({
      status: 'success',
      message: dataOrder,
      total: dataOrder.length
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const dataOrder = await OrderModel.findById({ _id: orderId }).lean();
    res.status(200).json({
      status: 'success',
      message: dataOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const body = req.body
    const newOrder = new OrderModel({
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      phoneNumber: body.phoneNumber,
      message: body.message,
      city: body.city,
      country: body.country,
      unitShipping: body.unitShipping,
      products: body.products,
    })
    const saveOrder = await newOrder.save()
    res.status(200).json({
      status: 'success',
      message: saveOrder
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status } = req.body
    const orderId = req.params.id
    const changeOrder = await OrderModel.findByIdAndUpdate({
      _id: orderId
    }, {
      $set: {
        status: status
      }
    }, { new: true })
    res.status(200).json({
      status: 'success',
      message: changeOrder
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await OrderModel.deleteOne({ _id: orderId }).lean();
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrder: getAllOrder,
  getOneOrder: getOneOrder,
  createOrder: createOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
};
