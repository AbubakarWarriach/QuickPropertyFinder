import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SET_TOKON } from '../store/reducers/AuthReducer';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email("Invaliad").required("email must be required"),
    password: Yup.string().min(6, "maximum 6 length").max(12, "too long").required("password must be required"),
});

const SignunCustomer = () => {
    const dispatch = useDispatch();
    return (
        <div className="container">
            <Toaster />
            <div className="row login-form-main">
                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-10 mx-auto mb-5 login-form">
                <h1 className="text-center">Login</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            //console.log(values);
                            //this function below the component
                            dispatch(handleLogin(values));
                        }}
                    >
                        <Form className="row g-1">
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
                                <button type="submit" className="btn btn-success mt-2" style={{ width: "100%" }}>Login</button>
                            </div>
                            <Link type="button" class="btn btn-link" to="/signup_customer">SignUp</Link>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}

const handleLogin = (values) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        try {
            const response = await axios.post("/customerSignin", values, config);
            const { msg, token } = response.data;
            localStorage.setItem("customerToken", token);
            dispatch({ type: SET_TOKON, paylood: token });
            toast.success(msg);
        } catch (error) {
            //console.log(error.response);
            const { msg } = error.response.data;
            //const {msg} = data;
            console.log(msg);
            toast.error(msg);
        }
    }
}

export default SignunCustomer;