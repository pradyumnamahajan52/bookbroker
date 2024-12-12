import React, { useState } from "react";
import Base from "./Base";
import "../SellerSide.css";
import { Button } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper";
import { AddSellerProducts } from "./helper/coreapicalls";
import { Link } from "react-router-dom";

const SellYourProduct = () => {
  const userId = isAuthenticated && isAuthenticated().user.id;

  const [values, setValues] = useState({
    product_category: "",
    name: "",
    product_by: userId,
    image: null,
    Original_price: "",
    price: "",
    stock: "",
    point_desc: "",
    long_desc: "",
    producterror: "",
    success: false,
  });

  const {
    product_category,
    name,
    product_by,
    image,
    Original_price,
    price,
    stock,
    point_desc,
    long_desc,
    producterror,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, producterror: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, producterror: false });
    AddSellerProducts({
      product_category,
      name,
      product_by,
      image,
      Original_price,
      price,
      stock,
      point_desc,
      long_desc,
    })
      .then((data) => {
        console.log("data", data);
        if (data.user_id === userId) {
          setValues({
            ...values,
            product_category: "",
            name: "",
            product_by: userId,
            image: null,
            Original_price: "",
            price: "",
            stock: "",
            point_desc: "",
            long_desc: "",
            producterror: false,
            success: true,
          });
        } else {
          if (
            data.name !== undefined ||
            data.image !== undefined ||
            data.Original_price !== undefined ||
            data.price !== undefined ||
            data.stock !== undefined ||
            data.long_desc !== undefined
          ) {
            alert("All field may not be blank expect 'Point field'");
          }
          setValues({
            ...values,
            producterror: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New address add successfully. Please, go back to{" "}
            <Link to="/order/address">Address Page</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-danger"
            style={{ display: producterror ? "" : "none" }}
          >
            Check all fileds again
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <br />
      <div className="container py-5">
        {errorMessage()}
        {sucessMessage()}

        <div className="seller-form">
          <h5>Sell out my product!</h5>
          <form enctype="multipart/form-data">
            <div className="form-group">
              <label>Select type of Book :</label>
              <select
                id="book-option"
                value={product_category}
                onChange={handleChange("product_category")}
                name="bookoption"
              >
                <option value="Books" selected>
                  Books
                </option>
              </select>
            </div>
            <div className="form-group">
              <label>Product Name :</label>
              <input
                type="text"
                name="name"
                placeholder=""
                value={name}
                onChange={handleChange("name")}
                required
              />
            </div>
            <div className="form-group">
              <label>Image :</label>
              <input
                type="file"
                name="image"
                value={image}
                onChange={handleChange("image")}
                required
              />
            </div>
            <div className="form-group">
              <label>MRP :</label>
              <input
                type="number"
                name="mrp"
                id="mrp"
                value={Original_price}
                onChange={handleChange("Original_price")}
                // oninput="mrpFunction()"
              />
              {/* <script>
                    function mrpFunction() {
                        var mrpPrice = document.getElementById('mrp').value;
                        var sellPrice = 0;
                        var sellPrice = mrpPrice/2;
                        document.getElementById('Sellprice').value = sellPrice;
                    }
                </script> */}
            </div>
            <div className="form-group">
              <label>sellPrice:</label>
              <input
                type="number"
                name="sellprice"
                id="Sellprice"
                placeholder=""
                value={price}
                onChange={handleChange("price")}
              />
            </div>
            <div className="form-group">
              <label>Stock :</label>
              <input
                type="number"
                name="number"
                value={stock}
                onChange={handleChange("stock")}
                id="stock"
              />
            </div>
            <div className="form-group">
              <label>Point List :</label>
              <textarea
                id="Textarea1"
                value={point_desc}
                onChange={handleChange("point_desc")}
                rows="5"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Long Description :</label>
              <textarea
                id="Textarea2"
                value={long_desc}
                onChange={handleChange("long_desc")}
                rows="5"
              ></textarea>
            </div>
            <div className="form-group justify-content-md-center">
              <Button variant="success" id="submit" onClick={onSubmit}>
                Save
              </Button>
            </div>
          </form>
        </div>
        <p className="text-center py-2">{JSON.stringify(values)}</p>
      </div>
    </Base>
  );
};

export default SellYourProduct;
