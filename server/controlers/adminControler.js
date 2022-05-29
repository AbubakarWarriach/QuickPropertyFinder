const { User } = require('../model/userSchema');
const {Reserved} = require('../model/reserveSchema');

// fetch verify user in this controler
module.exports.fetchVerifyUsers = async(req, res) => {
    const page = req.params.page;
    const parPage = 3;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await User.find({}).countDocuments();
        console.log(count);
        const verifyUser = await User.find({verify: true}).skip(skip).limit(parPage); //.skip(skip).limit(parPage);
        return res.status(200).json({verifyUser, count, parPage});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

// fetch unverify user in this controler
module.exports.fetchUnVerifyUsers = async(req, res) => {
    // const page = req.params.page;
    // const parPage = 3;
    // const skip = (Number(page) - 1) * parPage;
    try {
        // const count = await User.find({}).countDocuments();
        // console.log(count);
        const users = await User.find({verify: false}) //.skip(skip).limit(parPage); //.skip(skip).limit(parPage);
        return res.status(200).json({users});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

module.exports.verifyUser = async(req, res) => {
    const {id} = req.body;
    // console.log(id);
    try {
        const user = await User.findOneAndUpdate({_id: id}, {verify: true}, { new: true });
        return res.status(200).json({user});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

module.exports.unVerifyUser = async(req, res) => {
    const {id} = req.body;
    // console.log(id);
    try {
        const user = await User.findOneAndUpdate({_id: id}, {verify: false}, { new: true });
        return res.status(200).json({user});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

module.exports.saveReserveProperty = async(req, res) => {
    const { _id, title, userName, userId, customerId } = req.body;
    try {
        const res = await Reserved.create({
            propertyTitle: title,
            propertyId: _id,
            customerId: customerId,
            customerName: 'customer',
            dealerId: userId,
            dealerName: userName
        });
        return res.status(201).json(res);
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

module.exports.fetchReservedCustomer = async(req, res) => {
    try {
        const res = await Reserved.get({});
        return res.status(201).json(res);
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}