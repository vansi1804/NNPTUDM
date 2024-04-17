import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOrderByUserId } from "../features/user/userSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipChart = 10;

    useEffect(() => {
        dispatch(getDetailOrderByUserId(id))
    }, [dispatch, id])

    const { userinfo } = useSelector((state) => state.auth);
    const { detailOrder } = useSelector((state) => state.auth)

    console.log(detailOrder);

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
                                        Payment
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
                                    />
                                </div>

                                <div className="w-100">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="form-control"
                                        defaultValue={userinfo?.user?.address || ""}
                                    />
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        name="note"
                                        placeholder="Note in order"
                                        className="form-control"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        name="mobile"
                                        placeholder="Phone Number"
                                        className="form-control"
                                        defaultValue={userinfo?.user?.mobile || ""}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        name="zip-code"
                                        placeholder="Zipcode"
                                        className="form-control"
                                    />
                                </div>
                                <div className="w-100">
                                    <Link to="/cart" className="text-dark d-flex  align-items-center">
                                        <BiArrowBack className="me-2" />
                                        Return to Cart
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {detailOrder &&
                                detailOrder?.products?.map((product, index) => (
                                    <div className="d-flex gap-10 mb-2 align-align-items-center" key={index}>
                                        <div className="w-75 d-flex gap-10">

                                            <div className="w-25 position-relative">
                                                <span
                                                    style={{ top: "-10px", right: "2px" }}
                                                    className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                                >
                                                    {`${product?.count}`}
                                                </span>
                                                <img className="img-fluid" src={product?.product?.images[0]?.url || ""} alt="product" />
                                            </div>
                                            <div>
                                                <h5 className="total-price">{`${product?.product?.title}`}</h5>
                                                <p className="total-price">$ {`${product?.product?.price}`}</p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="total">$ {`${product?.product?.price * product?.count}`}</h5>
                                        </div>
                                    </div>
                                ))}

                        </div>

                        <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">$ {`${detailOrder?.paymentIntent.amount + shipChart || "0"}`}</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Checkout;
