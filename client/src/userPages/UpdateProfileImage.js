import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SET_TOKON } from '../store/reducers/AuthReducer';
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const UpdateProfileImage = (props) => {
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const {user, token} = useSelector(state=>state.AuthReducer);
    if(redirect){
        setTimeout(() => {
            props.history.push("/profile");
        }, 500);
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-8 col-md-6 col-lg-4 p-0">
                    <Formik
                        initialValues={{
                            photo: '',
                        }}
                        validationSchema={Yup.object({
                            photo: Yup.mixed().nullable().required("Required")
                                .test(
                                    "FILE_FORMAT",
                                    "Uploaded file has unsuported format.",
                                    (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
                                ),
                        })}
                        onSubmit={(values) => {
                            console.log(values);
                            // this fuction below the component
                            dispatch(handleSubmit(values, token, setRedirect, user));
                        }}
                    >
                        {({ setFieldValue }) => {
                            return (
                                <Form className="row g-2">
                                    <div className="col-sm-12">
                                        <input type="file" name="photo" hidden ref={fileRef} className="form-control"
                                            onChange={(e) => {
                                                setFieldValue("photo", e.target.files[0]);
                                                if (e.target.files[0]) {
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(e.target.files[0]);
                                                    reader.onload = () => setPreview(reader.result);
                                                } else {
                                                    setPreview(null)
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-sm-12">
                                        {
                                            preview && <img src={preview} alt="preview" className="rounded" width="100%" height="100%" />
                                        }
                                    </div>
                                    <div className="col-sm-12">
                                        <button onClick={(e) => { fileRef.current.click(); e.preventDefault() }} className="btn btn-primary form-control">Upload Photo</button>
                                        <div className="error"><ErrorMessage name="photo" /></div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success form-control">Submit</button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const handleSubmit = (values, token, setRedirect, user) => {
    return async (dispatch) => {
        console.log(values);
        const formData = new FormData();
        formData.append('photo', values.photo);
        formData.append('userId', user._id);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post("/update_profile_photo", formData, config);
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

export default UpdateProfileImage;