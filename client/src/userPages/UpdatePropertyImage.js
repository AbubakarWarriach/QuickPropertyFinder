import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
    photo: Yup.mixed().nullable().required("Image must be required")
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsuported format.",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
        ),
})

const UpdatePropertyImage = ({ property, id }) => {
    console.log(property);
    console.log(id);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    const { token } = useSelector(state => state.AuthReducer);
    return (
        <div className="container">
            <h1 className='text-center text-success my-5'>Update Property Image</h1>
            <div className='row'>
                <div className='col-sm-10 col-md-5 col-xxl-4 mx-auto'>
                    <Formik
                        initialValues={{
                            photo: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            //this function below the component
                            dispatch(handleSubmit(values, token, id));
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className='mb-5'>
                                    <input type="file" name="photo" hidden ref={fileRef}
                                        onChange={(e) => {
                                            setFieldValue("photo", e.target.files[0]);
                                            if (e.target.files[0]) {
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
                                            preview && <img src={preview} alt="preview" width="50%" height="100%" />
                                        }
                                    </div>
                                    <button onClick={(e) => { fileRef.current.click(); e.preventDefault() }}
                                        className="btn btn-primary">Upload Photo</button>
                                    <div className="error"><ErrorMessage name="photo" /></div>
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
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
    return async(dispatch) => {
        console.log(values);
        const formData = new FormData();
        formData.append('photo', values.photo);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post(`/update_property_image/${id}`, formData, config);
            console.log(response);
            toast.success("Property Image is uploaded");
        } catch (error) {
            console.log(error.response);
        }
    }
}

export default UpdatePropertyImage;