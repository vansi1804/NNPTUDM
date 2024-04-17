import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CompareProduct = () => {

  const { wishlist } = useSelector((state) => state.auth);

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          {wishlist?.length <= 0 && <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
              <p class="fs-3"> <span class="text-danger">Opps!</span> Wistlist is null.</p>
              <p class="lead">
                Go to Our Store to choose some product & add to wistlist
              </p>
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
            </div>
          </div>}

          {wishlist?.map((item, index) => (
            <Link className="col-3 text-dark" key={index} to={`/product/${item._id}`}>
              <div className="compare-product-card position-relative">
                <div className="product-card-image">
                  <img src={`${item.images[0].url}`} alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    {`${item.title}`}
                  </h5>
                  <h6 className="price mb-3 mt-3">$ {`${item.price}`}</h6>

                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>{`${item.brand}`}</p>
                    </div>
                    <div className="product-detail">
                      <h5>Category:</h5>
                      <p>{`${item.category}`}</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availablity:</h5>
                      <p>{`${item.title ? "In Stock" : "Out of Stock"}`}</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <div className="colors ps-0" style={{ backgroundColor: `${item?.color}`, width: "50px", height: "25px" }}></div>
                      {/* <Color /> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}


        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
