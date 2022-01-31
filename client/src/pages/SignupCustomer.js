import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
import { SET_TOKON_CUSTOMER } from "../store/reducers/CustomerReducer";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Invaliad").required("Required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    passwordConfirmation: Yup
        .string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.number().min(100000000, "Number is to short").max(999999999999, "Number is to Long")
        .required('Required'),
});

const SignupCustomer = () => {
    const dispatch = useDispatch();
    return (
        <div className="container">
            <Toaster />
            <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 col-10 mx-auto mb-5 signup-form">
                    <h1 className="text-center text-success mb-4">Registration</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={ validationSchema }
                        onSubmit={(values)=>{
                            //console.log(values);
                            dispatch(handleRegister(values));
                        }}
                    >
                        {() => (
                            <Form className="row g-1">
                                <div className="col-sm-12">
                                    <label htmlFor="name" className="form-label">Enter Name</label>
                                    <Field type="text" name="name" className="form-control" id="name" />
                                    <div className="error"><ErrorMessage name="name" /></div>
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="email" className="form-label">Enter email</label>
                                    <Field type="email" name="email" className="form-control" id="email" />
                                    <div className="error"><ErrorMessage name="email" /></div>
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="phone" className="form-label">Enter phone</label>
                                    <Field type="number" name="phone" className="form-control" id="phone" />
                                    <div className="error"><ErrorMessage name="phone" /></div>
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="password" className="form-label">Enter password</label>
                                    <Field type="password" name="password" className="form-control" id="password" />
                                    <div className="error"><ErrorMessage name="password" /></div>
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="passwordConfirmation" className="form-label">Confirm password</label>
                                    <Field type="password" name="passwordConfirmation" className="form-control" id="passwordConfirmation" />
                                    <div className="error"><ErrorMessage name="passwordConfirmation" /></div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success mt-2" style={{ width: "100%" }}>SignUp</button>
                                </div>
                                <Link type="button" class="btn btn-link" to="/signin_customer">Signin</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const handleRegister = (values) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("/customerSignup", values, config);
            console.log(response);
            const { customer, msg, token } = response.data;
            toast.success(msg);
            console.log(customer);
            localStorage.setItem("customerToken", token);
            dispatch({ type: SET_TOKON_CUSTOMER, paylood: token });
        } catch (error) {
            //console.log(error.response);
            const { msg } = error.response.data;
            //console.log(msg);
            toast.error(msg);
        }
    }
}

export default SignupCustomer;