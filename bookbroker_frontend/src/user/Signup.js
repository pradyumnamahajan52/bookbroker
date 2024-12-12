import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const {
    first_name,
    last_name,
    email,
    password,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ first_name, last_name, email, password })
      .then((data) => {
        console.log("data", data);
        if (data.email === email) {
          setValues({
            ...values,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            error: false,
            success: true,
          });
        } else {
          if (data.email !== undefined) {
            alert("user with this email already exists.");
          }
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please{" "}
            <Link to="/user/login">login now</Link>.
          </div>
        </div>
      </div>
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
            Check all fileds again
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="login-clean">
      {errorMessage()}
      {sucessMessage()}
      <form>
        <h2 className="sr-only">Create Account</h2>
        <div className="illustration"></div>
        <div className="form-group">
          <input
            value={first_name}
            onChange={handleChange("first_name")}
            className="form-control"
            type="text"
            name="first_name"
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={last_name}
            onChange={handleChange("last_name")}
            className="form-control"
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <button
            onClick={onSubmit}
            class="btn btn-primary btn-block"
            type="submit"
          >
            Register
          </button>
        </div>
        <Link className="forgot" to="/user/login">
          Already have an account? Sign in
        </Link>
      </form>
      {/* <p className="text-center py-2">{JSON.stringify(values)}</p> */}
    </div>

    // <div
    //   className="main-body container"
    //   style={{ backgroundColor: "darkgray" }}
    // >
    //   <div className="row">
    //     <div className="col-md-6 offset-sm-3 text-left">
    //       <form>
    //         <div className="form-group">
    //           <label className="text-light">First Name</label>
    //           <input
    //             className="form-control"
    //             //value={name}
    //             //onChange={handleChange("name")}
    //             type="text"
    //             required
    //           />

    //           <label className="text-light">Last Name</label>
    //           <input
    //             className="form-control"
    //             //value={name}
    //             //onChange={handleChange("name")}
    //             type="text"
    //             required
    //           />

    //           <label className="text-light">Email</label>
    //           <input
    //             className="form-control"
    //             //value={email}
    //             //onChange={handleChange("email")}
    //             type="email"
    //             required
    //           />

    //           <label className="text-light">Mobile No:</label>
    //           <input
    //             className="form-control"
    //             //value={phone}
    //             //onChange={handleChange("phone")}
    //             type="text"
    //           />

    //           <label className="text-light">Password</label>
    //           <input
    //             className="form-control"
    //             //value={password}
    //             //onChange={handleChange("password")}
    //             type="password"
    //             required
    //           />
    //         </div>
    //         <button
    //           //onClick={onSubmit}
    //           className="btn btn-success btn-block"
    //         >
    //           Register
    //         </button>
    //       </form>
    //       <br />
    //       Already have an account? <Link to="/user/login">Sign in</Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
