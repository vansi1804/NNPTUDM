import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useSelector } from "react-redux";

const Blog = () => {

  const { blogCategory, blogs } = useSelector((state) => state.blog);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  {blogCategory && blogCategory?.map((item) => (
                    <li key={item._id}>{`${item.title}`}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-6 mb-3">
                {blogs && blogs?.map((item) => (
                  <BlogCard key={item._id} props={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
