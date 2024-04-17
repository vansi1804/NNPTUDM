import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addtoCart } from "../features/user/userSlice";
const SpecialProduct = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddtoCart = () => {
    const values = {
      cart: [
        {
          _id: product._id,
          count: Number(quantity),
          color: "Black"
        }
      ]
    }
    dispatch(addtoCart(values));
  }

  return (
    <>
      <div className="col-12  mx-auto">
        <div className="special-product-card" >
          <div className="d-flex " style={{ minHeight: "269px" }}>
            <div className="flex-space">
              <img src={`${product.images[0].url}`} className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content">
              <div>
                <h5 className="brand">{product.brand}</h5>
                <h6 className="title">
                  {product.title}
                </h6>
              </div>
              <ReactStars
                count={5}
                size={24}
                value={product.totalrating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">$ {product.price}</span> &nbsp;
              </p>

              <div className="prod-count">
                <p>Products: {product.quantity}</p>
              </div>
              <button className="button" onClick={handleAddtoCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
