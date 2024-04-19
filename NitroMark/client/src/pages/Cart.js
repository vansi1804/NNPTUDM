import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductfromCart, getaUserCart, updateProductFromCart } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);


  const handleRemoveItem = (id) => {
    dispatch(deleteProductfromCart(id));
    // console.log(id);
    setTimeout(() => {
      dispatch(getaUserCart());
    }, 3000)
  }

  const handleChange = (value) => {
    // if (!value.id) {
    //   toast.error("Something went wrong! Try again!!!");
    // }

    dispatch(updateProductFromCart(value));

    console.log(value);
    setTimeout(() => {
      dispatch(getaUserCart());
    }, 3000)
  }
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {orders && orders.products.length > 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {orders &&
                orders?.products?.map((product, index) => (
                  <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center" key={index}>
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img src={product?.images[1]?.url || ""} className="img-fluid" alt="product" />
                      </div>
                      <div className="w-75">
                        <p>{`${product?.title}` || ""}</p>
                        <p>Color: {`${product?.color}` || ""}</p>
                      </div>
                    </div><div className="cart-col-2">
                      <h5 className="price">$ {`${product?.price}` || ""}</h5>
                    </div><div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          min={1}
                          max={10}
                          defaultValue={`${product.count}` || ""}
                          onChange={(e) => handleChange({ id: product && product?.product?._id, quantity: e.target.value })}
                          id="" />
                      </div>
                      <div>
                        <AiFillDelete className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleRemoveItem(product?.product?._id)} />
                      </div>
                    </div><div className="cart-col-4">
                      <h5 className="price">$ {`${product.count * product.price}`}</h5>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {`${orders?.cartTotal}`}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Your cart is empty.</p>
            <Link to="/product" className="button">
              Continue Shopping
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
