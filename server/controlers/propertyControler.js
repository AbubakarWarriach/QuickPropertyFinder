const formidable = require('formidable');
const { Property } = require('../model/propertySchema');
const { User } = require('../model/userSchema');

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
    const parPage = 4;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await Property.find({ $and: [{ userId: id }, { disable: true }] }).countDocuments();
        //console.log(count);
        const response = await Property.find({ $and: [{ userId: id }, { disable: true }] }).skip(skip).limit(parPage);//.sort({title: -1})
        //1console.log(response);
        return res.status(201).json({ response, parPage, count });
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}

module.exports.fetchProperty = async (req, res) => {
    const id = req.params.id;
    try {
        const propertyData = await Property.findOne({ $and: [{ _id: id }, { disable: true }] });
        return res.status(200).json({ propertyData });
    } catch (err) {
        return res.status(400).json({ msg: "error" });
    }
}

module.exports.updatePropertyFeatures = async (req, res) => {
    const id = req.params.id;
    //const formData = req.body;
    console.log(id);
    const { purpose, propertyType, type, title, description, city, location, price, area, unit,
        bathrooms, bedrooms, diningroom, distanceairport, drawingroom, electricitybackup,
        flooring, gym, nearbyhospital, nearbyrestaurants, nearbyschoole, nearbyshoppingmalls,
        prayer_room, servantquarters, sewerage, studyroom, suigas, watersupply } = req.body;
    try {
        const propertyDetails = await Property.findByIdAndUpdate(id, {
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
                suigas
            }
        });
        return res.status(201).json({ propertyDetails });
    } catch (error) {
        return res.status(400).json({ msg: "error" });
    }
}

module.exports.updatePropertyImage = async (req, res) => {
    const id = req.params.id;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(files);
        if (!err) {
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
                        const propertyDetails = await Property.findByIdAndUpdate(id, { photo: files.photo.originalFilename }, { new: true });
                        return res.status(201).json({ propertyDetails });
                    } catch (error) {
                        return res.status(400).json({ msg: "Server Error" });
                    }
                }
            })
        } else {
            return res.status(400).json({ msg: "Internal Server Error" });
        }
    })
}

// controler fetch Homes properties for showing Home page...
module.exports.fetchHomes = async (req, res) => {
    try {
        const response = await Property.find({ $and: [{ propertyType: "Homes" }, { disable: true }] }).limit(4);
        //console.log(response);
        return res.status(201).json(response);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

// controler fetch Plots for showing Home page...
module.exports.fetchPlots = async (req, res) => {
    try {
        const response = await Property.find({ $and: [{propertyType: "Plots"}, { disable: true }] }).limit(4);
        //console.log(response);
        return res.status(201).json(response);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

module.exports.fetch_Plots_With_Pagination = async (req, res) => {
    const page = req.params.page;
    const parPage = 10;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await Property.find({ $and: [{propertyType: "Plots"}, { disable: true }] }).countDocuments();
        // console.log(count);
        const response = await Property.find({ $and: [{propertyType: "Plots"}, { disable: true }] })//.skip(skip).limit(parPage);//.sort({title: -1})
        //1console.log(response);
        return res.status(201).json({ response, parPage, count });
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

module.exports.fetch_Homes_With_Pagination = async (req, res) => {
    const page = req.params.page;
    const parPage = 10;
    const skip = (Number(page) - 1) * parPage;
    try {
        const count = await Property.find({ $and: [{propertyType: "Homes"}, { disable: true }] }).countDocuments();
        //console.log(count);
        const response = await Property.find({ $and: [{propertyType: "Homes"}, { disable: true }] })//.skip(skip).limit(parPage);//.sort({title: -1})
        //console.log(response);
        return res.status(201).json({ response, parPage, count });
    } catch (err) {
        // console.log(err.message)
        return res.status(400).json({ err: err.message });
    }
}

// Property Reserve.....
module.exports.propertyReserve = async (req, res) => {
    const { _id } = req.body;
    try {
        const resp = await Property.findByIdAndUpdate({ _id: _id }, {reserve: true}, { new: true });
        return res.status(201).json({ resp });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports.propertyDisable = async (req, res) => {
    const { id } = req.body;
    try {
        console.log("ndewihdi")
        const resp = await Property.findByIdAndUpdate({ _id: id }, {disable: false}, { new: true });
        console.log("ndewihdi")
        return res.status(201).json({ resp });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

//controler fetch client search properties....
module.exports.fetchClientSearch = async (req, res) => {
    const page = req.params.page;
    const parPage = 3;
    const skip = (Number(page) - 1) * parPage;
    console.log(req.body);
    const { city, location, min_area, max_area, min_price, max_price, unit, type } = req.body;
    try {
        const count = await Property.find({
            $or: [{ city: city }, { location: location }, { unit: unit }, { type: type },
            {
                $or: [{ area: { $gte: min_area } }, { area: { $lte: max_area } }, { price: { $gte: min_price } },
                { price: { $lte: max_price } }]
            }]
        }).countDocuments();
        const response = await Property.find({
            $or: [{ city: city }, { location: location }, { unit: unit }, { type: type },
            {
                $or: [{ area: { $gte: min_area } }, { area: { $lte: max_area } }, { price: { $gte: min_price } },
                { price: { $lte: max_price } }]
            }]
        }).skip(skip).limit(3);
        //console.log(response);
        return res.status(201).json({ response, count, parPage });
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}

module.exports.propertyFetchSearchProperties = async(req, res) => {
    try {
        const res = await Property.find({});
        return res.status(201).json(res);
    } catch (error) {
        return res.status(400).json({ errors: err.message });
    }
}



/*
//controler fetch comercial type properties for Plots page....
module.exports.fetchComercialPlots = async (req, res) => {
    try {
        const response = await Property.find({ type: "commercial plots" }).limit(2);
        //console.log(response);
        return res.status(201).json({ response });
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}

//controler fetch residential type properties for Plots page....
module.exports.fetchResidentialPlots = async (req, res) => {
    try {
        const response = await Property.find({ type: "residential plots" }).limit(2);
        //console.log(response);
        return res.status(201).json({ response });
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}

//controler fetch agricultural type properties for Plots page....
module.exports.fetchAgriculturalPlots = async (req, res) => {
    try {
        const response = await Property.find({ type: "agricultural plots" }).limit(2);
        //console.log(response);
        return res.status(201).json({ response });
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
}
*/