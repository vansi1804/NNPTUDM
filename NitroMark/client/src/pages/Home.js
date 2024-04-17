import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useSelector } from "react-redux";
import Advertisement from "../components/Advertisement";
import BrandParner from "../components/BrandParner";
import Section from "../components/Section";
import Slider from "../components/Slider";
import Banner from "../components/Banner";

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const featuredProducts = products?.filter((product) => product?.tags === "featured")
    .map((product) => (
      <ProductCard key={product?._id} product={product} />
    ));

  const specialProducts = products?.filter((product) => product?.tags === "special")
  // .map((product) => (
  //   <SpecialProduct key={product?._id} product={product} />
  // ));

  return (
    <>
      {/* banner */}
      <Banner></Banner>

      {/* Services */}
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>


      {/* feature */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 flex-space">
            <h3 className="section-heading">Featured Collection</h3>
            <Link to="/product" style={{ color: "#808080", paddingBottom: "10px" }}>See more </Link>
          </div>
          {products && products?.slice(0, 8).map((product, key) => (
            <ProductCard product={product} key={key} />
          ))}
        </div>
      </Container>

      {/* adv */}
      <Advertisement></Advertisement>

      <Section title={"Special Products"} children={<Slider products={specialProducts}></Slider>}></Section>


      <Section title={"Our Popular Products"} children={featuredProducts}></Section>
      <BrandParner></BrandParner>

      {/* <Section title={"Our Latest Blogs"} children={
        <div className="col-3">
          {blogs && blogs?.map((item) => (
            <BlogCard key={item._id} props={item} />
          ))}
        </div>
      }
      ></Section> */}
    </>
  );
};

export default Home;
