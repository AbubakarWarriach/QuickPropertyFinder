import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SET_TOKON } from '../store/reducers/AuthReducer';

const validationSchema = Yup.object({
    fname: Yup.string().required('Fname must be required'),
    lname: Yup.string().required('Lname must be required'),
    title: Yup.string().required('Title must be required'),
    city: Yup.string().required("Required"),
    area: Yup.string().required("Area must be required"),
    email: Yup.string().email("Invaliad").required("Email must be required"),
    currentPassword: Yup.string().min(6, "too short").max(12, "too long").required("Required"),
    newPassword: Yup.string().min(6, "too short").max(12, "too long").required("Required"),
    description: Yup.string().min(20, "minimum 10 letter").max(500, "increase 500 letter")
        .required("Required"),
    phone: Yup.number().min(100000000, "Number is to short").max(999999999999, "Number is to Long")
        .required('Required'),
});

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const { user, token } = useSelector(state => state.AuthReducer);
    if (redirect) {
        setTimeout(() => {
            props.history.push("/profile");
        }, 500);
    }
    return (
        <div className="container">
            <Toaster />
            <div className="row">
                <div className="col-12 my-3">
                    <h1 className="text-center">Edit Profile</h1>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-10 mx-auto mb-5">
                    <Formik
                        initialValues={{
                            fname: user.fname,
                            lname: user.lname,
                            phone: user.phone,
                            email: user.email,
                            currentPassword: '',
                            newPassword: '',
                            userId: user._id,
                            title: user.title,
                            city: user.city,
                            area: user.area,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            //this function below the component
                            dispatch(handleSubmit(values, token, setRedirect));
                        }}
                    >
                        {() => (
                            <Form className="row g-1">
                                <div className="col-sm-6">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <Field type="text" name="fname" className="form-control" id="fname" />
                                    <div className="error"><ErrorMessage name="fname" /></div>
                                </div>
                                <div className="col-sm-6 right-field">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <Field type="text" name="lname" className="form-control" id="lname" />
                                    <div className="error"><ErrorMessage name="lname" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <Field type="email" name="email" className="form-control" id="email" />
                                    <div className="error"><ErrorMessage name="email" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Enter Cell Number</label>
                                    <Field type="number" name="phone" className="form-control" id="phone" />
                                    <div className="error"><ErrorMessage name="phone" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="title" className="form-label">Business Title</label>
                                    <Field type="text" name="title" className="form-control" id="title" />
                                    <div className="error"><ErrorMessage name="title" /></div>
                                </div>
                                <div className="col-sm-12">
                                    <label className="form-label">Select city</label>
                                    <Field className="form-select" name="city" as="select">
                                        <option value="">Select city</option>
                                        <option value="Gujrat">Gujrat</option>
                                        <option value="Gujranwala">Gujranwala</option>
                                    </Field>
                                    <div className="error"><ErrorMessage name="city" /></div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Enter Area</label>
                                    <Field type="text" name="area" className="form-control" />
                                    <div className="error"><ErrorMessage name="area" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="curretpssword" className="form-label">Current Password</label>
                                    <Field type="password" name="currentPassword" className="form-control" id="currentpassword" />
                                    <div className="error"><ErrorMessage name="currentPassword" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="newpssword" className="form-label">New Password</label>
                                    <Field type="password" name="newPassword" className="form-control" id="newpassword" />
                                    <div className="error"><ErrorMessage name="newPassword" /></div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success mt-2" style={{ width: "100%" }}>Update</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    )
}

const handleSubmit = (values, token, setRedirect) => {
    return async (dispatch) => {
        console.log(values);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post("/edit_profile", values, config);
            //console.log(response);
            const { msg, token } = response.data;
            toast.success(msg);
            // console.log(user);
            localStorage.setItem("myToken", token);
            dispatch({ type: SET_TOKON, paylood: token });
            setRedirect(true);
        } catch (error) {
            //console.log(error.response);
            const { msg } = error.response.data;
            // console.log(msg);
            toast.error(msg);
        }
    }
}

export default EditProfile;