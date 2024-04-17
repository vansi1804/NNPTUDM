import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ChangePasswordUser, getUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs-react";

let schema = yup.object().shape({
    oldPassword: yup.string().required("Password is Required"),
    password: yup.string().required("Password is Required"),
    confirmPassword: yup.string().required("Confirm Password is Required").oneOf([yup.ref('password'), null], 'Confirm password must match with password'),
});


const ChangePassword = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [info, setInfo] = useState();

    useEffect(() => {
        dispatch(getUser(id));
    }, [id, dispatch]);

    const authState = useSelector((state) => state.auth);
    useEffect(() => {
        if (authState.userinfo) {
            const { user } = authState.userinfo;
            setInfo(user);
        }
    }, [authState.userinfo])

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            bcrypt.compare(formik.values.oldPassword, info.password, function (err, res) {
                if (err) {
                    // handle error
                    toast.error(`Password do not match`);
                }
                if (res) {
                    dispatch(ChangePasswordUser(values));
                    toast.success("Change password Successfully!");

                } else {
                    // response is OutgoingMessage object that server response http request
                }
            });
        },
    });



    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumb title="Reset Password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Change Password</h3>
                            <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                                <CustomInput type="password"
                                    label="Enter Your Old Password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    onChng={formik.handleChange("oldPassword")}
                                    onBlr={formik.handleBlur("oldPassword")}
                                    val={formik.values.oldPassword}
                                />
                                <div className="error mt-2">
                                    {formik.touched.oldPassword && formik.errors.oldPassword}
                                </div>

                                <CustomInput type="password"
                                    label="Enter Your New Password"
                                    id="password"
                                    name="password"
                                    onChng={formik.handleChange("password")}
                                    onBlr={formik.handleBlur("password")}
                                    val={formik.values.password}
                                />
                                <div className="error mt-2">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <CustomInput type="password"
                                    label="Enter Your Confirm New Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChng={formik.handleChange("confirmPassword")}
                                    onBlr={formik.handleBlur("confirmPassword")}
                                    val={formik.values.confirmPassword}
                                />
                                <div className="error mt-2">
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
                                </div>
                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit">Ok</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ChangePassword;
