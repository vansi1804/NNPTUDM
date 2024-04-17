import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getaBlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getaBlog(id));
  }, [dispatch, id])

  const { blogDetail } = useSelector((state) => state.blog);


  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link className="d-flex align-items-center gap-10" to={`/blogs`}>
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{blogDetail?.title}</h3>
              <img src={`${blogDetail?.images[0].url}`} className="img-fluid w-100 my-4" alt="blog" />
              <p>
                {blogDetail?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
