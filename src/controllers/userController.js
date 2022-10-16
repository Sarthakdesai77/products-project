const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');

const isValidPhone = (pw) => {
    if (/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(pw))
        return true
}

// make CRUD API operation on the user's table 
const createUser = async (req, res) => {
    try {
        let body = req.body;

        let { firstName, lastName, mobileNumber, address } = body;

        // validations
        if (!firstName) return res.status(400).send({ status: false, message: 'Please enter first name' });

        if (!lastName) return res.status(400).send({ status: false, message: 'Please enter lname' });

        if (!mobileNumber) return res.status(400).send({ status: false, message: 'Please enter phone' });
        if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, message: 'Please enter a valid phone number' });
        if (await userModel.findOne({ mobileNumber })) return res.status(400).send({ status: false, message: 'mobile number already registered' })

        if (!address) return res.status(400).send({ status: false, message: 'Please enter address' });

        // response
        let response = await userModel.create(body);

        res.status(201).send({ status: true, message: 'User created successfully', data: response });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getUser = async (req, res) => {
    try {
        let id = req.params.id;

        // check if id is valid
        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ status: false, message: 'Not a valid userId' });

        // check if user is valid user
        const checkUser = await userModel.findOne({ _id: id, isDeleted: false });
        if (!checkUser) return res.status(404).send({ status: false, message: "UserId invalid or user deleted" });

        // response
        return res.status(200).send({ status: true, message: "User profile details", data: checkUser });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;

        let { firstName, lastName, mobileNumber, address } = body;

        // find user from database with id
        let findUser = await userModel.findOne({ _id: id, isDeleted: false });
        if (!findUser) res.status(404).send({ status: false, message: 'user not found or is deleted' });

        // update data
        if (firstName) {
            findUser.firstName = firstName;
        }

        if (lastName) {
            findUser.lastName = lastName;
        }

        if (mobileNumber) {
            if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, message: 'Please enter a valid phone number' });
            if (await userModel.findOne({ mobileNumber })) return res.status(400).send({ status: false, message: 'mobile number already registered' })
            findUser.mobileNumber = mobileNumber;
        }

        if (address) {
            findUser.address = address;
        }

        // update data
        await userModel.updateOne({ _id: id }, findUser);

        // response
        res.status(200).send({ status: true, message: 'successfully updated', data: findUser });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
    
        // find user from database with id
        let findUser = await userModel.findOne({ _id: id, isDeleted: false });
        if (!findUser) res.status(404).send({ status: false, message: 'user not found or is deleted' });
    
        // delete data
        findUser.isDeleted = true;
        findUser.deletedAt = Date.now();
    
        await userModel.updateOne({ _id: id }, findUser);
    
        // response
        res.status(204).send({ status: true, message: 'succesfully deleted' });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createUser, getUser, updateUser, deleteUser }