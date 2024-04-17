import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../features/products/productSlice";
import { updateAUser } from "../features/user/userSlice";
import Container from "../components/Container";

let schema = yup.object().shape({
    firstname: yup.string().required("First name is Required"),
    lastname: yup.string().required("Last name is Required"),
    email: yup.string(),
    mobile: yup.string().required("Mobile is Required"),
    address: yup.string().required("Address is Required"),
});

const ViewUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const User = useSelector((state) => state.auth);

    const { isSuccess, isError, user, updateUser } = User.userinfo || {};
    useEffect(() => {
        if (isSuccess && updateUser) {
            toast.success("Updated Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, updateUser, navigate]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: id || "",
            firstname: user?.firstname || "",
            lastname: user?.lastname || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            address: user?.address || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(updateAUser(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);

        },
    });

    return (
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="mb-4 title text-center">User {`${formik.values.lastname} ${formik.values.firstname}`}</h3>
                        <div>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex gap-3 flex-column"
                            >
                                <CustomInput
                                    type="text"
                                    label="First Name"
                                    name="firstname"
                                    onChng={formik.handleChange("firstname")}
                                    onBlr={formik.handleBlur("firstname")}
                                    val={formik.values.firstname}
                                />
                                <div className="error">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                                <CustomInput
                                    type="text"
                                    label="Last Name"
                                    name="lastname"
                                    onChng={formik.handleChange("lastname")}
                                    onBlr={formik.handleBlur("lastname")}
                                    val={formik.values.lastname}
                                />
                                <div className="error">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                                <CustomInput
                                    type="email"
                                    label="Email"
                                    name="email"
                                    onChng={formik.handleChange("email")}
                                    onBlr={formik.handleBlur("email")}
                                    val={formik.values.email}
                                />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>

                                <CustomInput
                                    type="text"
                                    label="Mobile Phone"
                                    name="mobile"
                                    onChng={formik.handleChange("mobile")}
                                    onBlr={formik.handleBlur("mobile")}
                                    val={formik.values.mobile}
                                />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="text"
                                    label="Address"
                                    name="address"
                                    onChng={formik.handleChange("address")}
                                    onBlr={formik.handleBlur("address")}
                                    val={formik.values.address}
                                />
                                <div className="error">
                                    {formik.touched.address && formik.errors.address}
                                </div>

                                <button
                                    className="btn btn-success border-0 rounded-3 my-5"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ViewUser;
