const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { isAdmin } = require('../middlewares/authToken');


router.get('/', (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to Electon-Store Server"
  })
})

router.post('/add-color', isAdmin, productsController.createColor)
router.post('/add-config', isAdmin, productsController.createConfig)
router.post('/add-category', isAdmin, productsController.createCategory)
router.post('/add-product', isAdmin, productsController.crateProduct)
module.exports = router