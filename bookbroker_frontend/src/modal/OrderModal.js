import React from "react";
import { Button, Modal } from "react-bootstrap";

const OrderModal = ({ orderInfo, showModal, closeModalHandler }) => {
  //   const [modal1show, setmodal1Show] = useState(false);

  //   const modal1handleClose = () => setmodal1Show(false);
  //   const modal1handleShow = () => setmodal1Show(true);

  return (
    <Modal show={showModal} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{orderInfo.product_id?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>Modal content will sit here</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={closeModalHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
