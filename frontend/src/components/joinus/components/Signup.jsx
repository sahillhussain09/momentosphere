import "./join.css";
import signupImg from "../../../assets/images/signup_background.jpg";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { useFormik } from "formik";
import { signupSchemas } from "../schemas/index";
import { useNavigate } from "react-router-dom";
import App from "./OtpVerification";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterAction } from "../../../redux/actions/UserActions";
import { useEffect } from "react";

function Signup() {
  const [showpass, setShowPass] = useState(false);
  const registerDispatch = useDispatch();
  const { registerData, registerError, registerLoading } = useSelector((state) => state.registerReducer)


  // registerError && registerError.success === false ? console.log(registerError.message) : console.log(registerData);
  console.log(registerData);


  const Otp_verifaction = useNavigate();
  const register_success = useNavigate();


  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchemas,
    onSubmit: (value) => {
      registerDispatch(userRegisterAction(value))
    }
  });

  useEffect(async () => {
    await registerData.success ? register_success("/") : false
  }, onsubmit)


  return (
    <div className="signup">
      <div className="signup-box">
        <div className="signup-left">
          <img alt="signup-img" src={signupImg} />
        </div>
        <div className="signup-right">
          <div className="signup-heading">
            <h3>
              welcome to <span style={{ color: "tomato" }}>MomentoSphere</span>{" "}
              {/* moments sharing app. */}
            </h3>
          </div>
          <div className="form-input">
            <form onSubmit={handleSubmit}>
              <div className="f-input">
                <label>enter your email</label>
                <input
                  className="input"
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <span className="requred">{errors.email}</span>
                ) : null}
              </div>

              <div className="f-input">
                <label>enter your username</label>
                <input
                  className="input"
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  // value={emptyVal ? values.username : ""}
                  onChange={handleChange}
                />

                {errors.username && touched.username ? (
                  <span className="requred">{errors.username}</span>
                ) : null}
              </div>

              <div className="f-input">
                <label>enter your password</label>
                <input
                  type={showpass ? "text" : "password"}
                  className="input"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <span className="requred">{errors.password}</span>
                ) : null}
                <BsFillEyeFill
                  className="show-pass"
                  onClick={() => setShowPass(!showpass)}
                />
              </div>

              <div className="form-bottom-signup">
                <Link to={"/"} className="signin">
                  Do you have'nt account?
                </Link>
              </div>
              <div className="login-error">
                <p> {registerError ? registerError.message : null} </p>
              </div>
              <div className="form-btn">
                <button className="primary-btn" type="submit">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
