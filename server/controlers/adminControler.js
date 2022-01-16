const { User } = require('../model/userSchema');

// fetch verify user in this controler
module.exports.fetchVerifyUsers = async(req, res) => {
    const page = req.params.page;
    const parPage = 3;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await User.find({}).countDocuments();
        console.log(count);
        const response = await User.find({verify: true}).skip(3).limit(2); //.skip(skip).limit(parPage);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}

// fetch unverify user in this controler
module.exports.fetchUnVerifyUsers = async(req, res) => {
    const page = req.params.page;
    const parPage = 3;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await User.find({}).countDocuments();
        console.log(count);
        const response = await User.find({verify: false}).skip(3).limit(2); //.skip(skip).limit(parPage);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(400).json({err: "Server Error"});
    }
}