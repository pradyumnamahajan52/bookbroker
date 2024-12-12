import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { userAddress } from "./helper/addressHelper";
import Base from "./Base";
import "../Address.css";
import { Link } from "react-router-dom";

const AddAddress = () => {
  const userId = isAuthenticated && isAuthenticated().user.id;

  const [values, setValues] = useState({
    user_id: userId,
    pincode: "",
    house_name: "",
    Area: "",
    Landmark: "",
    city: "",
    state: "",
    addresserror: "",
    success: false,
  });

  const {
    user_id,
    pincode,
    house_name,
    Area,
    Landmark,
    city,
    state,
    addresserror,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, addresserror: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, addresserror: false });
    userAddress({ user_id, pincode, house_name, Area, Landmark, city, state })
      .then((data) => {
        console.log("data", data);
        if (data.user_id === userId) {
          setValues({
            ...values,
            user_id: userId,
            pincode: "",
            house_name: "",
            Area: "",
            Landmark: "",
            city: "",
            state: "",
            addresserror: false,
            success: true,
          });
        } else {
          if (
            data.pincode !== undefined ||
            data.house_name !== undefined ||
            data.Area !== undefined ||
            data.city !== undefined ||
            data.state !== undefined
          ) {
            alert("All field may not be blank expect 'Landmark field'");
          }
          setValues({
            ...values,
            addresserror: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New address add successfully. Please, go back to{" "}
            <Link to="/order/address">Address Page</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-danger"
            style={{ display: addresserror ? "" : "none" }}
          >
            Check all fileds again
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <br />
      <div className="container py-5">
        {errorMessage()}
        {sucessMessage()}

        <div className="address">
          <h1>Add Your Address</h1>
          <hr />
          <form>
            <div className="full-in">
              <div className="form-group">
                <label>House name :</label>
                <input
                  type="text"
                  name="housename1"
                  placeholder="123 xyz house"
                  value={house_name}
                  onChange={handleChange("house_name")}
                />
              </div>

              <div className="form-group">
                <label>Area :</label>
                <input
                  type="text"
                  name="area"
                  placeholder="1234 Main St"
                  value={Area}
                  onChange={handleChange("Area")}
                />
              </div>

              <div className="form-group">
                <label>Landmark :</label>
                <input
                  type="text"
                  name="landmark"
                  value={Landmark}
                  onChange={handleChange("Landmark")}
                  placeholder="Near Apartment, studio, or floor"
                />
              </div>
            </div>
            <div className="line-in">
              <div className="form-group">
                <label>city :</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleChange("city")}
                />
              </div>

              <label>state :</label>
              <br />
              <select
                name="state"
                value={state}
                onChange={handleChange("state")}
              >
                <option selected>_________</option>

                <option value="Maharashtra">Maharashtra</option>
                <option value="Andaman and Nicobar Islands union territory">
                  Andaman and Nicobar Islands union territory
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and kashmir">Jammu and kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry </option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <div className="form-group">
                <label>pincode :</label>
                <br />
                <input
                  type="text"
                  name="pincode"
                  value={pincode}
                  onChange={handleChange("pincode")}
                />
              </div>
            </div>
          </form>
          <hr />
          <div className="bot-buttons justify-content-md-center">
            {/* <button id="change-delivery-address">Edit</button> */}
            <button id="submit" onClick={onSubmit}>
              {" "}
              Add{" "}
            </button>
          </div>
        </div>
        <p className="text-center py-2">{JSON.stringify(values)}</p>
      </div>
    </Base>
  );
};

export default AddAddress;
