import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProductonSearch, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BsSearch } from "react-icons/bs";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState("");
  const [onSearch, setOnSearch] = useState();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const showModal = (e) => {
    setOpen(true);
    setId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  const deleteProduct = (e) => {
    console.log(e);
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  };
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: (<div style={{ backgroundColor: `${productState[i].color}`, height: "20px", width: "40px" }}></div>),
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleSetValue = (value) => {
    setOnSearch(value);
  }
  const handleSearch = () => {
    dispatch(getProductonSearch(onSearch));
    setOnSearch("");
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Products</h3>
        <div className="col-5 mb-4">
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
            <span className="input-group-text" id="basic-addon2" onClick={handleSearch}>
              <BsSearch className="fs-6" />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(Id);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Productlist;
