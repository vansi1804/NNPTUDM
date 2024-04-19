import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersonSearch } from "../features/cutomers/customerSlice";
import { Link } from "react-router-dom";
import { BiEdit, BiBlock } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { blockAUser, deleteAUser, unBlockAUser } from "../features/auth/authSlice";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Joined date",
    dataIndex: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Customers = () => {
  const [onSearch, setOnSearch] = useState();
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);



  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: data1.length + 1,
        name: `${customerstate[i].firstname} ${customerstate[i].lastname}`,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        address: customerstate[i].address,
        createdAt: new Date(customerstate[i].createdAt).toLocaleString(),
        status: (
          <>
            {customerstate[i].isBlocked ?
              (<button className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => handleUnBlock(customerstate[i]._id)}>
                <BiBlock></BiBlock>
              </button>) : ((<button className="ms-3 fs-3 text-success bg-transparent border-0"
                onClick={() => handleBlock(customerstate[i]._id)}>
                <AiOutlineCheckCircle></AiOutlineCheckCircle>
              </button>))
            }
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(customerstate[i]._id)}
            >
              {/* <AiFillDelete /> */}
            </button>
          </>
        ),
      });
    }
  }

  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 1000);
  };

  const handleBlock = (e) => {
    toast.success("Block user Successfully!");
    dispatch(blockAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 10);
  };

  const handleUnBlock = (e) => {
    toast.success("Unblock user Successfully!");
    dispatch(unBlockAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 10);
  };
  const handleSetValue = (value) => {
    setOnSearch(value);
  }
  const handleSearch = () => {
    dispatch(getUsersonSearch(onSearch));
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Customers</h3>
        <div className="col-5 mb-4">
          <div className="input-group">
            <input
              type="search"
              className="form-control py-2"
              placeholder="Enter email to Search Users"
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
          deleteUser(UserId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Customers;
