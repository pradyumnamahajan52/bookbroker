import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "../MyOrder.css";
import { getMyOrder } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { Modal, Button } from "react-bootstrap";
import OrderModal from "../modal/OrderModal";

const MyOrder = () => {
  const userId = isAuthenticated && isAuthenticated().user.id;
  const [myOrder, setmyOrder] = useState([]);
  const [error, setError] = useState(false);

  const [modalshow, setmodalShow] = useState(false);

  const modalhandleClose = () => setmodalShow(false);

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

  // const OrderModal = () => {
  //   <Modal show={modal1show} onHide={modal1handleClose}>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Heading Text</Modal.Title>
  //     </Modal.Header>

  //     <Modal.Body>Modal content will sit here</Modal.Body>

  //     <Modal.Footer>
  //       <Button variant="secondary" onClick={modal1handleClose}>
  //         Close
  //       </Button>
  //       <Button variant="primary" onClick={modal1handleClose}>
  //         Submit
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>;
  // };

  return (
    <Base>
      <br />
      <div className="container py-5">
        <div className="order-note py-2">
          <div className="note">
            <div className="order-proposal">
              <h2>My Order's</h2>
            </div>
          </div>
        </div>
        {myOrder.map((order, index) => {
          if (order.user?.id === userId)
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
                    <Button
                      key={index}
                      id="confirm"
                      variant="primary"
                      onClick={() => setmodalShow(true)}
                    >
                      View Details
                    </Button>
                    <OrderModal
                      key={index}
                      orderInfo={order}
                      showModal={modalshow}
                      closeModalHandler={modalhandleClose}
                    />
                    {/* <button id="reject">Reject</button> */}
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </Base>
  );
};

export default MyOrder;
