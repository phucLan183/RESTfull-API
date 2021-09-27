const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const categoriesController = require('../controllers/categories');
const userController = require('../controllers/user');
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
router.post('/add-product', isAdmin, uploadMiddleware.single('image'), productsController.crateProduct)
router.delete('/products/:id', isAdmin, productsController.removeProduct)

// Categories
router.get('/categories', categoriesController.getAllCategories)
router.get('/categories/:id', categoriesController.getOneCategories)
router.delete('/categories/:id', isAdmin, categoriesController.removeCategory)
router.post('/add-category', isAdmin, categoriesController.createCategory)
router.put('/categories/:id', isAdmin, categoriesController.updateCategory)

// User
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getOneUser)
router.delete('/users/:id', isAdmin, userController.removeUser)

// Color
router.post('/add-color', isAdmin, productsController.createColor)

// Config
router.post('/add-config', isAdmin, productsController.createConfig)

module.exports = router