import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { getOrders } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ReportLabel from "../components/ReportLabel";
import { getUsers } from "../features/cutomers/customerSlice";
import { getProducts } from "../features/product/productSlice";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state);

  const { user } = authState.auth;


  useEffect(() => {
    if (user) {
      dispatch(getOrders());
      dispatch(getUsers());
      dispatch(getProducts());
    }
  }, [dispatch, user]);

  const orderState = useSelector((state) => state.auth.orders);
  const totalCustomer = useSelector((state) => state.customer.customers).length;
  const totalProduct = useSelector((state) => state.product.products).length;
  // console.log(orderState);
  let totalRevenue = 0;

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      status: orderState[i].paymentIntent.status,
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    },
    );
    totalRevenue += orderState[i].paymentIntent.amount
  }


  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <ReportLabel title={"User"} value={totalCustomer}> </ReportLabel>
        <ReportLabel title={"Revenue"} value={`$${totalRevenue}`}> </ReportLabel>
        <ReportLabel title={"Product"} value={totalProduct}></ReportLabel>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
