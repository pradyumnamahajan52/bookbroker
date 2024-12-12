import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Navigate, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import {
  addItemToCart,
  removeItemFromCart,
  loadCart,
} from "./helper/cartHelper";

// const isAuthenticated = true;

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [modal1show, setmodal1Show] = useState(false);
  const [Cartproducts, setCartProducts] = useState([]);

  const modal1handleClose = () => setmodal1Show(false);
  const modal1handleShow = () => setmodal1Show(true);

  const productTitle = product ? product.name : "A photo from pexels";
  // const cartDescription = product ? product.description : "Default description";
  const productPrice = product ? product.price : "Default";

  useEffect(() => {
    setCartProducts(loadCart());
  }, [reload]);

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
    console.log("added to cart");
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return addtoCart && <Button onClick={addToCart}>Add to Cart</Button>;
  };

  const showRemoveFromCart = (removeFromCart) => {
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
          Remove from cart
        </Button>
      )
    );
  };

  return (
    <div className="">
      {getAredirect(redirect)}
      <ImageHelper product={product} />
      <div className="product-card-info">
        <div id="price-btn">
          <i className="fa fa-rupee"></i>
          {productPrice}/-
        </div>
        <div id="view-btn">
          <Link to={`/product/${product.id}/`}>view</Link>
        </div>
        <div id="add-btn">{showAddToCart(addToCart)}</div>
      </div>
    </div>
  );
};

export default Card;
