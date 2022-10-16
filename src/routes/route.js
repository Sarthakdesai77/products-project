const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productsController');
const orderController = require('../controllers/orderController')

route.post('/register', userController.createUser);
route.get('/getUser/:id', userController.getUser);
route.put('/updateUser/:id', userController.updateUser);
route.delete('/deleteUser/:id', userController.deleteUser);

route.post('/createProduct', productController.createProduct);
route.get('/getProducts', productController.getProducts);

route.post('/createOrder/:userId/:productId', orderController.createOrder);
route.get('/getProduct', orderController.getProducts);
route.get('/getUserwithWheat', orderController.getUserwithWheat);

module.exports = route;