import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { token: { colorBgContainer }, } = theme.useToken();
  const navigate = useNavigate();


  const handleGetUser = () => {
    navigate(`admin/user/${user._id}`);
  }

  const handleLogout = () => {
    document.cookie = 'refreshToken=; Max-Age=0;secure=true;path="/"';
    dispatch(logout());
    window.location.assign("/")
  }
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo"></span>
            <span className="lg-logo">NITRO MARK</span>
          </h2>
        </div>
        <div style={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "Catalog",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Add Product",
                  },
                  {
                    key: "list-product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand List ",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="fs-4" />,
                label: "Orders",
              },
              {
                key: "marketing",
                icon: <RiCouponLine className="fs-4" />,
                label: "Marketing",
                children: [
                  {
                    key: "coupon",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Coupon",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="fs-4" />,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="fs-4" />,
                label: "Enquiries",
              },
            ]}
          />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">

            <div className="d-flex gap-3 align-items-center dropdown">

              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user.firstname} {user.lastname}</h5>
                <p className="mb-0">{user.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to={`/admin/get-user/${user._id}`}
                    onClick={() => handleGetUser()}
                  >
                    View Profile
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
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
