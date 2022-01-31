// const formidable = require('formidable');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Customer } = require('../model/customerSchema');
require("dotenv").config();
// const { v4: uuidv4 } = require('uuid');

const creatToken = (customer) => {
    return jwt.sign({ customer }, process.env.SECRETKEY, {
        expiresIn: "14d",
    });
}

module.exports.customerRegister = async(req, res) => {
    const { name, email, phone, password } = req.body;
    //console.log(req.body);
    try {
        const checkMail = await Customer.findOne({ email });
        if (checkMail) {
            return res.status(400).send({ msg: "Email already exit" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash_psd = await bcrypt.hash(password, salt);
            const customer = await Customer.create({ name, email, phone, password: hash_psd });
            const token = creatToken(customer);
            return res.status(200).json({ msg: "Profile Created Successfuly", customer, token });
        }
    } catch (error) {
        return res.status(400).json({ msg: "Internal Server Error", error });
    }
}

module.exports.customerLogin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await Customer.findOne({ email });
        if (checkUser) {
            const match_psd = await bcrypt.compare(password, checkUser.password);
            if (match_psd) {
                const token = creatToken(checkUser);
                //console.log(token);
                return res.status(201).send({ msg: "Login success", token });
            } else {
                return res.status(400).send({ msg: "Invalid crediential" });
            }
        } else {
            return res.status(400).send({ msg: "Invalid crediential" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal server errer" });
    }
}