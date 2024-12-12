import React, { useState } from "react";

import { Link, Navigate } from "react-router-dom";
import "../loginstyle.css";
import {
  signin,
  authenticate,
  isAuthenticated,
  googleLogin,
  social_login,
} from "../auth/helper";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
// import googleLogin from "../auth/helper/googleLogin";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const fbResponse = (response) => {
    console.log(response);
  };
  const googleResponse = (response) => {
    // response.preventDefault();
    // console.log(response.profileObj)
    const userEmail = response.profileObj.email;
    const accessToken = response.accessToken;
    setValues({ ...values,error: false, loading: true });
    googleLogin({ accessToken })
      .then((data) => {
         social_login({ data, userEmail })
        .then((data_verify) => {
          if (data_verify.token) {
            //let sessionToken = data.token;
            authenticate(data_verify, () => {
              console.log("TOKKEN ADDED");
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          } else {
            alert(data.error);
            setValues({
              ...values,
              loading: false,
            });
          }
        })
        .catch((e) => console.log(e));
      }).catch((e) => console.log(e));
  };

  const onSumit = (event) => {
    //event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          //let sessionToken = data.token;
          authenticate(data, () => {
            console.log("TOKKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          alert(data.error);
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="login-clean">
      {errorMessage()}
      {loadingMessage()}
      <form method="post">
        <h2 className="sr-only">Login Form</h2>
        <div className="illustration"></div>
        <div className="form-group">
          <input
            className="form-control"
            value={email}
            onChange={handleChange("email")}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            value={password}
            onChange={handleChange("password")}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <button
            onClick={onSumit}
            class="btn btn-primary btn-block"
            type="submit"
          >
            Log In
          </button>
          <Link
            className="btn btn-primary btn-block"
            type="submit"
            to="/user/signup"
            style={{ background: "rgb(26, 171, 182)" }}
          >
            Create Your account
          </Link>
        </div>
        <Link className="forgot" to="#">
          Forgot your email or password?
        </Link>

        <FacebookLogin
            textButton="LOGIN WITH FACEBOOK"
            appId="164886228644184"
            fields="name,email,picture"
            callback={fbResponse}
            size="medium"
            icon="fa-facebook"
          />
         
          <br/>
          <GoogleLogin
            clientId="662886592812-l332lbkfjbdq5e30lch929id8j604mkl.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={googleResponse}
            onFailure={googleResponse}
          />

      </form>

      {/* <p className="text-center py-2">{JSON.stringify(values)}</p> */}
      {performRedirect()}
    </div>
  );
};

export default Signin;
