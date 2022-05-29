import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AddHouseFeatures from './AddHouseFeatures';
import AddPlotFeatures from './AddPlotsFeatures';
import { useHistory } from 'react-router-dom';
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
    photo: Yup.mixed().nullable().required("Required")
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsuported format.",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
        ),
});

const AddProperty = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.AuthReducer);
    const [addFeatures, setAddFeatures] = useState(false);
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    return (
        <div className="container">
            <Toaster />
            <div className="row my-5">
                <div className="col-md-10 col-lg-10 col-xl-8 col-12 mx-auto mb-5 add_property_form">
                    <h1 className="text-center text-success mb-5">Add Property Details</h1>
                    <Formik
                        initialValues={{
                            purpose: '',
                            propertyType: '',
                            type: '',
                            title: '',
                            description: '',
                            city: '',
                            location: '',
                            price: '',
                            area: '',
                            unit: '',
                            photo: '',
                            bedrooms: '',
                            drawingroom: '',
                            bathrooms: '',
                            diningroom: '',
                            servantquarters: '',
                            studyroom: '',
                            electricitybackup: '',
                            prayer_room: '',
                            flooring: '',
                            gym: '',
                            nearbyschoole: '',
                            nearbyhospital: '',
                            nearbyshoppingmalls: '',
                            nearbyrestaurants: '',
                            distanceairport: '',
                            sewerage: '',
                            watersupply: '',
                            suigas: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            //this function below the component
                            dispatch(handleSubmit(values, token, user));
                            // history.push("/dashboard");
                        }}
                    >
                        {({ values, setFieldValue }) => (
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
                                            <Field className="form-check-input " type="radio" name="type" id="gridRadios8" value="residential plots" />
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
                                            <option value="Lahore">Lahore</option>
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
                                <div className="row mb-2">
                                    <label className="col-md-2">Property Photo</label>
                                    <div className="col-md-10">
                                        <input type="file" name="photo" hidden ref={fileRef}
                                            onChange={(e) => {
                                                setFieldValue("photo", e.target.files[0]);
                                                if (e.target.files[0]) {
                                                    //setImage(e.target.files[0]);
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(e.target.files[0]);
                                                    reader.onload = () => setPreview(reader.result);
                                                } else {
                                                    setPreview(null);
                                                }
                                            }}
                                        />
                                        <div className="my-1">
                                            {
                                                preview && <img src={preview} alt="preview" width="130" height="100" />
                                            }
                                        </div>
                                        <button onClick={(e) => { fileRef.current.click(); e.preventDefault() }}
                                            className="btn btn-primary">Upload Photo</button>
                                        <div className="error"><ErrorMessage name="photo" /></div>
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
        </div >
    )
}
const handleSubmit = (values, token, user) => {
    return async (dispatch) => {
        console.log(values);
        const formData = new FormData();
        formData.append('purpose', values.purpose);
        formData.append('propertyType', values.propertyType);
        formData.append('type', values.type);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('city', values.city);
        formData.append('location', values.location);
        formData.append('price', values.price);
        formData.append('area', values.area);
        formData.append('unit', values.unit);
        formData.append('photo', values.photo);
        formData.append('bedrooms', values.bedrooms);
        formData.append('drawingroom', values.drawingroom);
        formData.append('bathrooms', values.bathrooms);
        formData.append('diningroom', values.diningroom);
        formData.append('servantquarters', values.servantquarters);
        formData.append('studyroom', values.studyroom);
        formData.append('electricitybackup', values.electricitybackup);
        formData.append('prayer_room', values.prayer_room);
        formData.append('flooring', values.flooring);
        formData.append('gym', values.gym);
        formData.append('nearbyschoole', values.nearbyschoole);
        formData.append('nearbyhospital', values.nearbyhospital);
        formData.append('nearbyshoppingmalls', values.nearbyshoppingmalls);
        formData.append('nearbyrestaurants', values.nearbyrestaurants);
        formData.append('distanceairport', values.distanceairport);
        formData.append('sewerage', values.sewerage);
        formData.append('watersupply', values.watersupply);
        formData.append('suigas', values.suigas);
        formData.append('userId', user._id);
        formData.append('userName', user.fname+" "+user.lname);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post("/add_property", formData, config);
            console.log(response);
            const { msg } = response.data;
            toast.success(msg);
        } catch (error) {
            console.log(error.response);
            const { msg } = error.response.data;
            // console.log(msg);
            toast.error(msg);
        }
    }
}
export default AddProperty;