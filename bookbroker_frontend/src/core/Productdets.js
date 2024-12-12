import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Base from "./Base";
import { getProduct } from "./helper/productdetsHelper";
import "../ProductDetailstyle.css";
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Productdets = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadProduct = () => {
    getProduct(id).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        console.log(data);
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  //  console.log(product.productImages);
  // const loadimages = () => {
  //   console.log(Imageproduct["image"]);
  // };

  return (
    <Base>
      <br />
      <div className="container py-5">
        <div className="productpage">
          <div className="row productdetail ">
            <div className="col-12 col-lg-6">
              {/* <!-- Container for the image gallery --> */}
              <div className="productpage__container ">
                {/* <!-- Full-width images with number text --> */}

                {/* <div className="productpage__bigslide">
                  <img src={product.image} style="width:100%" />
              </div>
              {product.productImages?.map((item) => (
                          <div className="productpage__bigslide">
                  <img src={item.image} alt="" style="width:100%" />
              </div>))}; */}

                <Carousel>
                  <Carousel.Item interval={1000}>
                    <img src={product.image} alt="First slide" />
                  </Carousel.Item>
                  {product.productImages?.map((item) => (
                    <Carousel.Item interval={1000} key={item.id}>
                      <img src={item.image} alt="First slide" />
                    </Carousel.Item>
                  ))}
                  ;
                </Carousel>
              </div>
            </div>

            <div className=" col-12 col-lg-5">
              <div className="productdetailinfo">
                <h4>{product.name}</h4>
                <h6>by {product.product_by?.first_name}</h6>
                <hr />
                <div className="actualrate">
                  <span>price :</span>
                  <strong>
                    {" "}
                    &nbsp; <i className="fa fa-rupee">{product.price}</i>
                  </strong>
                </div>
                <p>
                  MRP :{" "}
                  <i className="fa fa-rupee">
                    {" "}
                    <del>{product.Original_price}</del>
                  </i>{" "}
                </p>
                <div className="availability">
                  <p>
                    <strong>
                      <i className="fa fa-truck"></i> FREE DELIVERY
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                      &nbsp; Available in xyz
                    </strong>
                  </p>
                  <p>
                    <strong>delivery in 1 day</strong>
                  </p>
                  <p>
                    <strong>
                      {/* {% if product.available %} */}
                      <div className="actualrate" style={{ color: "green" }}>
                        Available
                      </div>
                      {/* {% else %} */}
                      <div className="actualrate">Unavailable</div>
                      {/* {% endif %} */}
                    </strong>
                  </p>
                </div>
              </div>
              <hr />
              <div className="row container">
                <div className="col-12 col-lg-6 text-center addtocardbtn">
                  {/* <button href="#" className="btn cartbtn"
                      style="background: linear-gradient(to bottom, #66ff66 0%, #009933 100%);"><strong>Added in
                          Bag</strong></button> */}

                  <button
                    id="cartbtn"
                    className="btn cartbtn1"
                    data-product="{{product.id}}"
                  >
                    <strong> Add to Cart</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <hr />
        <div className="fullinfo container">
          <table className="table table-bordered table-striped">
            <th colSpan="2">
              <h4 className="text-center">About this item</h4>
            </th>
            <tr>
              <td>
                <strong>ID(आईडी)</strong>
              </td>
              <td>
                <strong>{product.id}</strong>
              </td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Type</td>
              <td> {product.product_category?.category_name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
              <CKEditor
                    editor={ ClassicEditor }
                    data={product.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        
                   
                 </td>
            </tr>
          </table>
          <hr />
        </div>{" "}
      </div>
    </Base>
  );
};

export default Productdets;
