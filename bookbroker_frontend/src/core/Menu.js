import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCart } from "./helper/cartHelper";
//import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

// const currentTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "#2ecc72" };
//   } else {
//     return { color: "#FFFFFF" };
//   }
// };

const Menu = (history, path) => {
  const [Cartproducts, setCartProducts] = useState([]);
  //const [reload, setReload] = useState(false);

  useEffect(() => {
    setCartProducts(loadCart());
  }, []);

  const cartProductLength = () => {
    if (Cartproducts && Cartproducts.length !== undefined) {
      return <p>{Cartproducts.length}</p>;
    } else {
      return <p>0</p>;
    }
  };

  return (
    //  NAVIGATION BAR

    <div className="navbar">
      <div className="brand-name">
        <h1>BookBroker</h1>
      </div>
      <div className="nav-search">
        <input type="search" name="search" placeholder="search here.." />
        <div>
          <i className="fa fa-2x fa-search"></i>
        </div>
      </div>
      <div className="navbar-options">
        <ul className="navbar-option-li">
          <li className="ul-1">
            <Link to="/">
              <i className="fa fa-2x fa-home"></i>
            </Link>
          </li>
          <li className="ul-2">
            <Link to="#" className="navbar-search">
              <i className="fa fa-2x fa-search"></i>
            </Link>
          </li>

          {isAuthenticated() && (
            <li className="ul-3">
              <Link to="/user/dashboard">
                <i className="fa fa-2x fa-user-circle"></i>
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <li className="ul-3">
              <Link to="/user/login">
                <i className="fa fa-2x fa-user-circle"></i>
              </Link>
            </li>
          )}

          {/* {isAuthenticated() && (
            <li className="ul-3">
              <span
                onClick={() => {
                  signout(() => {
                    window.location.href = "/";
                  });
                }}
                // className="nav-link text-warning"
              >
                <button type="button" variant="outline-warning">
                  Signout
                </button>
              </span>
            </li>
          )} */}

          {/* {% if user.is_authenticated %} */}
          {/* <li className="ul-3">
            <Link to="/user/login">
              <i className="fa fa-2x fa-user-circle"></i>
            </Link>
          </li> */}
          {/* {% else %} */}
          {/* <div className="top-navbar-login">
            <Link to="/user/login">Login</Link>
          </div> */}
          {/* {% endif %} */}

          <li className="ul-4">
            <Link to="/cart" setReload="true">
              <i className="fa fa-2x fa-shopping-cart"></i>
              {/* <p>0</p> */}
              {cartProductLength()}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
