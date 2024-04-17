import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import userAva from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { getaUserCart, getOrderByUser, getUser, getWishList, logoutUser, } from "../features/user/userSlice";
import { getCategories } from "../features/pCategory/pCategorySlice";
import { getProductCategory, getProductonSearch, getProducts } from "../features/products/productSlice";
import { getBlogCategory, getBlogs } from "../features/blog/blogSlice";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const Header = () => {
  const dispatch = useDispatch();
  const [onSearch, setOnSearch] = useState();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getBlogCategory());
    dispatch(getBlogs());
    dispatch(getOrderByUser());
  }, [dispatch]);


  const { pCategories } = useSelector((state) => state.pCategory);
  const { user, orders } = useSelector((state) => state.auth);

  useEffect(() => {
    if (getUserfromLocalStorage) {
      dispatch(getaUserCart());
      dispatch(getWishList());
      dispatch(getUser(user?._id));
    }
  }, [user?._id, dispatch])

  const handleGetCategory = (category) => {
    dispatch(getProductCategory(category))
  }

  const handleLoadProduct = () => {
    dispatch(getProducts());
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.assign("/")
  }

  const handleSetValue = (value) => {
    setOnSearch(value);
  }

  const handleSearch = () => {
    dispatch(getProductonSearch(onSearch));
    setOnSearch("");
  }
  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to={"/"}>Nitro Mark</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control py-2"
                  placeholder="Enter to Search Product"
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={onSearch}
                  onChange={(e) => handleSetValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <span className="input-group-text p-3" id="basic-addon2" onClick={handleSearch}>
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to={getUserfromLocalStorage ? "/compare-product" : "/login"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={getUserfromLocalStorage ? "/wishlist" : "/login"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <div className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={userAva} alt="user" />
                    {user ? (
                      <div className="d-flex gap-3 align-items-center dropdown">
                        <div
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <p className="mb-0">Welcome back, <br /> {user.firstname}</p>
                        </div>
                        <NavLink className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li>
                            <Link
                              className="dropdown-item py-1 mb-1"
                              style={{ height: "auto", lineHeight: "20px" }}
                              to={`/user/${user._id}`}
                            >
                              View Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item py-1 mb-1"
                              style={{ height: "auto", lineHeight: "20px" }}
                              to={`/user/list-ordered`}
                            >
                              View Order
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item py-1 mb-1"
                              style={{ height: "auto", lineHeight: "20px" }}
                              to={`/change-password/${user._id}`}
                            >
                              Change Password
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item py-1 mb-1"
                              style={{ height: "auto", lineHeight: "20px" }}
                              onClick={() => handleLogout()}
                            >
                              Signout
                            </Link>
                          </li>
                        </NavLink>
                      </div>) :
                      (
                        <Link
                          className="dropdown-item py-1 mb-1 text-white bg-transparent"
                          style={{ height: "auto", lineHeight: "20px" }}
                          to={`/login`}
                        >
                          Login <br /> My Account
                        </Link>
                      )}

                  </div>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{orders?.products?.length ? `${orders?.products?.length}` : "Empty"}</span>
                      <p className="mb-0">{orders?.cartTotal ? `$ ${orders?.cartTotal}` : "$ 0"}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {pCategories.map((pCate, key) => (
                        <li key={key}>
                          <Link className="dropdown-item text-white" to={`/product?category=${pCate.title}`}
                            onClick={() => { handleGetCategory(pCate.title) }}>
                            {pCate.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/" onClick={() => handleLoadProduct()}>Home</NavLink>
                    <NavLink to="/product" onClick={() => handleLoadProduct()}>Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
