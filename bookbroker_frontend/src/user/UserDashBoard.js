import React, { useState } from "react";
import Base from "../core/Base";
import "../myprofile.css";
import { signout, isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const UserDashBoard = () => {
  const userFirst_Name = isAuthenticated && isAuthenticated().user.first_name;
  const userLast_Name = isAuthenticated && isAuthenticated().user.last_name;
  const useremail = isAuthenticated && isAuthenticated().user.email;
  const userphone = isAuthenticated && isAuthenticated().user.phone;
  const useris_seller = isAuthenticated && isAuthenticated().user.is_seller;

  const [modal1show, setmodal1Show] = useState(false);

  const modal1handleClose = () => setmodal1Show(false);
  const modal1handleShow = () => setmodal1Show(true);

  return (
    <Base>
      <div className="main-body">
        <div className="my-account">
          <div className="my-account-detail">
            <div>
              <p className="text-center">
                <img
                  src={`https://avatars.dicebear.com/api/initials/${userFirst_Name} ${userLast_Name}.svg`}
                  className="avatar"
                  alt="Avatar"
                />
              </p>
            </div>
            <div className="my-account-detail-text">
              <h6>
                {userFirst_Name} {userLast_Name}{" "}
              </h6>
              <p>{useremail}</p>
            </div>
          </div>

          {/* <div className="my-acc-edit-form">
            <form action="/user/user_account_update/" method="POST">
              <label>First Name :</label>
              <br />
              <input
                type="text"
                name="firstname"
                id="name-edit"
                value="{{user.first_name}}"
                required
              />
              <br />
              <label>Last Name :</label>
              <br />
              <input
                type="text"
                name="lastname"
                id="name-edit"
                value="{{user.last_name}}"
                required
              />
              <br />
              <label>Mobile No. :</label>
              <br />
              <input
                type="number"
                name="phone_no"
                id="name-edit"
                value="{{user.phone}}"
              />
              <br />
              <label>Email Id :</label>
              <br />
              <input
                type="email"
                name="email"
                id="name-edit"
                value="{{user.email}}"
                required
              />
              <br />
              <a href="/user/accounts/password_change/">
                <h6 className="back-option">
                  <i className="fa fa-arrow-left"></i> Reset Passowrd
                </h6>
              </a>

              <button id="detail-save-btn">Save</button>
            </form>
          </div> */}
          <Modal show={modal1show} onHide={modal1handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>User Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {/* <div className="my-acc-edit-form"> */}
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="email"
                      readonly
                      class="form-control-plaintext"
                      id="staticEmail"
                      value={useremail}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="firstname" class="col-sm-2 col-form-label">
                    First Name
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      id="firstname"
                      value={userFirst_Name}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="lastname" class="col-sm-2 col-form-label">
                    Last Name
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      id="lastname"
                      value={userLast_Name}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="phone" class="col-sm-2 col-form-label">
                    Mobile No
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      value={userphone}
                    />
                  </div>
                </div>
              </form>
              {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
              <Link to="/signin">
                <Button variant="info" onClick={modal1handleClose}>
                  Save
                </Button>
              </Link>
              <Button variant="secondary" onClick={modal1handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Link onClick={modal1handleShow}>
            <div className="edit-btn">
              Edit Details<i className="fa fa-2x  fa-caret-right"></i>
            </div>
          </Link>

          <div className="my-account-options">
            <ul>
              <li>
                <Link to="/user/order/myorder">
                  <div className="myy">
                    My shopping<i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <a href="/helpus">
                  <div className="myy">
                    Help<i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </a>
              </li>
              <li>
                <Link to="/callsupport">
                  <div className="myy">
                    Call support<i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/aboutus">
                  <div className="myy">
                    About us<i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/user/product/add">
                  <div className="myy">
                    Sell Your Product
                    <i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/user/order/sellorder">
                  <div className="myy">
                    List of Product Sell By You
                    <i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/user/order/sellorder">
                  <div className="myy">
                    List of Your Product
                    <i className="fa fa-2x  fa-caret-right"></i>
                  </div>
                </Link>
              </li>
              {isAuthenticated() && (
                <li>
                  <Link
                    onClick={() => {
                      signout(() => {
                        window.location.href = "/";
                      });
                    }}
                  >
                    <div className="myy">
                      Signout
                      <i className="fa fa-2x  fa-caret-right"></i>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
