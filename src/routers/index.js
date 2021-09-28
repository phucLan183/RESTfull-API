const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const categoriesController = require('../controllers/categories');
const userController = require('../controllers/user');
const colorController = require('../controllers/color');
const configController = require('../controllers/config');
const orderController = require('../controllers/order');
const { isAdmin } = require('../middlewares/authToken');
const { productSchema } = require('../Validations');
const validationMiddleware = require('../middlewares/validation');
const uploadMiddleware = require('../middlewares/upload');

// Dashboard
router.get('/', (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to Electon-Store Server"
  })
})

// Products
router.get('/products', productsController.getAllProducts)
router.get('/products/:id', productsController.getOneProduct)
router.post('/add-product', productsController.crateProduct)
router.delete('/products/:id', isAdmin, productsController.removeProduct)

// Categories
router.get('/categories', categoriesController.getAllCategories)
router.get('/categories/:id', categoriesController.getOneCategories)
router.post('/add-category', isAdmin, categoriesController.createCategory)
router.put('/categories/:id', isAdmin, categoriesController.updateCategory)
router.delete('/categories/:id', isAdmin, categoriesController.removeCategory)

// User
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getOneUser)
router.put('/users/:id', isAdmin, userController.updateUser)
router.delete('/users/:id', isAdmin, userController.removeUser)

// Color
router.get('/colors', colorController.getAllColor)
router.get('/colors/:id', colorController.getOneColor)
router.post('/add-color', isAdmin, colorController.createColor)

// Config
router.get('/configs', configController.getAllConfig)
router.get('/configs/:id', configController.getOneConfig)
router.post('/add-config', isAdmin, configController.createConfig)

// Order
router.get('/orders', orderController.getAllOrder)
router.get('/orders/:id', orderController.getOneOrder)
router.post('/add-order', orderController.createOrder)
router.put('/orders/:id', orderController.updateOrder)
router.delete('/orders/:id', orderController.deleteOrder)
module.exports = router