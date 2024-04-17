import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList } from "../features/products/productSlice";
import { getWishList } from "../features/user/userSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.auth);
  const handleAddtoWishList = (id) => {
    const values = {
      id: id
    }
    dispatch(addToWishList(values));
    setTimeout(() => {
      dispatch(getWishList());
    }, 500);
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      {wishlist?.length === 0 && (
        <div class="d-flex align-items-center justify-content-center vh-100">
          <div class="text-center">
            <p class="fs-3"> <span class="text-danger">Opps!</span> Wistlist is null.</p>
            <p class="lead">
              Go to Our Store to choose some product & add to wistlist
            </p>
            <Link to="/product" className="button">
              Continue To Shopping
            </Link>
          </div>
        </div>
      )}

      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlist && wishlist?.map((item, index) => (
            <div className="col-3 text-dark" key={index}>
              <div className="wishlist-card position-relative">
                <button
                  className="position-absolute top-0 start-0 p-0 m-3 btn-close"
                  onClick={() => handleAddtoWishList(item._id)}
                ></button>
                <Link to={`/product/${item._id}`} className="text-dark">
                  <div className="wishlist-card-image">
                    <img
                      src={`${item?.images[0].url}`}
                      className="img-fluid w-100"
                      alt="watch"
                      style={{ minHeight: "269px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="py-3 px-3 d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="title">{`${item?.title}`}</h5>
                      <h6 className="price">$ {`${item?.price}`}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}


        </div>
      </Container>
    </>
  );
};

export default Wishlist;
