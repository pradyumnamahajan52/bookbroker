import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../cart.css";
import { loadCart } from "./helper/cartHelper";
import { Button } from "react-bootstrap";
import { removeItemFromCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Cart = () => {
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const removeFromCart = true;

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const showRemoveFromCart = (removeFromCart, product) => {
    return (
      removeFromCart && (
        <Button
          variant="outline-danger mt-2 mb-2"
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          block
        >
          Delete
        </Button>
      )
    );
  };

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <div class="cart-items" key={index}>
            <Link>
              <div class="product-cart-items">
                <div class="product-pic">
                  <img src={product.image} alt="" />
                </div>
                <div class="product-detail">
                  <h6>{product.name}</h6>
                  <p>
                    <i class="fa fa-rupee"></i> {product.price} /-{" "}
                    {showRemoveFromCart(removeFromCart, product)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          //   <Card
          //     key={index}
          //     product={product}
          //     removeFromCart={true}
          //     addtoCart={false}
          //     reload={reload}
          //     setReload={setReload}
          //   />
        ))}
      </div>
    );
  };

  const getAmount = (products) => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  return (
    <Base>
      <div className="main-body">
        <div class="cart-section">
          <div class="cart-summary">
            <table>
              <tr>
                <td>Total Items</td>
                <td>: {products.length}</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td>: {getAmount(products)}</td>
              </tr>
            </table>
          </div>
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No products</h4>
          )}
          {/** cart carf */}
        </div>

        {isAuthenticated() && (
          <div class="bottom-btn">
            <Link to="/order/address">
              <button>Confirm Booking</button>
            </Link>
          </div>
        )}

        {!isAuthenticated() && (
          <div class="bottom-btn">
            <Link onClick={() => alert("Please Login!!!")}>
              <button>Confirm Booking</button>
            </Link>
          </div>
        )}

        {/* {!isAuthenticated() && (
          <div class="bottom-btn">
            <Link onClick={alert("Login Please")}>
              <button>Confirm Booking</button>
            </Link>
          </div>
        )} */}
      </div>
    </Base>
  );
};

export default Cart;
