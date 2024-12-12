import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "../MyOrder.css";
import { getMyOrder } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import OrderModal from "../modal/OrderModal";
import CustomAlert from "../modal/CustomAlert";

const SellerOrder = () => {
  const userId = isAuthenticated && isAuthenticated().user.id;
  const [myOrder, setmyOrder] = useState([]);
  const [error, setError] = useState(false);

  const loadmyOrder = () => {
    getMyOrder().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        document.cookie = "adId=;path=/";
        setmyOrder(data);
      }
    });
  };

  useEffect(() => {
    loadmyOrder();
  }, []);

  return (
    <Base>
      <br />
      <div className="container py-5">
        <div className="order-note py-2">
          <div className="note">
            <div className="order-proposal">
              <h2>Hey!You got a Order</h2>
            </div>
          </div>
        </div>
        {myOrder.map((order, index) => {
          if (order.product_id?.product_by === userId)
            return (
              <div className="order-note py-2">
                <div className="note">
                  {/* <div className="order-proposal">
                    <h2>Hey!You got a Order</h2>
                  </div> */}
                  <div className="in-note">
                    <div className="note-img">
                      <img src={order.product_id?.image} alt="" />
                    </div>
                    <div className="note-name">
                      <h2>{order.product_id?.name}</h2>
                    </div>
                  </div>

                  <div className="note-buttons">
                    <button id="confirm" onClick={() => CustomAlert()}>
                      Confirm
                    </button>
                    <button id="reject">Reject</button>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </Base>
  );
};

export default SellerOrder;
