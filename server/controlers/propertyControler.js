const formidable = require('formidable');
const { Property } = require('../model/propertySchema');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

module.exports.addProperty = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        const {
            purpose,
            propertyType,
            type,
            title,
            description,
            city,
            location,
            price,
            area,
            unit,
            bedrooms,
            drawingroom,
            bathrooms,
            diningroom,
            servantquarters,
            studyroom,
            electricitybackup,
            prayer_room,
            flooring,
            gym,
            nearbyschoole,
            nearbyhospital,
            nearbyshoppingmalls,
            nearbyrestaurants,
            distanceairport,
            sewerage,
            watersupply,
            suigas,
            userId,
            userName,
        } = fields;
        if (err) {
            return res.status(400).json("err");
        } else {
            try {
                //set image path
                const { mimetype } = files.photo;
                const split = mimetype.split("/");
                const extension = split[1].toLowerCase();
                files.photo.originalFilename = uuidv4() + "." + extension;
                const newPath = __dirname + `/../../client/public/PropertyImages/${files.photo.originalFilename}`;
                //copy image and save data into mongoDB
                fs.copyFile(files.photo.filepath, newPath, async (err) => {
                    if (!err) {
                        try {
                            const property = await Property.create({
                                purpose,
                                propertyType,
                                type,
                                city,
                                location,
                                title,
                                description,
                                price,
                                area,
                                unit,
                                photo: files.photo.originalFilename,
                                userId,
                                userName,
                                features: {
                                    bedrooms,
                                    drawingroom,
                                    bathrooms,
                                    diningroom,
                                    servantquarters,
                                    studyroom,
                                    electricitybackup,
                                    prayer_room,
                                    flooring,
                                    gym,
                                    nearbyschoole,
                                    nearbyhospital,
                                    nearbyshoppingmalls,
                                    nearbyrestaurants,
                                    distanceairport,
                                    sewerage,
                                    watersupply,
                                    suigas,
                                }
                            });
                            return res.status(201).json({ msg: "Property detail uploaded", property });
                        } catch (error) {
                            return res.status(400).json({ msg: "Internal Server Error", error });
                        }
                    } else {
                        return res.status(400).json({ msg: "error", err });
                    }
                })
            } catch (error) {
                return res.status(500).json({ msg: "Internal Server Error", err });
            }
        }
    })
}

module.exports.fetchProperties = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const parPage = 3;
    const skip = (Number(page) - 1) * parPage;
    try {
       const count = await Property.find({ userId: id }).countDocuments();
       //console.log(count);
       const response = await Property.find({ userId: id }).skip(skip).limit(parPage);//.sort({title: -1})
       //1console.log(response);
       return res.status(201).json({ response, parPage, count });
    } catch (err) {
       return res.status(400).json({ errors: err.message });
    }
 }

 module.exports.fetchProperty = async(req, res) => {
    const id = req.params.id;
    try{
        const propertyData = await Property.findOne({_id: id});
        return res.status(200).json({propertyData});
    }catch(err){
        return res.status(400).json({ msg: "error" });
    }
 }