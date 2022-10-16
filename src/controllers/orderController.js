const mongoose = require('mongoose');
const orderModel = require('../models/ordersModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');

const createOrder = async (req, res) => {
    try {
        let userId = req.params.userId;
        let productId = req.params.productId;

        // validations
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'Not a valid userId' });
        if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, message: 'Not a valid productId' });

        // check in data base if user and product exist
        let findUser = await userModel.findOne({ _id: userId, isDeleted: false });
        if (!findUser) res.status(404).send({ status: false, message: 'user not found or deleted' })

        let findProduct = await productModel.findOne({ _id: productId, isDeleted: false });
        if (!findProduct) res.status(404).send({ status: false, message: 'product not found or deleted' })

        // store in database
        let order = {
            userId: userId,
            productId: productId
        }

        // response
        let response = await orderModel.create(order);

        res.status(201).send({ status: true, message: 'order placed succesfully', data: response });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// make GET API  which contains the number of products ordered on a monthly and yearly basis 
const getProducts = async (req, res) => {
    try {
        let month = req.query.month;
        let year = req.query.year;
    
        let order = await orderModel.find({ isDeleted: false }).populate('productId', { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, isDeleted: 0 })
    
        // get data of particular date
        let result=[]
        for (let item of order) {
            let date = new Date(item.createdAt);
    
            if(month && year){
                if(date.getFullYear()==year&&date.getMonth()+1==month){
                    result.push(item);
                }
            }
            if(!month && year){
                if(date.getFullYear()==year){
                    result.push(item);
                }
            }
            if(month && !year){
                if(date.getMonth()+1==month){
                    result.push(item);
                }
            }
        }
    
        // response
        res.status(200).send({ status: true, message: 'list of products for a specific year or month', totalProducts: result.length, data: result });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// make an API that shows the number of users who have ordered a product name WHEAT
const getUserwithWheat = async (req, res) => {
    try {
        let orderDetails = await orderModel.find({ isDeleted: false }).populate('userId', { firstName: 1, lastName: 1, _id: 0 }).populate('productId', { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, isDeleted: 0 })

        // find products with wheat
        let result = [];
        for (let order of orderDetails) {
            if (order.productId.productName == 'wheat') {
                result.push(order);
            }
        }

        // response
        res.status(200).send({ status: true, message: 'users who ordered wheat', totalUsers: result.length, data: result });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createOrder, getUserwithWheat, getProducts }