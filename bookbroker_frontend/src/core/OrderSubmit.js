import React, { useState, useEffect } from "react";
import Base from "./Base";
import { getOrderAddress } from "./helper/orderHelper";
import { loadCart } from "./helper/cartHelper";
import { Button } from "react-bootstrap";

const OrderSubmit = () => {
  const [OrderAddress, setOrderAddress] = useState([]);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  const adId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("adId"))
    .split("=")[1];
  console.log(adId);

  const loadOrderAddress = () => {
    getOrderAddress(parseInt(adId)).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        console.log(data);
        setOrderAddress(data);
      }
    });
  };

  useEffect(() => {
    loadOrderAddress();
  }, []);

  function OrderAlert() {
    alert("Please Add Product in Cart");
  }

  return (
    <Base>
      <hr />
      <div className="container py-5">
        <div className="form-group">
          {/* <label for="formControlRange">Example Range input</label> */}
          <input
            type="range"
            className="form-control-range"
            id="formControlRange"
            value="50"
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
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Deliver to:</h4>
              <h6>
                {OrderAddress.house_name} {OrderAddress.Area},
              </h6>
              <h6>{OrderAddress.Landmark}</h6>
              <h6>
                {OrderAddress.city}, {OrderAddress.state},{" "}
                {OrderAddress.pincode}
              </h6>
            </div>
            <div>
              {products.length > 0 ? (
                <Button
                  variant="success"
                  onClick={() => {
                    window.location.href = "/order/confirm/payment";
                  }}
                  size="lg"
                  block
                >
                  Place Order
                </Button>
              ) : (
                // <PaymentB products={products} setReload={setReload} />
                <Button variant="success" onClick={() => OrderAlert()}>
                  Place Order
                </Button>
              )}
            </div>
            {/* <div class="col">
              <h4>Deliver to:</h4>
            </div> */}
          </div>
          <div className="row">
            {products.map((product, index) => (
              <div class="cart-items" key={index}>
                <div class="product-cart-items">
                  <div class="product-detail">
                    <h6>{product.name}</h6>
                    <p>
                      <i class="fa fa-rupee"></i> {product.price} /-{" "}
                    </p>
                    <p>
                      {" "}
                      Product By <b>{product.product_by?.first_name}</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default OrderSubmit;
