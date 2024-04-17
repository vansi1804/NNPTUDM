import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { resetPasswordUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  password: yup.string().required("Password is Required"),
  confirmPassword: yup.string().required("Confirm Password is Required").oneOf([yup.ref('password'), null], 'Confirm password must match with password'),
});
const Resetpassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      token: token,
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(resetPasswordUser(values));
    },
  });


  const authState = useSelector((state) => state);

  const { forgotPaswordToken, isSuccess, isError, message } = authState.auth
  useEffect(() => {
    if (isSuccess && forgotPaswordToken) {
      toast.success("Check your mail to reset password!");
    }
    if (isError) {
      toast.error(`Something Went Wrong! ${message.message}`);
    }
  }, [isSuccess, isError, forgotPaswordToken, message.message]);

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
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

export default Resetpassword;
