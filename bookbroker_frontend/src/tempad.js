import React, { useState, useEffect } from "react";
import "../home.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        document.cookie = "adId=;path=/";
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <div className="main-body container">
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="product-card col-12 col-lg-4">
                <Button variant="primary" onClick={handleShow}>
                  View Product Details
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    price: {product.price}
                    description : {product.descs}
                    <Button>Add to cart</Button>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
