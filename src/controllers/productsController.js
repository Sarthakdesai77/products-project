const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        let body = req.body;

        let { productName, description, offerPrice, mrp } = body;

        // validations
        if (!productName) return res.status(400).send({ status: false, message: 'Please enter product name' });
        if (!description) return res.status(400).send({ status: false, message: 'Please enter description' });
        if (!offerPrice) return res.status(400).send({ status: false, message: 'Please enter offer Price' });
        if (!mrp) return res.status(400).send({ status: false, message: 'Please enter mrp' });

        // add margin
        body.margin = mrp - offerPrice;

        // response
        let response = await productModel.create(body);

        res.status(201).send({ status: true, message: 'successfully created', data: response })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//  make an API which margins of the products: the list should be in descending order
const getProducts = async (req, res) => {

    try {
        let products = await productModel.find().sort({ margin: -1 }).select({ createdAt: 0, isDeleted: 0, updatedAt: 0, deletedAt: 0, _id: 0, __v:0 });

        res.status(200).send({ status: true, message: 'product list', data: products })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createProduct, getProducts }