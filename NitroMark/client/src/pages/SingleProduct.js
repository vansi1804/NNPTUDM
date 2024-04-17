import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, getAProduct, Rating } from "../features/products/productSlice";
import { addtoCart, getWishList } from "../features/user/userSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { TransformComponent, TransformWrapper } from "@kokarn/react-zoom-pan-pinch"
import { toast } from "react-toastify";

let schema = yup.object().shape({
  comment: yup.string().required("Comment is Required"),
  star: yup.number(),
});

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishList] = useState(false);
  const [imgZoom, setImageZoom] = useState("");

  useEffect(() => {
    dispatch(getAProduct(id));

  }, [dispatch, id]);


  const closeModal = () => { };

  const { productInfo, products } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.products);

  const featuredProducts = products?.filter((product) => product?.tags === "popular")
    .map((product) => (
      <ProductCard key={product?._id} product={product} />
    ));


  useEffect(() => {
    setImageZoom(productInfo?.images[0].url)
  }, [productInfo?.images])

  useEffect(() => {
    if (wishlist?.wishlist.includes(productInfo?._id)) {
      setInWishList(true);
    }
    else {
      setInWishList(false);
    }
  }, [productInfo?._id, wishlist?.wishlist])

  const handleAddtoCart = (e) => {
    if (!getUserfromLocalStorage) {
      toast.error("Please Login now");
      return;
    }
    const values = {
      cart: [
        {
          _id: id,
          count: Number(quantity),
          color: "Black"
        }
      ]
    }
    dispatch(addtoCart(values));
  }

  const handleAddtoWishList = () => {
    if (!getUserfromLocalStorage) {
      toast.error("Please Login now");
      return;
    }
    const values = {
      id: id
    }
    dispatch(addToWishList(values));
    setTimeout(() => {
      dispatch(getWishList());
    }, 500);
  }

  const formik = useFormik({
    initialValues: {
      productId: id,
      comment: "",
      star: 1,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log(values.star);
      dispatch(Rating(values));
    },
  });
  const ratingChanged = (newRating) => {
    formik.setFieldValue("star", newRating);
  }

  return (
    <>
      <Meta title={`${productInfo?.title}`} />
      <BreadCrumb title={`${productInfo?.title}`} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2" >
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <TransformWrapper defaultScale={1} defaultPositionX={100} defaultPositionY={200}>
                  <TransformComponent>
                    <img src={imgZoom} alt="" style={{ objectFit: "contain" }} />
                  </TransformComponent>

                </TransformWrapper>
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productInfo && productInfo?.images?.map((product, index) => (
                <div key={index}>
                  <img
                    src={product?.url}
                    className="img-fluid"
                    alt=""
                    onClick={() => setImageZoom(product?.url)}
                  />
                </div>
              ))}

            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productInfo?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productInfo?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  {productInfo && <ReactStars
                    count={5}
                    size={24}
                    value={productInfo && Number(productInfo?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />}
                  {/* {productInfo && console.log(Number(productInfo?.totalrating))} */}
                  <p className="mb-0 t-review">{`${productInfo?.ratings?.length} reviews`}</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">

                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productInfo?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productInfo?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productInfo?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">{productInfo?.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                </div>

                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <div className="colors ps-0" style={{ backgroundColor: `${productInfo?.color}`, width: "50px", height: "25px" }}></div>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      defaultValue={1}
                      onChange={(e) => setQuantity(e.target.value)}
                      id=""
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      onClick={(e) => handleAddtoCart(e)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                    >
                      Add to Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <div className="hover">
                      <TbGitCompare className="fs-5 me-2" /> Go to Compare
                    </div>
                  </div>
                  <div>
                    <div onClick={() => handleAddtoWishList()} className="hover">
                      {inWishlist ?
                        <>
                          <AiFillHeart className="fs-5 me-2 text-danger" /> Remove on Wishlist
                        </>
                        :
                        <>
                          <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                        </>
                      }
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                {productInfo?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productInfo?.totalrating || 0}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on {`${productInfo?.ratings?.length}`} Reviews</p>
                  </div>
                </div>

              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={ratingChanged}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={formik.handleChange("comment")}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0" type="submit">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {productInfo && productInfo?.ratings?.map((rate, index) => (
                  <div className="review" key={index}>
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">{`${rate?.postedby?.lastname} ${rate.postedby?.firstname}`}</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={rate?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      {`${rate?.comment}`}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {featuredProducts}
        </div>
      </Container>

      {getUserfromLocalStorage && <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0 mt-3 ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={productInfo?.images[0].url} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">{productInfo?.title}</h6>
                  <p className="mb-1">Quantity: {`${quantity}`}</p>
                  <p className="mb-1">Color:
                    <div style={{ backgroundColor: productInfo?.color, width: "40px", height: "20px", display: "inline-block", margin: "0 8px" }}></div>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button border-0" data-bs-dismiss="modal" onClick={() => navigate("/cart")}>
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default SingleProduct;
