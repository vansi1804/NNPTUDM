import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../features/product/productSlice";
import { getAUser, updateAUser } from "../features/auth/authSlice";

const ViewUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAUser(id));
    }, [dispatch, id]);


    const User = useSelector((state) => state.auth);
    const { isSuccess, isError, getauser, updateUser } = User;
    useEffect(() => {

        if (isSuccess && updateUser) {
            toast.success("Updated Successfullly!");
            navigate("/admin/customers");

        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, updateUser, navigate]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: getauser?.user?._id || "",
            firstname: getauser?.user?.firstname || "",
            lastname: getauser?.user?.lastname || "",
            email: getauser?.user?.email || "",
            mobile: getauser?.user?.mobile || "",
            role: getauser?.user?.role || "",
            address: getauser?.user?.address || "",
        },
        onSubmit: (values) => {
            // console.log(values);
            dispatch(updateAUser(values.id));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title text-center">Customer</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="First Name"
                        name="firstname"
                        val={formik.values.firstname}
                        disabled
                    />

                    <CustomInput
                        type="text"
                        label="Last Name"
                        name="lastname"
                        val={formik.values.lastname}
                        disabled
                    />

                    <CustomInput
                        type="email"
                        label="Email"
                        name="email"
                        val={formik.values.email}
                        disabled
                    />

                    <CustomInput
                        type="text"
                        label="Phone Number"
                        name="mobile"
                        val={formik.values.mobile}
                        disabled
                    />

                    <CustomInput
                        type="text"
                        label="Address"
                        name="address"
                        val={formik.values.address}
                        disabled
                    />

                    <select
                        name="role"
                        value={formik.values.role}
                        className="form-control py-3 mb-3"
                    >
                        <option value="admin">admin</option>
                        <option value="user">user</option >
                    </select>

                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ViewUser;
