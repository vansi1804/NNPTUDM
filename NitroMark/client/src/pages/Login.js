import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";


let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(loginUser(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isSuccess } = authState.auth;

  useEffect(() => {
    if (user && isSuccess) {
      // console.log(user);
      window.location.assign("/");
    }
  }, [user, navigate, isSuccess]);

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>

              <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                <CustomInput type="text"
                  label="Enter Your Email Address"
                  id="email"
                  name="email"
                  onChng={formik.handleChange("email")}
                  onBlr={formik.handleBlur("email")}
                  val={formik.values.email}
                />
                <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  label="Password"
                  id="password"
                  name="password"
                  onChng={formik.handleChange("password")}
                  onBlr={formik.handleBlur("password")}
                  val={formik.values.password}
                />
                <div className="error mt-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                {/* <div className="error">
                  {message.message === "Rejected" ? "Your email or password incorrected" : ""}
                </div> */}
                <div className="position-relative">
                  <Link to="/forgot-password" className="position-absolute top-0 end-0 fs-5">Forgot Password?</Link>
                </div>

                <div className="mt-5 d-flex justify-content-center gap-15 align-items-center ">
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                  <Link to="/signup" className="button signup">
                    SignUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
