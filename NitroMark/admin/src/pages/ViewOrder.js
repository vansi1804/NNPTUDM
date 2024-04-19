import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orders[0].products);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      image: (
        <div
          style={{
            backgroundImage: `url(${orderState[i].product.images[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100px",
            width: "100px",
          }}
        ></div>
      ),
      product: orderState[i].product.title,
      brand: orderState[i].product.brand,
      amount: orderState[i].count,
      price: orderState[i].product.price,
      color: orderState[i].product.color,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Order details</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
