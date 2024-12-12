import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Base from "./Base";
import { getuserAddress, userAddress } from "./helper/addressHelper";
import { isAuthenticated } from "../auth/helper";
import "../Address.css";
import { Link } from "react-router-dom";

const Address = () => {
  const userId = isAuthenticated && isAuthenticated().user.id;
  const [address, setAddress] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadAllAddress = () => {
    getuserAddress().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        // console.log(data.user_id);
        // console.log(typeof data);
        // console.log(data);
        // data.map((d1) => {
        //   if (d1.user_id == userId) {
        //     console.log(d1);
        //   }
        // });

        setAddress(data);
      }
    });
  };

  useEffect(() => {
    loadAllAddress();
  }, []);

  function passAddressOrder(adId) {
    document.cookie = "adId=" + adId + ";path=/";
    window.location.href = "/order/confirm";
  }

  //  console.log(address);
  return (
    <Base>
      <hr />
      <div className="container py-5">
        <div class="form-group">
          {/* <label for="formControlRange">Example Range input</label> */}
          <input
            type="range"
            class="form-control-range"
            id="formControlRange"
            value="25"
            readOnly
            list="tickmarks"
          />
          <datalist id="tickmarks">
            <option value="0" label="0%"></option>
            <option value="25" label="25%"></option>
            <option value="50" label="50%"></option>
            <option value="75" label="75%"></option>
            <option value="100" label="100%"></option>
          </datalist>
        </div>
        <hr />
        <div class="container py-2">
          <div class="row justify-content-md-center">
            <div class="col-md-auto">
              <Link to="/order/address/add">
                <Button variant="outline-info" size="lg" block>
                  Add New Address
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="address">
          <h1>Your Address</h1>
        </div>
        <br />
        {address.map((ad, index) => {
          if (ad.user_id === userId)
            return (
              <div className="address">
                <hr />
                <form>
                  <div className="full-in">
                    <div className="form-group">
                      <label>House name :</label>
                      <input
                        type="text"
                        placeholder="Enter the name of house"
                        readOnly={false}
                        value={ad.house_name}
                      />
                    </div>

                    <div className="form-group">
                      <label>Area :</label>
                      <input
                        type="text"
                        placeholder="Enter the area"
                        readOnly
                        value={ad.Area}
                      />
                    </div>

                    <div className="form-group">
                      <label>Landmark :</label>
                      <input
                        type="text"
                        placeholder="Near xyz"
                        readOnly
                        value={ad.Landmark}
                      />
                    </div>
                  </div>
                  <div className="line-in">
                    <div className="form-group">
                      <label>city :</label>
                      <input
                        type="text"
                        placeholder="Enter your city"
                        readOnly
                        value={ad.city}
                      />
                    </div>

                    <label>state :</label>
                    <br />
                    <select readOnly value={ad.state}>
                      <option selected>_________</option>

                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Andaman and Nicobar Islands union territory">
                        Andaman and Nicobar Islands union territory
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
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
                      <option value="Jammu and kashmir">
                        Jammu and kashmir
                      </option>
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
                        placeholder="12345"
                        readOnly
                        value={ad.pincode}
                      />
                    </div>
                  </div>
                </form>
                <hr />
                <div className="bot-buttons">
                  <button id="change-delivery-address">Edit</button>
                  <button id="submit" onClick={() => passAddressOrder(ad.id)}>
                    {" "}
                    Use this Address
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </Base>
  );
};

export default Address;
