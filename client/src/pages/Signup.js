import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SET_TOKON } from '../store/reducers/AuthReducer';
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
    fname: Yup.string().required('Required'),
    lname: Yup.string().required('Required'),
    //title: Yup.string().required('Required'),
    //address: Yup.string().required("Required"),
    email: Yup.string().email("Invaliad").required("Required"),
    //password: Yup.string().min(6, "too short").max(12, "too long").required("Required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    passwordConfirmation: Yup
        .string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    //decription: Yup.string().min(20, "maximum 10 letter").max(500, "increase 500 letter")
    //    .required("Required"),
    phone: Yup.number().min(100000000, "Number is to short").max(999999999999, "Number is to Long")
        .required('Required'),
    photo: Yup.mixed().nullable().required("Required")
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsuported format.",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
        ),
    // social: Yup.object().shape({
    //     facebook: Yup.string().required("Required"),
    //     twitter: Yup.string().required("Required"),
    // }),
});

const Signup = () => {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    //const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);
    return (
        <div className="container">
            <Toaster />
            <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-10 mx-auto mb-5 signup-form">
                <h1 className="text-center">Dealer Registration</h1>
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            photo: '',
                            phone: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            //console.log(values);
                            //this function below the component
                            dispatch(handleRegister(values));
                        }}
                    >
                        {({ setFieldValue }) => (
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
                                {/*<div className="col-12">
                                    <label htmlFor="title" className="form-label">Business Title</label>
                                    <Field type="text" name="title" className="form-control" id="title" />
                                    <div className="error"><ErrorMessage name="title" /></div>
                                </div>*/}
                                <div className="col-12">
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
                                {/*<div className="col-sm-12">
                                    <label htmlFor="address" className="form-label">Enter Address</label>
                                    <Field type="text" name="address" className="form-control" id="address" />
                                    <div className="error"><ErrorMessage name="address" /></div>
                                </div>*/}
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Enter Cell Number</label>
                                    <Field type="number" name="phone" className="form-control" id="phone" />
                                    <div className="error"><ErrorMessage name="phone" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <Field type="email" name="email" className="form-control" id="email" />
                                    <div className="error"><ErrorMessage name="email" /></div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="pssword" className="form-label">Enter Password</label>
                                    <Field type="password" name="password" className="form-control" id="password" />
                                    <div className="error"><ErrorMessage name="password" /></div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Confirm Password</label>
                                    <Field type="password" name="passwordConfirmation" className="form-control" />
                                    <div className="error"><ErrorMessage name="passwordConfirmation" /></div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success mt-2" style={{ width: "100%" }}>Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    )
}

const handleRegister = (values) => {
    return async (dispatch) => {
        console.log(values);
        const formData = new FormData();
        formData.append('fname', values.fname);
        formData.append('lname', values.lname);
        //formData.append('title', values.title);
        formData.append('photo', values.photo);
        //formData.append('address', values.address);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('password', values.password);
        //formData.append('description', values.description);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("/user_register", formData, config);
            console.log(response);
            const { user, msg, token } = response.data;
            toast.success(msg);
            console.log(user);
            localStorage.setItem("myToken", token);
            dispatch({ type: SET_TOKON, paylood: token });
        } catch (error) {
            console.log(error.response);
            const { msg } = error.response.data;
            //console.log(msg);
            toast.error(msg);
        }
    }
}

export default Signup;