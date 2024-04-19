import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, createOrder, getaUserCart } from "../features/user/userSlice";
import { debounce } from 'lodash';
import { BsCart4 } from "react-icons/bs"
const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const { orders, userinfo } = useSelector((state) => state.auth);
  const shipChart = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userinfo?.user) {
      setName(userinfo?.user?.lastname + " " + userinfo?.user?.firstname);
      setAddress(userinfo?.user.address);
      setPhone(userinfo?.user.mobile);
    }
  }, [userinfo?.user])

  const handleApplyCoupon = () => {
    const value = {
      coupon: coupon
    }
    dispatch(applyCoupon(value));
    setTimeout(() => {
      dispatch(getaUserCart());
    }, 5000)
  }

  // console.log(orders);
  const handlePayment = () => {
    const values = {
      COD: true,
      couponApplied: orders?.isDiscount,
      note: note || "",
      address: address || "",
      sendTo: name,
      phone: phone
    }
    // console.log(value);
    dispatch(createOrder(values))
  }
  console.log(orders);
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Nitro Mark</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /&nbsp;
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Checkout
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                {userinfo?.user?.lastname} {userinfo?.user?.firstname} {`(${userinfo?.user?.email})`}
              </p>
              <h4 className="mb-3">Shipping Infomation</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    defaultValue={userinfo?.user ? userinfo?.user?.lastname + " " + userinfo?.user?.firstname : ""}
                    onChange={debounce((e) => setName(e.target.value), 500)}
                  />
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="form-control"
                    defaultValue={userinfo?.user?.address || ""}
                    onChange={debounce((e) => setAddress(e.target.value), 500)}
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="note"
                    placeholder="Note in order"
                    className="form-control"
                    onChange={debounce((e) => setNote(e.target.value), 500)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone Number"
                    className="form-control"
                    defaultValue={userinfo?.user?.mobile}
                    onChange={debounce((e) => setPhone(e.target.value), 500)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="zip-code"
                    placeholder="Zipcode"
                    className="form-control"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark d-flex align-items-center">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link onClick={handleApplyCoupon} className="button">
                      Apply coupon
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {
            orders?.products?.length > 0 ?
              <div className="col-5">
                <div className="border-bottom py-4">
                  {orders &&
                    orders?.products?.map((product, index) => (
                      <div className="d-flex gap-10 mb-2 align-align-items-center" key={index}>
                        <div className="w-75 d-flex gap-10">

                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {`${product?.count}`}
                            </span>
                            <img className="img-fluid" src={product?.images[1]?.url || ""} alt="product" />
                          </div>
                          <div>
                            <h5 className="total-price">{`${product?.title}`}</h5>
                            <p className="total-price">$ {`${product?.price}`}</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">$ {`${product?.price * product?.count}`}</h5>
                        </div>
                      </div>
                    ))}

                </div>
                <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Subtotal</p>
                    <p className="total-price">$ {`${orders?.cartTotal || "0"}`}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className=" total">Shipping</p>
                    <p className="mb-0 total-price">$ {`${shipChart || "0"}`}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Price in Discount</p>
                    <p className="mb-0 total-price">-$ {`${orders?.cartTotal - orders?.totalAfterDiscount || "0"}`}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                  <h4 className="total">Total</h4>
                  <h5 className="total-price">$ {`${orders?.totalAfterDiscount + shipChart || orders?.cartTotal + shipChart}` || "0"}</h5>
                </div>
                <Link onClick={handlePayment} className="button " style={{ marginLeft: "400px" }}>
                  Checkout
                </Link>
              </div>
              : <div className="col-5 px-5">
                <h2 className=" d-flex align-items-center justify-content-around">
                  Your Card Is Empty
                  <BsCart4></BsCart4>
                </h2>
              </div>
          }

        </div>
      </Container>
    </>
  );
};

export default Checkout;
