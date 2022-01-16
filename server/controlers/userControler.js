const formidable = require('formidable');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../model/userSchema');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const creatToken = (user) => {
    return jwt.sign({ user }, process.env.SECRETKEY, {
        expiresIn: "7d",
    });
}

// User Registration Controler
module.exports.registration = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        console.log(files);
        const { fname, lname, phone, email,
            password, } = fields;
        if (err) {
            return res.status(400).json("err");
        } else {
            try {
                const checkMail = await User.findOne({ email });
                if (checkMail) {
                    return res.status(400).send({ msg: "Email already exit" });
                } else {
                    //set image path
                    const { mimetype } = files.photo;
                    const split = mimetype.split("/");
                    const extension = split[1].toLowerCase();
                    files.photo.originalFilename = uuidv4() + "." + extension;
                    const newPath = __dirname + `/../../client/public/ProfileImage/${files.photo.originalFilename}`;
                    //copy image and save data into mongoDB
                    fs.copyFile(files.photo.filepath, newPath, async (err) => {
                        if (!err) {
                            const salt = await bcrypt.genSalt(10);
                            const hash_psd = await bcrypt.hash(password, salt);
                            try {
                                const user = await User.create({
                                    fname,
                                    lname,
                                    photo: files.photo.originalFilename,
                                    phone,
                                    email,
                                    password: hash_psd,
                                });
                                const token = creatToken(user);
                                return res.status(200).json({ msg: "Profile Created Successfuly", user, token });
                            } catch (error) {
                                return res.status(400).json({ msg: "Internal Server Error", err });
                            }
                        } else {
                            return res.status(400).json({ msg: "error", err });
                        }
                    })
                }
            } catch (error) {
                return res.status(500).json({ msg: "Internal Server Error", err });
            }
        }
    })
}

// User Login Controler
module.exports.login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!req.body) {
        return res.status(400).json({ msg: "Plz fill the field" });
    } else {
        try {
            const checkUser = await User.findOne({ email });
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
}

// Update User Profile Controler
module.exports.editProfile = async (req, res) => {
    const { fname, lname, title, city,
        phone, email, currentPassword, newPassword, area, userId } = req.body;
    if (req.body) {
        try {
            const findUser = await User.findOne({ _id: userId });
            if (findUser) {
                const matched = await bcrypt.compare(currentPassword, findUser.password);
                if (matched) {
                    const salt = await bcrypt.genSalt(10);
                    const hash_psd = await bcrypt.hash(newPassword, salt);
                    const user = await User.findOneAndUpdate({ _id: userId }, {
                        fname,
                        lname,
                        phone,
                        email,
                        password: hash_psd,
                        title,
                        city,
                        area,
                    }, { new: true });
                    const token = creatToken(user);
                    return res.status(200).json({ msg: "Your profile have been updated", token });
                } else {
                    return res.status(400).send({ msg: "Wrong Password" });
                }
            } else {
                return res.status(400).send({ msg: "User not found" });
            }
        } catch (error) {
            return res.status(400).send({ msg: "Internal Server Error", error });
        }
    } else {
        return res.status(400).send({ msg: "Plz fill the complete form" });
    }
}

// Update User Profile Photo Controler
module.exports.updateProfilePhoto = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        const { userId } = fields;
        //console.log(files);
        if (err) {
            return res.status(400).json({ msg: "data error", err });
        } else {
            try {
                //set image path
                const { mimetype } = files.photo;
                const split = mimetype.split("/");
                const extension = split[1].toLowerCase();
                files.photo.originalFilename = uuidv4() + "." + extension;
                const newPath = __dirname + `/../../client/public/ProfileImage/${files.photo.originalFilename}`;
                //copy image and save path into mongoDB
                fs.copyFile(files.photo.filepath, newPath, async (err) => {
                    if (!err) {
                        const user = await User.findOneAndUpdate({ _id: userId }, { photo: files.photo.originalFilename }, { new: true });
                        const token = creatToken(user);
                        return res.status(200).json({ msg: "Your profile photo have been updated", token });
                    } else {
                        return res.status(400).json({ msg: "filepath error", err });
                    }
                })
            } catch (error) {

            }
            //return res.status(200).json({ msg: "Your profile have been updated", files });
        }
    });
}


module.exports.fetchDealerHome = async (req, res) => {
    try {
        const response = await User.find({  }).limit(4);
        //console.log(response);
        return res.status(201).json( response );
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}


module.exports.fetchDealerDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await User.findOne({ _id: id });
        //console.log(response);
        return res.status(201).json( response );
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}