import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import Base from "./Base";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { isAuthenticated, signout } from "../auth/helper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const adId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("adId"))
    .split("=")[1];
  console.log(adId);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Navigate to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    let final_amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    final_amount = amount / 73.73;
    return final_amount.toFixed(2);
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("POINT-1", response);
          if (response.error) {
            if (response.code === "1") {
              alert("PAYMENT Failed!");
              signout(() => {
                return <Navigate to="/" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false });
            alert("PAYMENT SUCCESS");

            let product_id = "";
            products.forEach(function (item) {
              product_id += item.id + ", ";
            });

            const orderData = {
              products: product_id,
              transaction_id: response.transaction.id,
              amount: (response.transaction.amount * 73.73).toFixed(2),
              status: response.transaction.status,
              is_success: response.success,
              ad_id: adId,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.code === "1") {
                    alert("Order Failed!");
                    signout(() => {
                      return <Navigate to="/" />;
                    });
                  }
                } else {
                  if (response.success === true) {
                    alert("ORDER PLACED!!,Check you Order in order section");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            cartEmpty(() => {
              console.log("Did we got a crash?");
            });
            setReload(!reload);
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED", error);
        });
    });
  };

  const showbtnDropIn = () => {
    return (
      <div className="text-center">
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>
            <button onClick={onPurchase} className="btn btn-block btn-success">
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please login first or add something in cart</h3>
        )}
      </div>
    );
  };

  return (
    <Base>
      <br />
      <div className="container py-5">
        <div>
          <h3 className="text-center">
            Your bill is $ {getAmount()} or <i class="fa fa-rupee"></i>{" "}
            {(getAmount() * 73.73).toFixed(2)}
          </h3>
          {showbtnDropIn()}
        </div>
      </div>
    </Base>
  );
};

export default PaymentB;
