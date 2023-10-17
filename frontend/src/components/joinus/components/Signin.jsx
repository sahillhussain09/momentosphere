import React, { useEffect, useState, useContext } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAction } from "../../../redux/actions/UserActions"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner"

function Signin() {
  const [showpass, setShowPass] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  const loginDispatch = useDispatch();

  const { data, error, loading } = useSelector((state) => state.loginReducer);

  const userData = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  // loginDispatch(userLoginAction(userLogin))

  const handleSubmit = (e) => {
    e.preventDefault()
    loginDispatch(userLoginAction(userLogin))
  }


  return (
    <div className="signup">
      <div className="signup-box">
        <form className="signin-right" onSubmit={(e) => handleSubmit(e)}>
          <div className="signup-heading">
            <h3>
              log in to <span style={{ color: "tomato" }}>MomentoSphere</span>
            </h3>
          </div>
          <div className="form-input">
            <div className="f-input">
              <label>enter your username</label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={(e) => userData(e)}
                required
              />
            </div>

            <div className="f-input">
              <label>enter your password</label>
              <input
                type={showpass ? "text" : "password"}
                className="input"
                name="password"
                onChange={(e) => userData(e)}
                required
              />
              <BsFillEyeFill
                className="show-pass"
                onClick={() => setShowPass(!showpass)}
              />
            </div>

            <div className="form-bottom">
              <Link className="forget-pass">forget password</Link>
              <Link to={"/signup"} className="signin">
                Create account here?
              </Link>
            </div>

            <div className="login-error">
              <p> {error ? error.message : ""} </p>
            </div>
            <div className="form-btn">
              <button type="submit" className="primary-btn" >
                {loading ?
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="1"
                    width="20"
                    visible={true}
                  /> : "login"
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
