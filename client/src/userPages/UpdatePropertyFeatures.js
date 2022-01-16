import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AddHouseFeatures from './AddHouseFeatures';
import AddPlotFeatures from './AddPlotsFeatures';
//const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
    purpose: Yup.string().required('Purpose must be required'),
    propertyType: Yup.string().required('Property Type must be required'),
    type: Yup.string().required("Required"),
    city: Yup.string().required("City must be required"),
    location: Yup.string().required("Location must be required"),
    title: Yup.string().required("Title must be required"),
    description: Yup.string().required("Description must be required"),
    price: Yup.number().required("Price must be required"),
    area: Yup.number().required("Required"),
    unit: Yup.string().required("Required"),
    // photo: Yup.mixed().nullable().required("Required")
    //     .test(
    //         "FILE_FORMAT",
    //         "Uploaded file has unsuported format.",
    //         (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
    //     ),
});

const UpdatePropertyFeatures = ({ property, id }) => {
    console.log(property);
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.AuthReducer);
    const { purpose, propertyType, type, title, description, city, location, price, area, unit } = property;

    const { features: {
        bathrooms, bedrooms, diningroom, distanceairport, drawingroom, electricitybackup,
        flooring, gym, nearbyhospital, nearbyrestaurants, nearbyschoole, nearbyshoppingmalls,
        prayer_room, servantquarters, sewerage, studyroom, suigas, watersupply } } = property;

    const [addFeatures, setAddFeatures] = useState(false);

    return (
        <div className="container">
            <Toaster/>
            <div className="row my-5">
                <div className="col-md-10 col-lg-10 col-xl-8 col-12 mx-auto mb-5 add_property_form">
                    <h1 className="text-center text-success mb-5">Update Property Features</h1>
                    <Formik
                        initialValues={{
                            purpose: purpose,
                            propertyType: propertyType,
                            type: type,
                            title: title,
                            description: description,
                            city: city,
                            location: location,
                            price: price,
                            area: area,
                            unit: unit,
                            //photo: '',
                            bedrooms: bedrooms,
                            drawingroom: drawingroom,
                            bathrooms: bathrooms,
                            diningroom: diningroom,
                            servantquarters: servantquarters,
                            studyroom: studyroom,
                            electricitybackup: electricitybackup,
                            prayer_room: prayer_room,
                            flooring: flooring,
                            gym: gym,
                            nearbyschoole: nearbyschoole,
                            nearbyhospital: nearbyhospital,
                            nearbyshoppingmalls: nearbyshoppingmalls,
                            nearbyrestaurants: nearbyrestaurants,
                            distanceairport: distanceairport,
                            sewerage: sewerage,
                            watersupply: watersupply,
                            suigas: suigas,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            //this function below the component
                            dispatch(handleSubmit(values, token, id));
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <fieldset className="row mb-2">
                                    <label className="col-form-label col-md-2">Purpose</label>
                                    <div className="col-md-10">
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input" type="radio" name="purpose" id="gridRadios1" value="sale" />
                                            <label className="form-check-label" for="gridRadios1">
                                                For Sales
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="purpose" value="rent" />
                                            <label className="form-check-label">
                                                For Rent
                                            </label>
                                        </div>
                                        <div className="error"><ErrorMessage name="purpose" /></div>
                                    </div>
                                </fieldset>

                                <div className="row mb-0">
                                    <legend className="col-form-label col-md-2">Type</legend>
                                    <div className="col-md-10">
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input" type="radio" name="propertyType" id="gridRadios1" value="Homes" />
                                            <label className="form-check-label" for="gridRadios1">
                                                Homes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="propertyType" id="gridRadios2" value="Plots" />
                                            <label className="form-check-label" for="gridRadios2">
                                                Plots
                                            </label>
                                        </div>
                                        <div className="error"><ErrorMessage name="propertyType" /></div>
                                    </div>
                                </div>
                                {values.propertyType === "Homes" && <div className="row mb-3">
                                    <legend className="col-form-label col-md-3"></legend>
                                    <div className="col-md-9">
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input" type="radio" name="type" id="gridRadios3" value="house" />
                                            <label className="form-check-label" for="gridRadios3">
                                                House
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="type" id="gridRadios4" value="upper portion" />
                                            <label className="form-check-label" for="gridRadios4">
                                                Upper Portion
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="type" id="gridRadios5" value="lower portion" />
                                            <label className="form-check-label" for="gridRadios5">
                                                Lower Portion
                                            </label>
                                        </div>
                                        <div className="error"><ErrorMessage name="type" /></div>
                                    </div>
                                </div>}

                                {values.propertyType === "Plots" && <div className="row mb-3">
                                    <legend className="col-form-label col-md-3"></legend>
                                    <div className="col-md-9">
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input" type="radio" name="type" id="gridRadios7" value="commercial plots" />
                                            <label className="form-check-label" for="gridRadios7">
                                                Comercial Plots
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="type" id="gridRadios8" value="residetial plots" />
                                            <label className="form-check-label" for="gridRadios8">
                                                Residential Plots
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field className="form-check-input " type="radio" name="type" id="gridRadios9" value="agricultural land" />
                                            <label className="form-check-label" for="gridRadios9">
                                                Aggricultural Land
                                            </label>
                                        </div>
                                        <div className="error"><ErrorMessage name="type" /></div>
                                    </div>
                                </div>}
                                <div class="row mb-3">
                                    <div className="col-form-label col-md-2">City</div>
                                    <div className="col-md-6">
                                        <Field className="form-select" name="city" as="select">
                                            <option value="">Select city</option>
                                            <option value="Gujrat">Gujrat</option>
                                            <option value="Gujranwala">Gujranwala</option>
                                        </Field>
                                        <div className="error"><ErrorMessage name="city" /></div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-md-2 col-form-label">Location</label>
                                    <div className="col-md-10">
                                        <Field type="text" className="form-control" name="location" />
                                        <div className="error"><ErrorMessage name="location" /></div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-md-2 col-form-label">Title</label>
                                    <div className="col-md-10">
                                        <Field type="text" className="form-control" name="title" />
                                        <div className="error"><ErrorMessage name="title" /></div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-md-2 col-form-label">Description</label>
                                    <div className="col-md-10">
                                        <Field type="text" className="form-control" name="description" />
                                        <div className="error"><ErrorMessage name="description" /></div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-md-2 col-form-label">Price</label>
                                    <div className="col-md-7">
                                        <Field type="number" className="form-control" name="price" />
                                        <div className="error"><ErrorMessage name="price" /></div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-md-2 col-form-label">Area</label>
                                    <div className="col-md-4">
                                        <Field type="number" className="form-control" name="area" />
                                        <div className="error"><ErrorMessage name="area" /></div>
                                    </div>
                                    <label class="col-md-2 col-form-label">Area Unit</label>
                                    <div className="col-md-4">
                                        <Field className="form-select" name="unit" as="select">
                                            <option value="">Select unit</option>
                                            <option value="sequre feet">Sequre Feet</option>
                                            <option value="marla">Marla</option>
                                            <option value="kanal">Kanal</option>
                                        </Field>
                                        <div className="error"><ErrorMessage name="unit" /></div>
                                    </div>
                                </div>
                                {values.propertyType === 'Homes' || values.propertyType === 'Plots' ? <div className="row mb-2">
                                    <label className="col-md-2 col-form-label">Features</label>
                                    <div className="col-md-10">
                                        <p className="btn btn-success" onClick={() => setAddFeatures(!addFeatures)}>Add Features</p>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10">Click Button and Add Property Features</div>
                                </div> : ''}
                                <div className="row mb-2">
                                    <div className="col-12">
                                        {addFeatures && values.propertyType === 'Homes' ? <AddHouseFeatures /> : ''}
                                        {addFeatures && values.propertyType === 'Plots' ? <AddPlotFeatures /> : ''}
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-2"></div>
                                    <div className="col-10">
                                        <button type="submit" className="btn btn-success">SUBMIT PROPERTY DETAILS</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const handleSubmit = (values, token, id) => {
    return async() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post(`/update_property_details/${id}`, values, config);
            console.log(response);
            toast.success("Property Detail is updated");
        } catch (error) {
            console.log(error.response);
        }
    }
}

export default UpdatePropertyFeatures;